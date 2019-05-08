package routes

import (
	"github.com/gin-gonic/gin"
	helloHandler "learning-go/gin-template/handlers/hello"
)

func Work(r *gin.Engine, group string) {
	// 由于vendor类型原因，hack了一下
	r.Group(group).GET("/hello", helloHandler.HelloWorld)
}
