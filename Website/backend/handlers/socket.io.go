package handlers

import (
	"fmt"
	websocket "github.com/googollee/go-socket.io"
	"log"
)

func RegisterSockets(s *websocket.Server) {
	s.OnEvent("status", "status", func(s websocket.Conn, msg string) string {
		log.Println(msg)
		s.Emit("status", "ok")
		return "siusiak"
	})
	s.OnConnect("/", func(s websocket.Conn) error {
		s.SetContext("")
		fmt.Println("Connected:", s.ID())
		return nil
	})
	s.OnConnect("/", func(s websocket.Conn) error {
		s.SetContext("")
		log.Println("connected:", s.ID())
		return nil
	})
}
