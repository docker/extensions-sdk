import React, { useState, useEffect } from 'react';

export function RunLogCatch(cmd: string) {
    window.ddClient
        .execHostCmd(cmd)
        .then((value: any) => console.log(value.stdout))
        .catch((err: Error) => console.log(err));
}

export function RunAsRoot(cmd: string) {
    const os = getOS();
    switch (os) {
        case 'darwin':
            RunLogCatch(
                `term osascript -e 'tell application "Terminal" to activate' -e 'tell application "Terminal" to do script "${window.localStorage.getItem(
                    'binpath',
                )}${cmd}"'`,
            );
            break;
        case 'windows':
            RunLogCatch(cmd);
            break;
        case 'linux':
            RunLogCatch(cmd);
            break;

        default:
            console.log(`${os} not a supported OS`);
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
