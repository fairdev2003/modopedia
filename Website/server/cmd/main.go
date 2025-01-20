package main

import (
	"context"
	"github.com/fairdev2003/honego/config"
	"github.com/fairdev2003/honego/controllers"
	"github.com/fairdev2003/honego/handlers"
	"github.com/fairdev2003/honego/helpers"
	"github.com/fairdev2003/honego/services"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"net/http"
)

var (
	server         *gin.Engine
	us             services.UserService
	uc             controllers.UserController
	ms             services.ModService
	mc             controllers.ModController
	is             services.ItemService
	ic             controllers.ItemController
	ctx            context.Context
	userCollection *mongo.Collection
	itemCollection *mongo.Collection
	modCollection  *mongo.Collection
	mongoclient    *mongo.Client
	err            error
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

	// setting up the context
	gin.SetMode(gin.DebugMode)
	ctx = context.TODO()

	// creating the instance of the mongodb connection
	mongoconn := options.Client().ApplyURI(config.Envs.DatabaseURI)
	mongoclient, err = mongo.Connect(ctx, mongoconn)
	if err != nil {
		log.Fatal("Error while connecting with MongoDB:", err)
	}
	err = mongoclient.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal("Error while trying to ping MongoDB:", err)
	}

	userCollection = mongoclient.Database("invsee").Collection("User")
	itemCollection = mongoclient.Database("invsee").Collection("Item")
	modCollection = mongoclient.Database("invsee").Collection("Mod")

	us = handlers.NewUserService(userCollection, ctx)
	is = handlers.NewItemService(itemCollection, ctx)
	ms = handlers.NewModService(modCollection, ctx)

	uc = controllers.NewUserController(us)
	ic = controllers.NewItemController(is)
	mc = controllers.NewModController(ms)

	server := gin.New()

	server.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": 404, "error": "Page not found", "message": "Page not found"})
	})

	server.Use(CorsConf("http://localhost:3000"))

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

	defer mongoclient.Disconnect(ctx)
	if err := server.Run(":9090"); err != nil {
		log.Fatalf("Failed to run server: %s", err)
	}
}
