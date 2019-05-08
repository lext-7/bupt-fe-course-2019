package hello

import (
	"github.com/gin-gonic/gin"
	"regexp"
	"strings"
	"net/http"
	"strconv"
)

func HelloWorld(c *gin.Context) {

	name := c.Query("name")

	match, _ := regexp.Match("^[a-z]+$", []byte(name))

	if match {
		resName := strings.ToUpper(name)

		c.HTML(200, "world.html", gin.H{
			"name": resName,
		})
		return
	}
	c.HTML(200, "world.html", gin.H{
		"name": "none",
	})
}

type Hello struct {
	FirstName string
	LastName  string
}

func AddApi(c *gin.Context) {
	firstName := c.Request.FormValue("first_name")
	lastName := c.Request.FormValue("last_name")

	hello := Hello{firstName, lastName}
	// 进行入库操作
	//ra, err := hello.Add()

	//if err != nil {
	//	log.Fatalln(err)
	//}
	// 进行入库操作
	c.JSON(http.StatusOK, gin.H{
		"msg": hello,
	})
}

func GetApi(c *gin.Context) {
	hello := Hello{}
	// 查库操作

	//persons, err := hello.Gets()

	// 查库操作

	c.JSON(http.StatusOK, gin.H{
		"hello": hello,
	})
}

func DelApi(c *gin.Context) {
	cid := c.Param("id")
	id, _ := strconv.Atoi(cid)

	// 删库操作

	// 删库操作

	c.JSON(http.StatusOK, gin.H{
		"msg": id,
	})
}
