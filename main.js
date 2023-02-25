const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const DATA_FILE_PATH = "*****"

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        title: 'マイアプリ',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    ipcMain.handle('load-data-file',  async()=> fs.readFileSync(DATA_FILE_PATH,'utf-8'));
    ipcMain.handle('write-data-file', async (_,text) => fs.writeFileSync(DATA_FILE_PATH,text));

    mainWindow.loadFile('index.html');
};

app.once('ready', () => {
    createWindow();
});

app.once('window-all-closed', () => app.quit());