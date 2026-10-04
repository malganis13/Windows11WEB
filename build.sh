#!/bin/bash
# Собирает один самодостаточный index.html из частей в src/
set -e
cd "$(dirname "$0")"
P=src
cat $P/head.html $P/core.js $P/shell.js $P/apps1.js $P/apps2.js $P/apps3.js $P/apps4.js $P/apps5.js $P/apps6.js $P/apps7.js $P/apps8.js $P/apps9.js $P/tail.html > index.html
echo "index.html собран ($(wc -c < index.html) байт)"
