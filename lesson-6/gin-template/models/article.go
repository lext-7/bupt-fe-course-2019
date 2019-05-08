package models

type Article struct {
	ID      int64  `json:"id"`
	Author  string `json:"author"`
	Content string `json:"content"`
	Title   string `json:"title"`
}
