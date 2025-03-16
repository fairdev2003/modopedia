package services

import (
	"github.com/fairdev2003/honego/models"
	"go.mongodb.org/mongo-driver/bson"
)

type UserService interface {
	CreateUser(*models.User) error
	GetUser(by string, value string) (*models.User, error)
	GetAll() ([]*models.User, error)
	UpdateUser(*models.User) error
	GetUsers(string, string) ([]*models.User, error)
	DeleteUser(*string) error
	Me(email string) (bson.M, error)
	GetPublicUser(key string, value string) (bson.M, error)
	AdminUpdateOne(by string, value string) error
	UpdateOne(by string, value string, nick string) error
}
