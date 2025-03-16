package config

const (

	// DATABASE BOILERPLATE
	DefaultAvatar = "https://res.cloudinary.com/dzaslaxhw/image/upload/v1709757036/users/deafult.avif"
	DefaultRole   = "User"
	AdminRole     = "Admin"

	// AUTH
	RoleTooLow            = "Your role is too low!"
	UnauthorizedHeader    = "Unauthorized"
	RoleTooLowMessage     = "To query this endpoint, you must have Admin role or higher. If you have it, please contact the website administrator."
	SessionInvalidMessage = "Your session is invalid!"
	TokenExpired          = "Token expired!"
	TokenExpiredMessage   = "Your session is expired. Please log in again."
	MissingBearerMessage  = "Your http request does not have the appropriate authentication headers, request will always be failed!"

	// LOGIN
	InvalidCredentials        = "Invalid email or password"
	InvalidCredentialsMessage = "Your login details are incorrect. Please try again or reset your password"
	TokenFuncError            = "Error while generating token"
	TokenFuncErrorMessage     = "A server error has occurred, please try again or contact the website administrator"
	LoginOk                   = "You have logged in successfully!"

	// REGISTER
	ServerError           = "A server error has occurred, please contact the website administrator"
	RegisterOk            = "Your account has been successfully registered. Now you can log in"
	PassHashError         = "Error during hashing password"
	PassHashErrorMessage  = "A server error has occurred, please try again or contact the website administrator"
	UserExists            = "User is already registered"
	UserExistsMessage     = "This account already exists. Please log in to continue"
	InvalidRequest        = "Your request contains an invalid structure"
	InvalidRequestMessage = "Dear user, please use this query for our website. However, if this is an error, please contact the site administrator or try again later"
)
