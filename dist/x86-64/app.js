#!/usr/bin/env node

/**
 * @file: app.js
 * @description:
 * @license: MIT
 * @author: Loouis Low <loouis@gmail.com>
 * @copyright: Loouis Low (https://github.com/loouislow81/kraft.ui)
 */

// paths

const core = __dirname + '/core/'
const views = __dirname + '/render/'

// modules

const { app, BrowserWindow, Menu, Tray, Dialog } = require('electron')
const framework = require(core + 'sframework')
const http = require('http')
const path = require('path')
const consoleDetail = require('morgan')
const bodyParser = require('body-parser')

// short-hands

const log = console.log

// get renderer

const server = framework()

// get api request parameters

server.use(bodyParser.urlencoded({
  extended: false
}))

server.use(bodyParser.json())

server.use(framework.static(views))

server.get('/', function(req, res) {
  res.sendFile(views + 'app.html')
})

//throw err
server.use(function(err, req, res, next) {
  if (err) {
    throw err;
  }
  res.sendFile(views + 'app.html')
})

// create random port on each instant

const port = server.listen(0, () => {
  log('[kraft] listening on port:', port.address().port);
})

//
// electron
//

let win, contextMenu

createWindow = () => {
  // create the browser window.
  win = new BrowserWindow({
    backgroundColor: '#262626',
    width: 1280,
    height: 700,
    frame: true,
    title: 'Kraft',
    icon: path.join(__dirname, 'icon.png'),
    webgl: true,
    show: true,
    webPreferences: {
      javascript: true,
      plugins: true,
      zoomFactor: 1, // 100%
      nodeIntegration: false // causes problem!
    }
  })

  // district localhost only
  win.loadURL('http://127.0.0.1:' + port.address().port)

  // custom menu bar

  const template = [{
      label: 'Kraft',
      submenu: [{
          role: 'minimize',
        },
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'View',
      submenu: [{
          role: 'reload',
        },
        {
          role: 'resetzoom',
        },
        {
          role: 'zoomin'
        },
        {
          role: 'zoomout'
        },
        {
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [{
          label: 'About',
          click() {
            require('electron').dialog.showMessageBox({
              type: 'info',
              buttons: ['Close'],
              defaultId: 2,
              title: 'About',
              message: 'Kraft (build v4.6.22)',
              detail: 'A professional tool for crafting the web UI, prototyping and ready for production mockups.\n\n(https://github.com/loouislow81/kraft.ui)'
            })
          }
        },
        {
          label: 'Learn More',
          click() {
            require('electron').shell.openExternal('https://github.com/loouislow81/kraft.ui/wiki')
          }
        }
      ]
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // tray menu

  win.on('minimize', (event) => {
    event.preventDefault()
    win.hide()
  })

  win.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault()
      win.hide()
    }
    return false
  })

  tray = new Tray('applet_icon.png')
  let contextMenu = Menu.buildFromTemplate([{
      label: 'Show App',
      click: () => {
        win.show()
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true
        app.quit()
      }
    }
  ])

  tray.setToolTip('Kraft')
  tray.setContextMenu(contextMenu)

}

app.on('ready', createWindow)

// closed properly if requested by the OS or user
app.on('before-quit', () => {
  isQuiting = true
})

// quit when all windows are closed.
app.on('window-all-closed', () => {
  if (app.listeners('window-all-closed').length === 1 && !option.interactive) {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
