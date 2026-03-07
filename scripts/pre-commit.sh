#!/bin/sh
# Pre-commit hook: run lint and tests.
# Install with: make install-hooks
set -e
cd "$(git rev-parse --show-toplevel)"
if command -v npm >/dev/null 2>&1; then
  npm run check
else
  echo "npm not found; skipping pre-commit check. Install Node and run: make check"
  exit 0
fi
