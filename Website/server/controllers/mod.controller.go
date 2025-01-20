package controllers

import (
	"github.com/fairdev2003/honego/models"
	"github.com/fairdev2003/honego/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

type ModController struct {
	ModService services.ModService
}

func NewModController(modservice services.ModService) ModController {
	return ModController{
		ModService: modservice,
	}
}

// post request
func (mc *ModController) Find(ctx *gin.Context) {
	var query models.FindType
	if err := ctx.ShouldBindJSON(&query); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	mods, err := mc.ModService.Find(&query)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, mods)
}

func (mc *ModController) GetAll(ctx *gin.Context) {
	mods, err := mc.ModService.GetAll()

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
	}
	ctx.JSON(http.StatusOK, mods)
}

func (mc *ModController) RegisterModRoutes(rg *gin.RouterGroup) {
	modroute := rg.Group("/mod")
	modroute.GET("/getall", mc.GetAll)
	modroute.POST("/find", mc.Find)
}

func (mc *ModController) RegisterPrivateModRoutes(rg *gin.RouterGroup) {

}

func (mc *ModController) RegisterAdminModRoutes(rg *gin.RouterGroup) {

}

func (mc *ModController) RegisterRoutes(normalGroup *gin.RouterGroup, privateGroup *gin.RouterGroup, adminGroup *gin.RouterGroup) {
	mc.RegisterModRoutes(normalGroup)
	mc.RegisterPrivateModRoutes(privateGroup)
	mc.RegisterAdminModRoutes(adminGroup)
}
