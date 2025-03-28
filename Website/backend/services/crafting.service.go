package services

import "go.mongodb.org/mongo-driver/bson"

type CraftingService interface {
	GetAll() ([]*bson.M, error)
	CreateCraftingRecipe(recipe map[string]interface{}) error
	DeleteCraftingRecipe(Key string, Value string) error
}
