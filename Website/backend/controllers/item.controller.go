package controllers

import (
	"github.com/fairdev2003/honego/config"
	"github.com/fairdev2003/honego/helpers"
	"github.com/fairdev2003/honego/models"
	"github.com/fairdev2003/honego/services"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type ItemController struct {
	ItemService services.ItemService
}

func NewItemController(itemservice services.ItemService) ItemController {
	return ItemController{
		ItemService: itemservice,
	}
}

func (ic *ItemController) CreateItem(ctx *gin.Context) {
	var item models.Item
	if err := ctx.ShouldBindJSON(&item); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	err := ic.ItemService.CreateItem(&item)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (ic *ItemController) Find(ctx *gin.Context) {
	var query models.FindType
	if err := ctx.ShouldBindJSON(&query); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	items, err := ic.ItemService.Find(&query)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, items)

}

type GetAllStruct struct {
	limit int
}

func (ic *ItemController) GetAll(ctx *gin.Context) {

	var limit = ctx.Query("limit")

	if limit != "" {
		helpers.LOGGER(limit)
		limitNumber, err := strconv.Atoi(limit)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"message": config.InvalidRequest})
		}

		items, err := ic.ItemService.GetAllWithLimit(limitNumber)
		if err != nil {
			ctx.JSON(http.StatusBadGateway, gin.H{"message": config.ServerError})
		}
		ctx.JSON(http.StatusOK, items)
		return
	}

	items, err := ic.ItemService.GetAll()

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": config.ServerError})
	}
	ctx.JSON(http.StatusOK, items)
}

func (ic *ItemController) GetItem(ctx *gin.Context) {
	var name = ctx.Param("name")
	item, err := ic.ItemService.GetItem(&name)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, item)
}

func (ic *ItemController) GetItems(ctx *gin.Context) {
	var key = ctx.Query("key")
	var value = ctx.Query("value")

	items, err := ic.ItemService.GetItems(key, value)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
	}
	ctx.JSON(http.StatusOK, items)
}

func (ic *ItemController) BulkFind(ctx *gin.Context) {
	key := ctx.Query("key")
	value := ctx.Query("value")

	items, err := ic.ItemService.BulkFind(key, value)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, items)
}

func (ic *ItemController) RegisterItemRoutes(rg *gin.RouterGroup) {
	itemroute := rg.Group("/item")
	itemroute.POST("/find", ic.Find)
	itemroute.GET("/getall", ic.GetAll)
	itemroute.GET("/bulk/find/", ic.BulkFind)
	itemroute.GET("/get/:name", ic.GetItem)
	itemroute.GET("/get_item", ic.GetItems)
}
