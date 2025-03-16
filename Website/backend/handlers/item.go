package handlers

import (
	"context"
	"errors"
	"fmt"
	"github.com/fairdev2003/honego/models"
	"github.com/fairdev2003/honego/services"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"strconv"
	"strings"
)

type ItemServiceImpl struct {
	itemCollection *mongo.Collection
	ctx            context.Context
}

func NewItemService(itemCollection *mongo.Collection, ctx context.Context) services.ItemService {
	return &ItemServiceImpl{
		itemCollection: itemCollection,
		ctx:            ctx,
	}
}

func (i *ItemServiceImpl) CreateItem(item *models.Item) error {
	_, err := i.itemCollection.InsertOne(i.ctx, item)
	return err
}

func (i *ItemServiceImpl) GetItem(query *string) (bson.M, error) {
	var item bson.M
	filter := bson.M{"item_name": bson.M{"$regex": query, "$options": "i"}}
	err := i.itemCollection.FindOne(i.ctx, filter).Decode(&item)
	return item, err
}

func (i *ItemServiceImpl) GetAll() ([]*bson.M, error) {
	var items []*bson.M

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

	cursor, err := i.itemCollection.Aggregate(i.ctx, lookup)

	if err != nil {
		return nil, err
	}

	for cursor.Next(i.ctx) {
		var item bson.M
		err := cursor.Decode(&item)
		if err != nil {
			return nil, err
		}
		items = append(items, &item)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (i *ItemServiceImpl) GetAllWithLimit(limit int) ([]*bson.M, error) {
	var items []*bson.M

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
		{{Key: "$sort", Value: bson.M{"_id": -1}}},
		{{Key: "$limit", Value: limit}},
	}

	cursor, err := i.itemCollection.Aggregate(i.ctx, lookup)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(i.ctx)

	for cursor.Next(i.ctx) {
		var item bson.M
		if err := cursor.Decode(&item); err != nil {
			return nil, err
		}
		items = append(items, &item)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (i *ItemServiceImpl) UpdateItem(item *models.Item) error {
	//TODO implement me
	panic("implement me")
}

func (i *ItemServiceImpl) GetItems(key string, value string) ([]*bson.M, error) {
	var items []*bson.M

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
		{{Key: "$match", Value: bson.M{
			key: bson.M{"$regex": value, "$options": "i"},
		}}},
	}

	cursor, err := i.itemCollection.Aggregate(i.ctx, lookup)

	if err != nil {
		return nil, err
	}

	for cursor.Next(i.ctx) {
		var item bson.M
		err := cursor.Decode(&item)
		if err != nil {
			return nil, err
		}
		items = append(items, &item)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (i *ItemServiceImpl) DeleteItem(s *string) error {
	//TODO implement me
	panic("implement me")
}

func (i *ItemServiceImpl) BulkFind(key string, value string) ([]*models.Item, error) {
	var pipeline []bson.M
	var items []*models.Item

	pipeline = append(pipeline, bson.M{key: bson.M{"$regex": value, "$options": "i"}})

	lookup := mongo.Pipeline{
		{{Key: "$lookup", Value: bson.M{
			"from":         "Mod",
			"localField":   "modId",
			"foreignField": "_id",
			"as":           "mod",
		}}},
		{{Key: "$match", Value: bson.M{
			"$or": pipeline,
		}}},
	}

	cursor, err := i.itemCollection.Aggregate(i.ctx, lookup)
	if err != nil {
		return nil, fmt.Errorf("error executing aggregation: %v", err)
	}
	defer cursor.Close(i.ctx)

	for cursor.Next(i.ctx) {
		var item models.Item
		if err := cursor.Decode(&item); err != nil {
			return nil, fmt.Errorf("error decoding cursor: %v", err)
		}
		items = append(items, &item)
	}

	if err := cursor.Err(); err != nil {
		return nil, fmt.Errorf("cursor error: %v", err)
	}

	if len(items) == 0 {
		return nil, errors.New("documents not found")
	}

	return items, nil

}

func (i *ItemServiceImpl) Find(findContent *models.FindType) ([]*models.Item, error) {
	var items []*models.Item

	pipeline, options := PipelineParser(findContent.Query)

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
		pipeline,
		options,
	}

	cursor, err := i.itemCollection.Aggregate(i.ctx, lookup)

	if err != nil {
		return nil, fmt.Errorf("error executing aggregation: %v", err)
	}
	defer cursor.Close(i.ctx)

	for cursor.Next(i.ctx) {
		var item models.Item
		if err := cursor.Decode(&item); err != nil {
			return nil, fmt.Errorf("error decoding cursor: %v", err)
		}
		items = append(items, &item)
	}

	if err := cursor.Err(); err != nil {
		return nil, fmt.Errorf("cursor error: %v", err)
	}

	if len(items) == 0 {
		return nil, errors.New("documents not found")
	}

	return items, nil
}

/*
	full formula: @controller :siema #block >20 =20 <20 search_content

	... @ - search by modName and modTag
	... # - search by type of the item
	... > - [ EMC ] is greater than <number>
	... < - [ EMC ] is less than <number>
	... = - [ EMC ] is equal to <number>
	... search_content - is search content!

	loop over every word in the search sentence
	and then check if prefix is in it,
	if there is a prefix search by argument exceute the search statement for that prefix
*/

func PipelineParser(query string) (bson.D, bson.D) {
	var pipeline bson.D
	var statements []bson.M
	var searchContent []string
	var options bson.D

	options = bson.D{{"$sort", bson.M{"material_value": 1}}}

	argsMap := strings.Split(query, " ")

	for _, arg := range argsMap {
		if strings.HasPrefix(arg, "@") {
			modQuery := strings.TrimPrefix(arg, "@")
			statements = append(statements, bson.M{"$or": []bson.M{
				{"mod.tag": bson.M{"$regex": modQuery, "$options": "i"}},
				{"mod.modName": bson.M{"$regex": modQuery, "$options": "i"}},
			}})
		} else if strings.HasPrefix(arg, "#") {
			typeQuery := strings.TrimPrefix(arg, "#")
			statements = append(statements, bson.M{"$or": []bson.M{
				{"type": bson.M{"$regex": typeQuery, "$options": "i"}},
			}})

		} else if strings.HasPrefix(arg, ">") {
			trimmedArg := strings.TrimPrefix(arg, ">")
			greaterEmc, err := strconv.Atoi(trimmedArg)
			if err != nil {
				panic(err)
			}
			statements = append(statements, bson.M{"material_value": bson.M{
				"$gt": greaterEmc,
			}})
		} else if strings.HasPrefix(arg, "<") {
			trimmedArg := strings.TrimPrefix(arg, "<")
			lessEmc, err := strconv.Atoi(trimmedArg)
			if err != nil {
				panic(err)
			}
			statements = append(statements, bson.M{"material_value": bson.M{
				"$lt": lessEmc,
			}})
			options = bson.D{
				{Key: "$sort", Value: bson.M{"material_value": -1}},
			}

		} else if strings.HasPrefix(arg, "=") {
			trimmedArg := strings.TrimPrefix(arg, "=")
			equalEmc, err := strconv.Atoi(trimmedArg)
			if err != nil {
				panic(err)
			}
			statements = append(statements, bson.M{"material_value": equalEmc})
		} else {
			searchContent = append(searchContent, arg)
		}

		if len(searchContent) > 0 {
			statements = append(statements, bson.M{"$and": []bson.M{
				{"item_name": bson.M{"$regex": strings.Join(searchContent, " "), "$options": "i"}},
			}})
		} else {
			statements = append(statements, bson.M{})
		}

	}

	pipeline = bson.D{{Key: "$match", Value: bson.M{"$and": statements}}}

	return pipeline, options
}
