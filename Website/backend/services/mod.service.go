package services

import (
	"github.com/fairdev2003/honego/models"
	"go.mongodb.org/mongo-driver/bson"
)

type ModService interface {
	CreateMod(*models.Mod) error
	GetMod(query *string) (bson.M, error)
	GetAll() ([]*models.Mod, error)
	UpdateMod(*models.Mod) error
	GetMods(string) ([]*models.Mod, error)
	DeleteMod(*string) error
	Find(query *models.FindType) ([]*models.Mod, error)
	BulkFind(key string, value string) ([]*models.Mod, error)
	DebugFunc() error
}
