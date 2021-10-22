import React, { useState, useEffect } from 'react';

export function RunLogCatch(cmd: string) {
    window.ddClient.execHostCmd(cmd)
    .then((value: any) => console.log(value.stdout))
    .catch((err: Error) => console.log(err))
}
