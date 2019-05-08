package user

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func AddUser(c *gin.Context) {
	//name := c.Query("name")

	//res := "hi" + name
	c.JSON(http.StatusOK, gin.H{
		"res":  "data",
		"data": "hi",
	})
}
