package helpers

import (
	"fmt"
	"github.com/fairdev2003/honego/config"
	"github.com/fairdev2003/honego/services"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/time/rate"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type Claims struct {
	UserId    string    `json:"userId"`
	Role      string    `json:"role"`
	ExpiresAt time.Time `json:"exp"`
}

func ForbidSiteRequest() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		origin := ctx.Request.Header.Get("Referer")
		fmt.Println("Origin:", ctx.Request.Header)
		if origin != "http://localhost:3000/" {
			ctx.JSON(http.StatusForbidden, gin.H{"message": "Forbidden - Invalid origin"})
			ctx.Abort()
			return
		}
		ctx.Next()
	}
}

func RateLimmiter(requestPerSecond int) gin.HandlerFunc {
	var limiter = rate.NewLimiter(1, requestPerSecond)
	return func(ctx *gin.Context) {
		if !limiter.Allow() {
			ctx.JSON(http.StatusTooManyRequests, gin.H{"code": http.StatusTooManyRequests, "error": "Too many requests", "message": "You are being rate limited"})
			ctx.Abort()
			return
		}
	}
}

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.UnauthorizedHeader,
				"message": config.MissingBearerMessage,
			})
			ctx.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unauthorized")
			}
			return []byte(config.Envs.SuperSecretToken), nil
		})

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.UnauthorizedHeader,
				"message": config.SessionInvalidMessage,
			})
			ctx.Abort()
			return
		}

		expRaw, exists := claims["exp"]
		if !exists {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.TokenExpired,
				"message": config.TokenExpiredMessage,
			})
			ctx.Abort()
			return
		}

		expFloat, ok := expRaw.(float64)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.TokenExpired,
				"message": config.TokenExpiredMessage,
			})
			ctx.Abort()
			return
		}

		exp := int64(expFloat)
		if exp < time.Now().Unix() {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.TokenExpired,
				"message": config.TokenExpiredMessage,
			})
			ctx.Abort()
			return
		}

		ctx.Set("nick", claims["nick"])
		ctx.Set("userId", claims["userId"])

		ctx.Next()
	}
}

func GenerateToken(id string, nick string) (string, error) {
	claims := jwt.MapClaims{
		"userId": id,
		"nick":   nick,
		"exp":    time.Now().Add(time.Hour * 1).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	fmt.Println("Config env", config.Envs.SuperSecretToken)
	return token.SignedString([]byte(config.Envs.SuperSecretToken))
}

func VerifyAdmin(user services.UserService) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		nick := ctx.GetString("nick")
		userId := ctx.GetString("userId")
		LOGGER("userId", userId)
		LOGGER("nick", nick)

		dbUser, err := user.GetUser("userId", userId)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":  http.StatusUnauthorized,
				"error": err.Error(),
			})
			ctx.Abort()
		}
		if dbUser == nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":  http.StatusUnauthorized,
				"error": "User is not found!",
			})
		}

		role := dbUser.Role
		fmt.Println("role:", role)

		if role == config.AdminRole {
			ctx.Next()
		} else {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.RoleTooLow,
				"message": config.RoleTooLowMessage,
			})
			ctx.Abort()
		}
	}
}

func GenerateRandomID() string {
	rand.New(rand.NewSource(time.Now().UnixNano()))
	chars := []rune("0123456789")
	length := 12
	id := make([]rune, length)
	for i := range id {
		id[i] = chars[rand.Intn(len(chars))]
	}
	year := strconv.Itoa(int(time.Now().Year()))
	month := strconv.Itoa(int(time.Now().Month()))
	day := strconv.Itoa(int(time.Now().Day()))
	if len(month) == 1 {
		month = "0" + month
	}
	if len(day) == 1 {
		day = "0" + day
	}
	uuid := year[len(year)-2:] + month + day + string(id)
	return uuid
}
