package db

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

var (
	db *gorm.DB
)

type Conf struct {
	Name string
	Host string
	Port int
	User string
	Pwd  string
}

func NewDBConnection(conf *Conf) (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%d)/%s?parseTime=true",
		conf.User, conf.Pwd, conf.Host, conf.Port, conf.Name,
	)

	connection, err := gorm.Open("mysql", dsn)

	if err != nil {
		return nil, err
	}

	return connection, nil
}

func Init(conf *Conf) {
	var err error
	db, err = NewDBConnection(conf)
	if err != nil {
		panic(err)
	}
}

func GetDB() *gorm.DB {
	return db
}
