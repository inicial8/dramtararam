/* eslint-disable */
import {
  EventEmitter
} from 'events'
import {
  BrowserWindow,
  app,
  Menu,
  Tray,
  ipcRenderer
} from 'electron'
import { removeListener } from 'process'
const DEV_SERVER_URL = process.env.DEV_SERVER_URL
const isProduction = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

export default class BrowserWinHandler {
  /**
   * @param [options] {object} - browser window options
   * @param [allowRecreate] {boolean}
   */
  constructor(options, allowRecreate = true) {
    this._eventEmitter = new EventEmitter()
    this.allowRecreate = allowRecreate
    this.options = options
    this.browserWindow = null
    this._createInstance()
    this.tray = null
  }

  _createInstance() {
    if (app.isReady()) this._create()
    else {
      app.once('ready', () => {
        this._create()
      })
    }
    if (!this.allowRecreate) return
    app.on('activate', () => this._recreate())
  }

  _create() {
    this.browserWindow = new BrowserWindow({
      ...this.options,
      webPreferences: {
        ...this.options.webPreferences,
        webSecurity: isProduction,
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
    // this.browserWindow.hide()
    this.browserWindow.on('closed', () => {
      this.browserWindow = null
    })
    this._eventEmitter.emit('created')
  }

  _recreate() {
    if (this.browserWindow === null) this._create()
  }

  onCreated(callback) {
    if (this.browserWindow !== null) return callback(this.browserWindow);
    this._eventEmitter.once('created', () => {
      callback(this.browserWindow)
    })
  }

  async loadPage(pagePath) {
    if (!this.browserWindow) return Promise.reject(new Error('The page could not be loaded before win \'created\' event'))
    const serverUrl = isDev ? DEV_SERVER_URL : 'app://./index.html'
    const fullPath = serverUrl + '#' + pagePath;
    await this.browserWindow.loadURL(fullPath)
  }

  created() {
    return new Promise(resolve => {
      this.onCreated(() => resolve(this.browserWindow))
    })
  }

  async setTray(browserWindow) {
    await app.whenReady().then(() => {
      this.tray = new Tray('build/icons/32x32.png', )
      const contextMenu = Menu.buildFromTemplate([{
          label: 'Dashboard',
          click(){ browserWindow.show() }
        },
        {
          type: 'separator',
        },
        {
          label: 'Close',
          click(){ app.exit() }
        }
      ])
      this.tray.setToolTip('predock Desktop')
      this.tray.setContextMenu(contextMenu)
      this.tray.on('double-click', () => {
        browserWindow.show()
      })
    })
  }

  minimize() {
    this.browserWindow.minimize()
  }

  maximize() {
    if(this.browserWindow.maximizable){
      this.browserWindow.unmaximize()
      this.browserWindow.maximizable = false
    }else{
      this.browserWindow.maximizable = true
      this.browserWindow.maximize()
    }
  }

  close() {
    this.browserWindow.hide()
  }
}
