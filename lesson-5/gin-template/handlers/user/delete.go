package user

import (
	"github.com/gin-gonic/gin"
)

func DeleteUser(c *gin.Context) {
	//name := c.Query("name")
	//
	//res := "hi" + name
	c.JSON(200, gin.H{
		"res":  "data",
		"data": "haha",
	})
}
