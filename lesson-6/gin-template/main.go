package main

import (
	articleController "bupt-demos/gin/curd/controllers/article"
	"bupt-demos/gin/curd/db"
	"fmt"
	"io/ioutil"

	"github.com/gin-gonic/gin"
	"gopkg.in/yaml.v2"
)

type Config struct {
	DB   db.Conf
	Port int64
}

var (
	engine *gin.Engine
	Conf   *Config
)

func Init() {
	// 初始化配置
	config, err := ioutil.ReadFile("conf/config.yml")

	if err != nil {
		panic(err)
	}

	err = yaml.Unmarshal(config, &Conf)
	if err != nil {
		panic(err)
	}

	engine = gin.Default()

	db.Init(&Conf.DB)

	articleGroup := engine.Group("/api/v1/article")
	articleGroup.GET("/:id", articleController.FindOne)
	articleGroup.POST("/", articleController.Add)
	articleGroup.PUT("/", articleController.Update)
	articleGroup.DELETE("/:id", articleController.Delete)
	articleGroup.GET("/", articleController.Find)

}

func main() {
	Init()
	engine.Run(fmt.Sprintf("0.0.0.0:%d", Conf.Port))
}
