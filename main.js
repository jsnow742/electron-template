const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// keep a global reference of the window object
// this prevents automatic closing of the window when the
// JS object is garbage collected

let mainWindow

function createWindow () {
    // create browser window
    mainWindow = new BrowserWindow({width: 1600, height: 900})

    // load index.html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))

    // open DevTools
    mainWindow.webContents.openDevTools()

    // emit when window closed
    mainWindow.on( 'closed', () => {
        // dereference window object (or array)
        mainWindow = null
    })
}

app.on('ready', createWindow)

// quit app when all windows are closed
app.on('window-all-closed', () => {
    // macOS apps often do not quit unless the user
    // explicitly does so via Cmd+Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // macOS often re-creates a window in the app
    // when the dock icon is clicked and no other
    // windows are open
    if (win === null) {
        createWindow()
    }
})

// the rest of the app may contain specific main process
// code, or it can be put into separate files and required here