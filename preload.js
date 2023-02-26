const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
    loadFile: (path) => ipcRenderer.invoke('load-data-file',path),
    writeFile:(txt,path) => ipcRenderer.invoke('write-data-file',txt,path),
    createFile:()=>ipcRenderer.invoke('create-data-file'),
});