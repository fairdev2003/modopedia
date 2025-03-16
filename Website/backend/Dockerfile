FROM golang:alpine
RUN useradd -ms /bin/sh -u 1001 app
USER app
WORKDIR /server

COPY server/go.mod server/go.sum ./

RUN go mod download

COPY server ./
COPY --chown=app:app . /app

EXPOSE 9090

CMD ["go", "run", "cmd/main.go"]