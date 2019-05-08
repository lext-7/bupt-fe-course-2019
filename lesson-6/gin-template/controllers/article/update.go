package article

import (
	"bupt-demos/gin/curd/db"
	"bupt-demos/gin/curd/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UpdateRequest struct {
	ID      int64  `json:"id"`
	Title   string `json:"title"`
	Author  string `json:"author"`
	Content string `json:"content"`
}

func Update(ctx *gin.Context) {
	params := UpdateRequest{}
	err := ctx.BindJSON(&params)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    err,
			"data":   nil,
		})
		return
	}

	conn := db.GetDB().Model(&models.Article{}).Update(&models.Article{
		ID:      params.ID,
		Title:   params.Title,
		Author:  params.Author,
		Content: params.Content,
	})

	if conn.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    conn.Error,
			"data":   nil,
		})
		return
	}

	ctx.JSON(200, gin.H{
		"status": "success",
		"err":    nil,
		"data":   params,
	})
}
