import CreateWid from "../../Scripts/WidOther.js";

export const Renders = document.getElementById("CreateCW")

Renders.addEventListener("click", () => {
  CreateWid(Renders, "About Onu", "My Pc.png", "Cont/AboutPc/index.html", null, "500", "500")
})

