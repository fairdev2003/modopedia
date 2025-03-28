package controllers

import (
	"github.com/fairdev2003/honego/config"
	"github.com/fairdev2003/honego/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type CraftingController struct {
	CraftingService services.CraftingService
}

func NewCraftingController(craftingservice services.CraftingService) CraftingController {
	return CraftingController{
		CraftingService: craftingservice,
	}
}

func (c *CraftingController) GetCrafting() error {
	return nil
}

func (c *CraftingController) GetAll(ctx *gin.Context) {
	craftingRecipes, err := c.CraftingService.GetAll()

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": config.ServerError})
	}
	ctx.JSON(http.StatusOK, craftingRecipes)
}

func (c *CraftingController) DeleteCraftingRecipe(ctx *gin.Context) {

	Key := ctx.Param("key")
	Value := ctx.Param("value")

	err := c.CraftingService.DeleteCraftingRecipe(Key, Value)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": config.ServerError})
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Crafting Recipe Deleted"})

}

func (c *CraftingController) CreateCraftingRecipe(ctx *gin.Context) {
	var recipe map[string]interface{}

	if err := ctx.ShouldBindJSON(&recipe); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusBadGateway,
			"error":   config.InvalidRequest,
			"message": config.InvalidRequestMessage,
		})
		return
	}

	err := c.CraftingService.CreateCraftingRecipe(recipe)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusBadGateway,
			"error":   err.Error(),
			"message": config.InvalidRequestMessage,
		})
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (cc *CraftingController) RegisterUserRoutes(rg *gin.RouterGroup) {
	userroute := rg.Group("/crafting")
	userroute.GET("/getall", cc.GetAll)
}

func (cc *CraftingController) RegisterPrivateUserRoutes(rg *gin.RouterGroup) {
	userroute := rg.Group("/crafting")
	userroute.GET("")
}

func (cc *CraftingController) RegisterAdminRoutes(rg *gin.RouterGroup) {
	adminUserRoute := rg.Group("/crafting")
	adminUserRoute.POST("/create", cc.CreateCraftingRecipe)
	adminUserRoute.DELETE("/delete", cc.DeleteCraftingRecipe)
}

func (cc *CraftingController) RegisterRoutes(normalGroup *gin.RouterGroup, privateGroup *gin.RouterGroup, adminGroup *gin.RouterGroup) {
	cc.RegisterUserRoutes(normalGroup)
	cc.RegisterPrivateUserRoutes(privateGroup)
	cc.RegisterAdminRoutes(adminGroup)
}
