import CreateWid from "./WidOther.js";

const IntExplorer = document.getElementById("IconAb")
const explHome = document.querySelector(".intab")

IntExplorer.addEventListener("click", () => CreateWid(IntExplorer, "Microsoft Explorer", "MIE.png", "Cont/index.html",))
explHome.addEventListener("click", () => CreateWid(explHome, "Microsoft Explorer", "MIE.png", "Cont/index.html"))
