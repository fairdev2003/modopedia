package handlers

import (
	"context"
	"errors"
	"fmt"
	"github.com/fairdev2003/honego/models"
	"github.com/fairdev2003/honego/services"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ModServiceImpl struct {
	modCollection *mongo.Collection
	ctx           context.Context
}

func NewModService(modCollection *mongo.Collection, ctx context.Context) services.ModService {
	return &ModServiceImpl{
		modCollection: modCollection,
		ctx:           ctx,
	}
}

func (m ModServiceImpl) CreateMod(mod *models.Mod) error {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) GetMod(query *string) (bson.M, error) {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) GetAll() ([]*models.Mod, error) {
	var mods []*models.Mod
	cursor, err := m.modCollection.Find(m.ctx, bson.M{})

	if err != nil {
		return nil, fmt.Errorf("error executing aggregation: %v", err)
	}
	defer cursor.Close(m.ctx)

	for cursor.Next(m.ctx) {
		var mod models.Mod
		if err := cursor.Decode(&mod); err != nil {
			return nil, fmt.Errorf("error decoding cursor: %v", err)
		}
		mods = append(mods, &mod)
	}

	if err := cursor.Err(); err != nil {
		return nil, fmt.Errorf("cursor error: %v", err)
	}

	if len(mods) == 0 {
		return nil, errors.New("documents not found")
	}

	return mods, nil
}

func (m ModServiceImpl) UpdateMod(mod *models.Mod) error {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) GetMods(s string) ([]*models.Mod, error) {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) DeleteMod(s *string) error {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) Find(query *models.FindType) ([]*models.Mod, error) {

	var mods []*models.Mod

	pipeline := bson.D{{Key: "$match", Value: bson.M{
		"modName": bson.M{"$regex": "applied", "$options": "i"},
	}}}

	lookup := mongo.Pipeline{
		{{Key: "$lookup", Value: bson.M{
			"from":         "User",
			"localField":   "userId",
			"foreignField": "_id",
			"as":           "author",
		}}},
		{{Key: "$unwind", Value: bson.M{
			"path":                       "$mod",
			"preserveNullAndEmptyArrays": true,
		}}},
		pipeline,
		//options,
	}

	cursor, err := m.modCollection.Aggregate(m.ctx, lookup)

	if err != nil {
		return nil, fmt.Errorf("error executing aggregation: %v", err)
	}
	defer cursor.Close(m.ctx)

	for cursor.Next(m.ctx) {
		var mod models.Mod
		if err := cursor.Decode(&mod); err != nil {
			return nil, fmt.Errorf("error decoding cursor: %v", err)
		}
		mods = append(mods, &mod)
	}

	if err := cursor.Err(); err != nil {
		return nil, fmt.Errorf("cursor error: %v", err)
	}

	if len(mods) == 0 {
		return nil, errors.New("documents not found")
	}

	return mods, nil
}

func (m ModServiceImpl) BulkFind(key string, value string) ([]*models.Mod, error) {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) DebugFunc() error {
	//TODO implement me
	panic("implement me")
}
