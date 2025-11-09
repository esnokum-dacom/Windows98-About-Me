const ContainerImgs = document.getElementById("ImagesContainer")

async function GetImages() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/esnokum-dacom/Renders-Images/refs/heads/main/Renders.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    data.images
    data.images.sort((a, b) => b.id - a.id)
      .forEach(img => {
        const RContainer = document.createElement("div")
        RContainer.className = "CdocAb"
        ContainerImgs.append(RContainer)

        const ImageTitle = document.createElement("h2")
        ImageTitle.innerText = img.name;
        ImageTitle.className = "Bander"
        ImageTitle.id = "TextBander"
        RContainer.appendChild(ImageTitle)

        const image = document.createElement('img');
        image.src = img.imglink;
        image.className = "Render-img"
        RContainer.appendChild(image);
      });

  } catch (error) {

  }
}

GetImages()
