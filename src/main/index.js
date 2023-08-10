import { app } from 'electron'

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('minimize', function (event) {
  event.preventDefault()
  app.hide()
})

require('./mainWindow')
