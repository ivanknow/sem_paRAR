const path = require('path')
const os = require('os')

let mainWindow
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { unrar, list } = require('unrar-promise');

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 500, height: 600, title: "sem paRAR",
        resizable: false,
        backgroundColor: "#F5F5DC",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    mainWindow.webContents.openDevTools()
    mainWindow.loadFile(`./app/index.html`)
}


app.on('ready', () => {
    createMainWindow()
    mainWindow.on("closed", () => { mainWindow = null })
})

ipcMain.on('file:unrar', (e, options) => {
    console.log(options)
    options.destinations = path.join(os.homedir(), "unrarfiles")
    unrarFile(options)
})

async function unrarFile({ rarPath, destinations }) {
    try {

        await unrar(rarPath, destinations);

    } catch (error) {
        console.log(error)
    }
}