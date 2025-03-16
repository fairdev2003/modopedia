package services

type WebsocketService interface {
	Connect()
	Disconnect()
	Send(string)
	Receive()
}
