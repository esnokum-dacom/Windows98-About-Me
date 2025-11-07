const WindoowsEmp = document.getElementById("Windows")
const TbBar = document.getElementById("buttonsTB")

let windowCount = 0

const WindowStorage = {
  STORAGE_KEY: 'desktop_windows',

  saveAll(windows) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(windows));
    } catch (e) {
      console.error('Error guardando ventanas:', e);
    }
  },

  loadAll() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error cargando ventanas:', e);
      return [];
    }
  },

  saveWindow(windowData) {
    const windows = this.loadAll();
    const index = windows.findIndex(w => w.id === windowData.id);

    if (index >= 0) {
      windows[index] = windowData;
    } else {
      windows.push(windowData);
    }

    this.saveAll(windows);
  },

  removeWindow(windowId) {
    const windows = this.loadAll();
    const filtered = windows.filter(w => w.id !== windowId);
    this.saveAll(filtered);
  },

  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
};

export default function CreateWid(Trigger, NameApp, IconApp, PageApp, savedData = null, Width, Height) {
  let X = 0, Y = 0, SX = 0, SY = 0;
  const AppId = NameApp;
  windowCount++;


  const windowId = savedData?.id || `win_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const win = document.createElement("div");
  win.className = "NWindow";
  win.style.width = `${Width}px`;
  win.style.height = `${Height}px`;

  const initialX = savedData?.x || Math.floor(Math.random() * 200 + 1);
  const initialY = savedData?.y || Math.floor(Math.random() * 200 + 1);
  win.style.left = initialX + "px";
  win.style.top = initialY + "px";

  if (savedData?.minimized) {
    win.classList.add("NWindowOff");
    win.classList.remove("NWindow");
  }

  win.dataset.id = windowId;
  WindoowsEmp.appendChild(win);

  const NavWindow = document.createElement("div");
  NavWindow.className = "NaWindowOn";
  win.appendChild(NavWindow);

  const explImgTab = document.createElement("img");
  explImgTab.src = `./Props/Icons/${IconApp}`;
  explImgTab.className = "TbAppITb";
  NavWindow.appendChild(explImgTab);

  const nAppW = document.createElement("p");
  nAppW.className = "InTbWin";
  nAppW.innerText = AppId;
  NavWindow.appendChild(nAppW);

  const NavCont = document.createElement("div");
  NavCont.className = "ContNavig";
  NavWindow.appendChild(NavCont);

  const iconC = document.createElement("button");
  iconC.className = "IcNav";
  NavCont.appendChild(iconC);

  const iconM = document.createElement("button");
  iconM.className = "IcNav";
  NavCont.appendChild(iconM);

  const icX = document.createElement("img");
  icX.className = "IcInt";
  icX.src = "./Props/Icons/ekis.png";
  iconM.appendChild(icX);

  const icM = document.createElement("img");
  icM.className = "IcInt";
  icM.src = "./Props/Icons/Mini.png";
  iconC.appendChild(icM);

  function saveCurrentState() {
    const windowData = {
      id: windowId,
      name: NameApp,
      icon: IconApp,
      page: PageApp,
      width: Width,
      height: Height,
      x: parseInt(win.style.left),
      y: parseInt(win.style.top),
      minimized: win.classList.contains("NWindowOff"),
      zIndex: win.style.zIndex || 1
    };
    WindowStorage.saveWindow(windowData);
  }

  icM.addEventListener("click", () => {
    win.classList.remove("NWindow");
    win.classList.add("NWindowOff");
    saveCurrentState();
  });

  const TbWin = document.createElement("div");
  TbWin.className = "TbWin";
  TbWin.dataset.id = windowId; // Usar mismo ID
  TbBar.appendChild(TbWin);

  const explImg = document.createElement("img");
  explImg.src = `./Props/Icons/${IconApp}`;
  explImg.className = "TbAppI";
  TbWin.appendChild(explImg);

  const nWind = document.createElement("p");
  nWind.className = "InTbN";
  nWind.innerText = AppId;
  TbWin.appendChild(nWind);

  icX.addEventListener("click", () => {
    win.remove();
    TbWin.remove();
    WindowStorage.removeWindow(windowId);
  });

  TbWin.addEventListener("click", () => {
    if (win.classList.contains("NWindow") && NavWindow.classList.contains("NaWindowOn")) {
      win.classList.remove("NWindow");
      win.classList.add("NWindowOff");
    }
    else if (NavWindow.classList.contains("NaWindowOff") && win.classList.contains("NWindow")) {
      focusWindow(win);
      focusOnTab(NavWindow);
    }
    else if (win.classList.contains("NWindowOff")) {
      win.classList.remove("NWindowOff");
      win.classList.add("NWindow");
    }
    saveCurrentState();
  });

  NavWindow.addEventListener("mousedown", StopM);

  function StopM(e) {
    SX = e.clientX;
    SY = e.clientY;
    document.addEventListener("mousemove", mMove);
    document.addEventListener("mouseup", mUp);
  }

  function mMove(e) {
    X = SX - e.clientX;
    Y = SY - e.clientY;
    SX = e.clientX;
    SY = e.clientY;
    win.style.top = (win.offsetTop - Y) + "px";
    win.style.left = (win.offsetLeft - X) + "px";
  }

  function mUp() {
    document.removeEventListener("mousemove", mMove);
    document.removeEventListener("mouseup", mUp);
    saveCurrentState();
  }

  win.addEventListener("mousedown", () => {
    focusWindow(win);
    focusOnTab(NavWindow);
  });

  const webIfP = document.createElement("iframe");
  webIfP.src = PageApp;
  webIfP.className = "abtWeb";
  win.appendChild(webIfP);

  saveCurrentState();

  if (!savedData) {
    saveCurrentState();
  }

  return windowId;
}

function restoreWindows() {
  const savedWindows = WindowStorage.loadAll();

  savedWindows.forEach(windowData => {
    CreateWid(
      null,
      windowData.name,
      windowData.icon,
      windowData.page,
      windowData,
      windowData.width,
      windowData.height
    );
  });
}
window.addEventListener('DOMContentLoaded', () => {
  restoreWindows();
});

export { WindowStorage, restoreWindows };

const windows = WindowStorage.loadAll();
console.log('Ventanas guardadas:', windows);

function focusWindow(win) {
  document.querySelectorAll(".NWindow").forEach(w => {
    w.style.zIndex = "0"
  })
  win.style.zIndex = "10"
}

function focusOnTab(NavWindow) {
  document.querySelectorAll(".NaWindowOn").forEach(w => {
    w.classList.remove("NaWindowOn")
    w.classList.add("NaWindowOff")
  })
  NavWindow.classList.remove("NaWindowOff")
  NavWindow.classList.add("NaWindowOn")
}
