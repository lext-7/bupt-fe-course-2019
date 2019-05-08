package routes

import "github.com/gin-gonic/gin"

func Routes(r *gin.Engine) {
	Hello(r, "hello")
	User(r, "user")
	Work(r, "work")
}
