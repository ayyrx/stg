'use strict'; // 2021-01-17 20.26
const fs = require('fs');
function xdFileWrite(path, data) {
    if (process.platform === 'win32')
        path = path.replace(/\\/g, '/');
    path = path.replace(/\/$/, '');
    const dir = path.slice(0, path.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    else if (!fs.statSync(dir).isDirectory()) {
        throw new Error(`failed to write file "${path}": "${dir}" is not a directory`);
    }
    fs.writeFileSync(path, data);
}
exports.xdFileWrite = xdFileWrite;
