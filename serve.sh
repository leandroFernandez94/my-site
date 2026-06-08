#!/usr/bin/env bash
# Serve the static site on the local network
# Requires Node.js — reads PORT from .env or defaults to 3001
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

exec node server.js
