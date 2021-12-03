#!/bin/bash

OUT=/tmp/background-output
PIDFILE=/tmp/background-output.pid
PID=$(cat "$PIDFILE")

# snapshot current number of lines in the file. These have
# already been read by App.tsx, we'll throw them away here.
startline=$(cat "$OUT" | wc -l)
let startline+=1

# Wait for pid to exit.
tail --pid="$PID" -f /dev/null

tail -n +"$startline" "$OUT"
exit 0
