package routes

import (
	"github.com/gin-gonic/gin"
	helloHandler "learning-go/gin-template/handlers/hello"
)

func Hello(r *gin.Engine, group string) {

	// 设置html路径
	r.LoadHTMLGlob("static/views/*")

	r.Group(group).GET("/world", helloHandler.HelloWorld)
	r.Group(group).GET("/:id", helloHandler.GetApi)
	r.Group(group).POST("/:id", helloHandler.AddApi)
	r.Group(group).DELETE("/:id", helloHandler.DelApi)
}
