const { app, BrowserWindow, ipcMain, dialog } = require('electron');
import ElectronStore from 'electron-store';
const store = new ElectronStore();
const path = require('path');
const fs = require('fs');


const generateRandomString = function(length){
    let chars = "qwertyuiopasdfghjklzxcvbnm1234567890"
    let randomString = ""
    for(let i = 0; i < length; i++){
        randomString += chars[(Math.floor(Math.random() * 10000) % chars.length)]
    }
    return randomString
}

const craeteFile = async function(){
    let fileName = generateRandomString(16)
    store.set(fileName,"")
    return fileName
}

const readFile = async function(_,path){
    if(!store.has(path)){
        store.set(path,"")
    }
    return store.get(path)
}

const writeFile = async function(_,arg){
    store.set(arg.path,arg.text)
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

    ipcMain.handle('load-data-file',readFile);
    ipcMain.handle('write-data-file', writeFile);
    ipcMain.handle('create-data-file',craeteFile)
    mainWindow.loadFile('index.html');
};

app.once('ready', () => {
    createWindow();
});

app.once('window-all-closed', () => app.quit());