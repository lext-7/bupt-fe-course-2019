package routes

import (
	"github.com/gin-gonic/gin"
	userHandler "learning-go/gin-template/handlers/user"
)

func User(r *gin.Engine, group string) {
	// 由于vendor类型原因，hack了一下
	r.Group(group).GET("/:uid", userHandler.GetUser)
	r.Group(group).POST("/add", userHandler.AddUser)
	r.Group(group).DELETE("/delete", userHandler.DeleteUser)
}
