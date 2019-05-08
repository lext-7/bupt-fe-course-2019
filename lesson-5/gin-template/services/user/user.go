package user

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/zheng-ji/goSnowFlake"
	"os"
)

type UserServiceInterface interface {
	//Find(request FindRequest) (FindResponse, error)
}

type UserService struct {
	db        *gorm.DB
	idBuilder *goSnowFlake.IdWorker
	UserServiceInterface
}

type newUserServiceParam struct {
	DB *gorm.DB
}

func newUserService(param newUserServiceParam) *UserService {
	idBuilder, err := goSnowFlake.NewIdWorker(1)
	if err != nil {
		fmt.Printf("[services/User] Init snowFlake id_builder error: %+v", err)
		os.Exit(1)
	}
	return &UserService{
		db:        param.DB,
		idBuilder: idBuilder,
	}
}
