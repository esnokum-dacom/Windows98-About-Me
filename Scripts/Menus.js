const MenuTB = document.getElementById("PanelTBM")
const MenuB = document.getElementById("HomeB")
const TextCal = document.getElementById("CalT")
const TextDat = document.getElementById("CalD")
let activeButton = null

function TimeInt() {
  let Time = new Date()
  let Hour = Time.getHours().toString().padStart(2, '0')
  let Min = Time.getMinutes().toString().padStart(2, '0')
  TextCal.innerText = `${Hour}:${Min}`
}

function TimeCal() {
  let TimeC = new Date()
  let Day = TimeC.getDate().toString()
  let Month = TimeC.getMonth().toString()
  let Year = TimeC.getFullYear().toString()
  TextDat.innerText = `${Day}/${Month}/${Year}`
}

setInterval(TimeCal, 1)
setInterval(TimeInt, 1)

MenuB.addEventListener("click", () => {
  if (activeButton === "ABM") {
    MenuTB.classList.remove("MenuOp")
    MenuTB.classList.add("MenuCl")
    activeButton = null
  } else {
    MenuTB.classList.remove("MenuCl")
    MenuTB.classList.add("MenuOp")
    activeButton = "ABM"
  }
})



