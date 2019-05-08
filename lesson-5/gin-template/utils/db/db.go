package db

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
)

var (
	db   *gorm.DB
	Conf *Config
)

type Config struct {
	DB       string
	Addr     string
	User     string
	PassWord string
	Host     string
	Port     string
	DataBase string
}

func DBClientInstance() *gorm.DB {
	config, err := ioutil.ReadFile("conf/config.yml")
	if err != nil {
		fmt.Print(err)
	}
	err = yaml.Unmarshal(config, &Conf)
	if err != nil {
		log.Fatalf("Unmarshal: %v", err)
	}

	db, _ = gorm.Open("mysql", "%s:%s@%s(%s:%d)/%s", Conf.User, Conf.PassWord, "tcp", Conf.Host, Conf.Port, Conf.DataBase)

	return db
}
