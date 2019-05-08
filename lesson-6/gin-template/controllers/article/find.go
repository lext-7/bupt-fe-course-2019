package article

import (
	"bupt-demos/gin/curd/db"
	"bupt-demos/gin/curd/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type FindRequest struct {
	Limit  int    `form:"limit"`
	Offset int    `form:"offset"`
	Author string `form:"author"`
	Title  string `form:"title"`
}

type FindResponse struct {
	List  []models.Article `json:"list"`
	Total int64            `json:"total"`
}

func Find(c *gin.Context) {
	params := FindRequest{}

	err := c.BindQuery(&params)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    err,
			"data":   nil,
		})
		return
	}

	if params.Limit == 0 {
		params.Limit = 10
	}

	res := &FindResponse{
		List:  []models.Article{},
		Total: 0,
	}

	conn := db.GetDB().Model(&models.Article{})
	conn = conn.Limit(params.Limit).Offset(params.Offset)

	if len(params.Title) > 0 {
		conn = conn.Where("title LIKE ?", fmt.Sprintf("%%%s%%", params.Title))
	}
	if len(params.Author) > 0 {
		conn = conn.Where("author LIKE ?", fmt.Sprintf("%%%s%%", params.Author))
	}

	findConn := conn.Find(&res.List)

	if findConn.Error != nil && findConn.Error != gorm.ErrRecordNotFound {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    findConn.Error,
			"data":   nil,
		})
		return
	}

	countConn := conn.Count(&res.Total)
	if countConn.Error != nil && countConn.Error != gorm.ErrRecordNotFound {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    countConn.Error,
			"data":   nil,
		})
		return
	}

	c.JSON(200, gin.H{
		"status": "success",
		"err":    nil,
		"data":   res,
	})
}
