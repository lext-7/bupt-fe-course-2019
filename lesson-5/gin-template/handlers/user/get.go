package user

import (
	"github.com/gin-gonic/gin"
)

func GetUser(c *gin.Context) {
	//uid := c.Param("uid")
	//
	//user := user.User{}
	//
	//// 这里可以对uid进行判断
	//
	//db := db.DBClientInstance()
	//
	//db.Where("ID =?", uid).First(&user)

	c.JSON(200, gin.H{
		"res":  "data",
		"data": "haha",
	})
}
