package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type FindType struct {
	Query string
}

type User struct {
	ID        string    `json:"_id" bson:"_id,omitempty"`
	Nick      string    `json:"nick" bson:"nick,omitempty"`
	UserId    string    `json:"userId" bson:"userId,omitempty"`
	FirstName string    `json:"firstName" bson:"firstName,omitempty"`
	LastName  string    `json:"lastName" bson:"lastName,omitempty"`
	Email     string    `json:"email" bson:"email,omitempty"`
	Password  string    `json:"password" bson:"password,omitempty"`
	CreatedAt time.Time `json:"createdAt" bson:"createdAt,omitempty"`
	UpdatedAt time.Time `json:"updatedAt" bson:"updatedAt,omitempty" `
	Image     string    `json:"image" bson:"image,omitempty"`
	Role      string    `json:"role" bson:"role,omitempty"`
}

type Item struct {
	ID               primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	AuthorID         primitive.ObjectID `json:"authorId" bson:"authorId,omitempty"`
	ItemName         string             `json:"item_name" bson:"item_name,omitempty"`
	ItemTag          string             `json:"item_tag" bson:"item_tag,omitempty"`
	StackSize        int                `json:"stack_size" bson:"stack_size,omitempty"`
	ModId            primitive.ObjectID `json:"modId" bson:"modId,omitempty"`
	Mod              Mod                `json:"mod" bson:"mod,omitempty"`
	Type             string             `json:"type" bson:"type,omitempty"`
	MaterialValue    int                `json:"material_value" bson:"material_value,omitempty" default:"0"`
	ShortDescription string             `json:"short_description" bson:"short_description,omitempty"`
	CreatedAt        time.Time          `json:"createdAt" bson:"createdAt,omitempty"`
	UpdatedAt        time.Time          `json:"updatedAt" bson:"updatedAt,omitempty"`
}

type Mod struct {
	ID             primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	ModName        string             `json:"modName" bson:"modName,omitempty"`
	Tag            string             `json:"tag" bson:"tag,omitempty"`
	ModDescription string             `json:"modDescription" bson:"modDescription,omitempty"`
	ModLoaders     []string           `json:"modloaders" bson:"modloaders,omitempty"`
	ImageSrc       string             `json:"image_src" bson:"image_src,omitempty"`
	UserId         primitive.ObjectID `json:"userId" bson:"userId,omitempty"`
	User           User               `json:"user" bson:"user,omitempty"`
	UpdatedAt      time.Time          `json:"updatedAt" bson:"updatedAt,omitempty"`
	CreatedAt      time.Time          `json:"createdAt" bson:"createdAt,omitempty"`
}

type Login struct {
	Email    string `json:"email" bson:"email,omitempty"`
	Password string `json:"password" bson:"password,omitempty"`
}

type Register struct {
	Email     string `json:"email" bson:"email,omitempty"`
	Password  string `json:"password" bson:"password,omitempty"`
	Nick      string `json:"nick" bson:"nickname,omitempty"`
	FirstName string `json:"firstName" bson:"firstName,omitempty"`
	LastName  string `json:"lastName" bson:"lastName,omitempty"`
}
