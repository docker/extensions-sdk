import React, { useState, useEffect } from 'react';

export function RunLogCatch(cmd: string) {
    window.ddClient
        .execHostCmd(cmd)
        .then((value: any) => console.log(value.stdout))
        .catch((err: Error) => console.log(err));
}

export function RunInTerminal(cmd: string) {
    RunLogCatch(
        `term osascript -e 'tell application "Terminal" to activate' -e 'tell application "Terminal" to do script "${cmd}"'`,
    );
}

// test command
// osascript -e 'tell application "Terminal" to activate' -e 'tell application "Terminal" to do script "telepresence connect"'
