PORT ?= 8033

.PHONY: server
server:
	python3 -m http.server $(PORT)
