PORT ?= 8033

.PHONY: server lint test check coverage install-hooks
server:
	python3 -m http.server $(PORT)

lint:
	npm run lint

test:
	npm run test

check: lint test

coverage:
	npm run coverage

install-hooks:
	@cp scripts/pre-commit.sh .git/hooks/pre-commit
	@chmod +x .git/hooks/pre-commit
	@echo "Pre-commit hook installed. It runs: npm run check"
