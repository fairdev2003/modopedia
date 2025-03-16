package helpers

import "github.com/joho/godotenv"

type Helpers struct{}

func DatabaseURI() string {

	prod := true
	if prod {
		return "mongodb+srv://admin:NKGpsKXllhHGaEIM@spotify-clone.ucfqqik.mongodb.net/?retryWrites=true&w=majority&appName=spotify-clone"
	}

	env, err := godotenv.Read(".env")
	if err != nil {
		panic(err)
	}

	return env["DATABASE_URI"]
}
