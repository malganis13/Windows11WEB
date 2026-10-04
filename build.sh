#!/bin/bash
# Собирает index.html из частей в src/
cd "$(dirname "$0")/src"
python3 - <<'PY'
h=open('head.html',encoding='utf-8').read();x=open('extra.css',encoding='utf-8').read()
i=h.rfind('</style>');h=h[:i]+x+h[i:]
parts=[h]+[open(f,encoding='utf-8').read() for f in ['core.js','shell.js','apps1.js','apps2.js','apps3.js','tail.html']]
open('../index.html','w',encoding='utf-8').write(''.join(parts))
print('index.html собран')
PY
