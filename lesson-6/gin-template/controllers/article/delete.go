package article

import (
	"bupt-demos/gin/curd/db"
	"bupt-demos/gin/curd/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Delete(c *gin.Context) {
	id := c.Param("id")

	articleID, err := strconv.ParseInt(id, 10, 64)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    err,
			"data":   nil,
		})
		return
	}

	conn := db.GetDB().Delete(&models.Article{
		ID: articleID,
	})

	if conn.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    conn.Error,
			"data":   nil,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"err":    nil,
		"data":   true,
	})
}
