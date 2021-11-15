import React, { useState, useEffect } from 'react';

export function RunLogCatch(cmd: string) {
    window.ddClient
        .execHostCmd(cmd)
        .then((value: any) => console.log(value.stdout))
        .catch((err: Error) => console.log(err));
}

export function RunAsRoot(cmd: string) {
    switch (getOS()) {
        case 'darwin':
            RunLogCatch(
                `term osascript -e 'tell application "Terminal"
                    activate 
                    do script "${window.localStorage.getItem('binpath')}${cmd}"
                end tell'`,
            );
            break;

        default:
            RunLogCatch(cmd);
            break;
    }
}

function getOS() {
    const platform = window.navigator.platform;
    if (platform.includes('Win')) {
        return 'windows';
    }
    if (platform.includes('Mac')) {
        return 'darwin';
    }
    if (platform.includes('Linux')) {
        return 'linux';
    }
    return platform;
}
// test command
// osascript -e 'tell application "Terminal" to activate' -e 'tell application "Terminal" to do script "telepresence connect"'
