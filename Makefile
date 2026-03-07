PORT ?= 8033

.PHONY: server lint test check coverage clean install-hooks
server:
	python3 -m http.server $(PORT)

lint:
	npm run lint

test:
	npm run test

check:
	npm run check

coverage:
	npm run coverage

clean:
	rm -rf coverage .nyc_output

install-hooks:
	@npm run prepare
	@echo "Husky hooks installed (.husky/pre-commit runs: npm run check)"
