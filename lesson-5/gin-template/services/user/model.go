package user

import "time"

type User struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name`
	UpdatedAt time.Time `json:"updated_at"`
	CreateAt  time.Time `json:"create_at"`
}
