package main

import (
	"context"
	"fmt"
	"github.com/fairdev2003/honego/config"
	"github.com/fairdev2003/honego/controllers"
	"github.com/fairdev2003/honego/handlers"
	"github.com/fairdev2003/honego/helpers"
	"github.com/fairdev2003/honego/services"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"io"
	"log"
	"net/http"
)

// Item
var (
	itemCollection *mongo.Collection
	is             services.ItemService
	ic             controllers.ItemController
)

// User
var (
	userCollection *mongo.Collection
	us             services.UserService
	uc             controllers.UserController
)

// Mod
var (
	modCollection *mongo.Collection
	ms            services.ModService
	mc            controllers.ModController
)

// general variables
var (
	server      *gin.Engine
	ctx         context.Context
	mongoClient *mongo.Client
	err         error
)

func CorsConf(allowOrigin string) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, UPDATE, PATCH")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, X-CSRF-Token, Token, session, Origin, Host, Connection, Accept-Encoding, Accept-Language, X-Requested-With")

		if c.Request.Method == http.MethodOptions {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Request.Header.Del("Origin")

		c.Next()
	}
}

func main() {

	resp, err := http.Get("https://api64.ipify.org?format=text")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()

	ip, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return
	}

	fmt.Println("Your IP: ", string(ip))

	// setting up the context
	gin.SetMode(gin.DebugMode)
	ctx = context.TODO()

	// creating the instance of the mongodb connection
	mongoconn := options.Client().ApplyURI(config.Envs.DatabaseURI)
	mongoClient, err = mongo.Connect(ctx, mongoconn)
	if err != nil {
		log.Fatal("Error while connecting with MongoDB:", err)
	}
	err = mongoClient.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal("Error while trying to ping MongoDB:", err)
	}

	userCollection = mongoClient.Database("invsee").Collection("User")
	itemCollection = mongoClient.Database("invsee").Collection("Item")
	modCollection = mongoClient.Database("invsee").Collection("Mod")

	us = handlers.NewUserService(userCollection, ctx)
	is = handlers.NewItemService(itemCollection, ctx)
	ms = handlers.NewModService(modCollection, ctx)

	uc = controllers.NewUserController(us)
	ic = controllers.NewItemController(is)
	mc = controllers.NewModController(ms)

	server = gin.New()

	server.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": 404, "error": "Page not found", "message": "Page not found"})
	})

	server.Use(CorsConf("http://localhost:5173"))

	basepath := server.Group("/honego").Group("/v1") // ALL USERS
	privatePath := basepath.Group("/private")        // REGISTERED USERS
	adminPath := basepath.Group("/admin")            // RESTRICTED USERS

	requestPerSecond := 10

	basepath.Use(helpers.RateLimmiter(requestPerSecond))

	adminPath.Use(helpers.AuthMiddleware())
	adminPath.Use(helpers.VerifyAdmin(us))
	privatePath.Use(helpers.RateLimmiter(requestPerSecond))
	privatePath.Use(helpers.AuthMiddleware())

	// register routes
	ic.RegisterItemRoutes(basepath)                     // ITEM
	mc.RegisterRoutes(basepath, privatePath, adminPath) // MOD
	uc.RegisterRoutes(basepath, privatePath, adminPath) // USER

	defer mongoClient.Disconnect(ctx)
	if err := server.Run(":9090"); err != nil {
		log.Fatalf("Failed to run server: %s", err)
	}
}
