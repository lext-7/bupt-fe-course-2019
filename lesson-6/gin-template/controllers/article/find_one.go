package article

import (
	"bupt-demos/gin/curd/db"
	"bupt-demos/gin/curd/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func FindOne(c *gin.Context) {
	id := c.Param("id")

	articleID, _ := strconv.ParseInt(id, 10, 64)

	article := &models.Article{
		ID: articleID,
	}

	conn := db.GetDB().Where(article).First(article)

	if conn.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    conn.Error,
			"data":   nil,
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "success",
		"err":    nil,
		"data":   article,
	})
}
