package article

import (
	"bupt-demos/gin/curd/db"
	"bupt-demos/gin/curd/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AddRequest struct {
	Title   string `json:"title"`
	Author  string `json:"author"`
	Content string `json:"content"`
}

func Add(ctx *gin.Context) {
	params := AddRequest{}
	err := ctx.BindJSON(&params)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    err,
			"data":   nil,
		})
		return
	}

	article := models.Article{
		Title:   params.Title,
		Content: params.Content,
		Author:  params.Author,
	}

	conn := db.GetDB().Create(&article)

	if conn.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status": "error",
			"err":    conn.Error,
			"data":   nil,
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"status": "success",
		"err":    nil,
		"data":   article,
	})
}
