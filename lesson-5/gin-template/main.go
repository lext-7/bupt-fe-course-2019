package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"learning-go/gin-template/routes"
	"log"
	"net/http"
)

func main() {
	Init()
	e.Run(Conf.Addr)
}

type Config struct {
	DB   string
	Addr string
}

var (
	e    *gin.Engine
	Conf *Config
)

func Init() {
	// 初始化配置
	config, err := ioutil.ReadFile("conf/config.yml")
	if err != nil {
		fmt.Print(err)
	}
	err = yaml.Unmarshal(config, &Conf)
	if err != nil {
		log.Fatalf("Unmarshal: %v", err)
	}

	e = gin.Default()

	// 静态文件
	e.Static("/static", "./static")
	// 静态目录
	e.StaticFS("/more_static", http.Dir("static"))

	// 初始化路由
	routes.Routes(e)
}
