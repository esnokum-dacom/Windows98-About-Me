import CreateWid from "./WidOther.js";

const IntExplorer = document.getElementById("IconAb")
const explHome = document.querySelector(".intab")

IntExplorer.addEventListener("click", () => CreateWid(IntExplorer, "Explorer", "MIE.png", "Cont/Explorer/index.html",))
explHome.addEventListener("click", () => CreateWid(explHome, "Explorer", "MIE.png", "Cont/Explorer/index.html"))
