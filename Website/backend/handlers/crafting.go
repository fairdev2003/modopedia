package handlers

import (
	"context"
	"github.com/fairdev2003/honego/services"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewCraftingService(craftingCollection *mongo.Collection, ctx context.Context) services.CraftingService {
	return &CraftingServiceImpl{
		craftingCollection: craftingCollection,
		ctx:                ctx,
	}
}

type CraftingServiceImpl struct {
	craftingCollection *mongo.Collection
	ctx                context.Context
}

func (c *CraftingServiceImpl) DeleteCraftingRecipe(Key string, Value string) error {

	_, err := c.craftingCollection.DeleteOne(c.ctx, bson.M{Key: Value})
	if err != nil {
		return err
	}

	return nil
}

func (c *CraftingServiceImpl) GetAll() ([]*bson.M, error) {
	var craftingRecipes []*bson.M

	lookup := mongo.Pipeline{
		{{Key: "$lookup", Value: bson.M{
			"from":         "Mod",
			"localField":   "modId",
			"foreignField": "_id",
			"as":           "mod",
		}}},
		{{Key: "$unwind", Value: bson.M{
			"path":                       "$mod",
			"preserveNullAndEmptyArrays": true,
		}}},
	}

	cursor, err := c.craftingCollection.Aggregate(c.ctx, lookup)
	if err != nil {
		return nil, err
	}

	for cursor.Next(c.ctx) {
		var item bson.M
		err := cursor.Decode(&item)
		if err != nil {
			return nil, err
		}
		craftingRecipes = append(craftingRecipes, &item)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return craftingRecipes, nil
}

func (c CraftingServiceImpl) CreateCraftingRecipe(recipe map[string]interface{}) error {
	_, err := c.craftingCollection.InsertOne(c.ctx, recipe)
	return err
}
