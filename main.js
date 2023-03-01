const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const DATA_FILE_PATH = "*****"


const generateRandomString = function(length){
    
}

const craeteFile = async function(){
    let fileName = generateRandomString(16)
    let path = fileName


    return path
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 1400,
        title: 'マイアプリ',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    ipcMain.handle('load-data-file',  async(_,path)=> fs.readFileSync(path,'utf-8'));
    ipcMain.handle('write-data-file', async(_,arg) => fs.writeFileSync(arg.path,arg.text));
    ipcMain.handle('create-data-file',craeteFile)
    mainWindow.loadFile('index.html');
};

app.once('ready', () => {
    createWindow();
});

app.once('window-all-closed', () => app.quit());