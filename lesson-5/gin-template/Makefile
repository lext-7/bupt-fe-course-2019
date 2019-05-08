.PHONY: init update start

GONAME=api

default: build

init:
	@git submodule init && git submodule update --recursive

update:
	@git submodule update --recursive && sh ./devops/thrift_gen.sh

start:
	# @GIN_MODE=release ./bin/$(GONAME)
	@export GOFLAGS=-mod=vendor && export GIN_LOG_DIR=./tmp && export GIN_CONF_DIR=./conf && export GO111MODULE=auto && go run *.go


dev:
    @export GOFLAGS=-mod=vendor && export GIN_LOG_DIR=./tmp && export GIN_CONF_DIR=./conf && export GO111MODULE=on && go run *.go
