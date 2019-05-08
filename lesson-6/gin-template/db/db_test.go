package db_test

import (
	"bupt-demos/gin/curd/db"
	"fmt"
	"testing"
)

func TestDb(t *testing.T) {
	conf := &db.Conf{
		Host: "localhost",
		User: "root",
		Port: 3306,
		Pwd:  "123456",
		Name: "test",
	}

	db.Init(conf)

	type Result struct {
		A int
	}

	result := Result{}
	db.GetDB().Raw("select 1 as a").Scan(&result)
	fmt.Println(result)
}
