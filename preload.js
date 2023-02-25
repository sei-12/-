const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
    loadDataFile: () => ipcRenderer.invoke('load-data-file'),
    writeDataFile:(txt) => ipcRenderer.invoke('write-data-file',txt),
});