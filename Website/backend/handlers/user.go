package handlers

import (
	"context"
	"errors"
	"github.com/fairdev2003/honego/models"
	"github.com/fairdev2003/honego/services"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

type UserServiceImpl struct {
	usercollection *mongo.Collection
	ctx            context.Context
}

func NewUserService(usercollection *mongo.Collection, ctx context.Context) services.UserService {
	return &UserServiceImpl{
		usercollection: usercollection,
		ctx:            ctx,
	}
}

func (i *UserServiceImpl) GetPublicUser(key string, value string) (bson.M, error) {
	var user bson.M
	filter := bson.M{key: value}
	err := i.usercollection.FindOne(i.ctx, filter, options.FindOne().SetProjection(bson.M{
		"password":  0,
		"updatedAt": 0,
		"email":     0,
	})).Decode(&user)
	return user, err
}

func (i *UserServiceImpl) Me(nick string) (bson.M, error) {
	var user bson.M
	filter := bson.M{"nick": nick}
	err := i.usercollection.FindOne(i.ctx, filter, options.FindOne().SetProjection(bson.M{
		"password":  0,
		"updatedAt": 0,
		"createdAt": 0,
	})).Decode(&user)
	return user, err
}

func (u *UserServiceImpl) CreateUser(user *models.User) error {
	_, err := u.usercollection.InsertOne(u.ctx, user)
	return err
}

func (u *UserServiceImpl) GetUser(by string, value string) (*models.User, error) {
	var user *models.User
	query := bson.D{bson.E{Key: by, Value: value}}
	err := u.usercollection.FindOne(u.ctx, query).Decode(&user)
	return user, err
}

func (u *UserServiceImpl) GetUsers(key string, value string) ([]*models.User, error) {
	var users []*models.User
	query := bson.D{bson.E{Key: key, Value: value}}
	cursor, err := u.usercollection.Find(u.ctx, query)

	if err != nil {
		return nil, err
	}

	for cursor.Next(u.ctx) {
		var user models.User
		err := cursor.Decode(&user)
		if err != nil {
			return nil, err
		}
		users = append(users, &user)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	cursor.Close(u.ctx)

	if len(users) == 0 {
		return nil, errors.New("documents not found")
	}
	return users, nil

}

func (u *UserServiceImpl) GetAll() ([]*models.User, error) {
	var users []*models.User
	cursor, err := u.usercollection.Find(u.ctx, bson.D{{}})
	if err != nil {
		return nil, err
	}
	for cursor.Next(u.ctx) {
		var user models.User
		err := cursor.Decode(&user)
		if err != nil {
			return nil, err
		}
		users = append(users, &user)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	cursor.Close(u.ctx)

	if len(users) == 0 {
		return nil, errors.New("documents not found")
	}
	return users, nil
}

func (u *UserServiceImpl) UpdateUser(user *models.User) error {
	filter := bson.D{primitive.E{Key: "userId", Value: user.UserId}}
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{
		primitive.E{Key: "nick", Value: user.Nick},
		primitive.E{Key: "firstName", Value: user.FirstName},
		primitive.E{Key: "lastName", Value: user.LastName},
		primitive.E{Key: "email", Value: user.Email},
		primitive.E{Key: "password", Value: user.Password},
		primitive.E{Key: "image", Value: user.Image},
		primitive.E{Key: "role", Value: user.Role},
		primitive.E{Key: "updatedAt", Value: time.Time{}},
		primitive.E{Key: "createdAt", Value: user.CreatedAt},
	}}}
	result, _ := u.usercollection.UpdateOne(u.ctx, filter, update)

	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}
	return nil
}

func (u *UserServiceImpl) AdminUpdateOne(by string, value string) error {
	filter := bson.D{primitive.E{Key: by, Value: value}}
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{
		primitive.E{Key: by, Value: value},
	}}}
	result, _ := u.usercollection.UpdateOne(u.ctx, filter, update)
	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}
	return nil
}
func (u *UserServiceImpl) UpdateOne(by string, value string, nick string) error {
	filter := bson.D{primitive.E{Key: "nick", Value: nick}}
	update := bson.D{primitive.E{Key: "$set", Value: bson.D{
		primitive.E{Key: by, Value: value},
	}}}
	result, _ := u.usercollection.UpdateOne(u.ctx, filter, update)
	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}
	return nil
}

func (u *UserServiceImpl) DeleteUser(name *string) error {
	filter := bson.D{primitive.E{Key: "nick", Value: name}}
	result, _ := u.usercollection.DeleteOne(u.ctx, filter)
	if result.DeletedCount != 1 {
		return errors.New("no matched document found for delete")
	}
	return nil
}
