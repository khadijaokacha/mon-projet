const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,

    title: "NOVA",

    autoHideMenuBar: true,

    // إخفاء Title Bar القديمة ديال Windows
    titleBarStyle: "hidden",

    // نخليو أزرار Windows: - □ X
    // ونخليو لونهم مندمج مع NOVA
    titleBarOverlay: {
      color: "#071B41",
      symbolColor: "#FFFFFF",
      height: 64,
    },

    backgroundColor: "#071B41",

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      devTools: true,
    },
  });

  win.loadURL("http://localhost:8080");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});