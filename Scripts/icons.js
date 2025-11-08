import CreateWid from "./WidOther.js";

const icon = document.getElementById("IconBack")
let X = 0, Y = 0, SX = 0, SY = 0;

const posGuardada = JSON.parse(localStorage.getItem("IconBackPos"));
if (posGuardada) {
  icon.style.left = posGuardada.left;
  icon.style.top = posGuardada.top;
}

icon.addEventListener("mousedown", StopM)

function StopM(e) {
  SX = e.clientX
  SY = e.clientY

  document.addEventListener("mousemove", mMove)
  document.addEventListener("mouseup", mUp)
}

function mMove(e) {
  X = SX - e.clientX
  Y = SY - e.clientY

  SX = e.clientX
  SY = e.clientY

  icon.style.top = (icon.offsetTop - Y) + "px"
  icon.style.left = (icon.offsetLeft - X) + "px"
}

function mUp(e) {
  document.removeEventListener("mousemove", mMove);
  document.removeEventListener("mouseup", mUp);

  const pos = {
    left: icon.style.left,
    top: icon.style.top
  };

  localStorage.setItem("IconBackPos", JSON.stringify(pos));
}

icon.addEventListener("dblclick", () => CreateWid(icon, "About Onu", "My Pc.png", "Cont/AboutPc/index.html", null, "500", "500"))

