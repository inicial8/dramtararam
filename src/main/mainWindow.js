import BrowserWinHandler from './BrowserWinHandler'

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 800,
  autoHideMenuBar: true,
  frame: false,
  titleBarStyle: 'customButtonsOnHover',
  icon: '/build/icons/64x64.png'
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  winHandler.setTray(_browserWindow)
})

const { ipcMain } = require('electron')

ipcMain.on('minimizeApp', () => {
  winHandler.minimize()
})

ipcMain.on('closeApp', () => {
  winHandler.close()
})

ipcMain.on('maximizeApp', () => {
  winHandler.maximize()
})

export default winHandler
