const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
    loadFile: (path) => ipcRenderer.invoke('load-data-file',path),
    writeFile:(arg) => ipcRenderer.invoke('write-data-file',arg),
    createFile:()=>ipcRenderer.invoke('create-data-file'),
});