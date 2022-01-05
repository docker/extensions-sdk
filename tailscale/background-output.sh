#!/bin/bash

OUT=/tmp/background-output
PIDFILE=/tmp/background-output.pid

if [ -s "$PIDFILE" ]; then
    pkill -F "$PIDFILE"
fi
rm -f "$PIDFILE"
rm -f "$OUT"

nohup "$@" >"$OUT" 2>/dev/null &
echo $! >"$PIDFILE"

inotifywait -qq "$OUT"
until [ -s "$OUT" ]; do
    sleep 0.25
done

cat "$OUT"
exit 0
