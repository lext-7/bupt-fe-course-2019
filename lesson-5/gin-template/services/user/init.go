package user

import (
	"learning-go/gin-template/utils/db"
	"sync"
)

var _userService *UserService
var _userServiceOnce sync.Once

func UserServiceInstance() *UserService {
	_userServiceOnce.Do(func() {

		DB := db.DBClientInstance() // 获取db实例
		//writeClient := db.DBClientInstance().Write()

		// 公司内修改表结构需要提交工单，这里没必要判断然建表
		hasContentTable := DB.HasTable(&User{})
		if hasContentTable == false {
			DB.CreateTable(&User{})
		}

		_userService = newUserService(newUserServiceParam{DB: DB})
	})
	return _userService
}
