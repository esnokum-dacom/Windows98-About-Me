const ContainerAlb = document.getElementById("Albumscalendar")

async function GetAlbumRec() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/esnokum-dacom/Music-Taste/refs/heads/main/Music/AlbumsRec.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data)

    data.album.sort((a, b) => b.id + a.id)
      .forEach(alb => {
        const RContainer = document.createElement("div")
        RContainer.className = "CdocAb"
        ContainerAlb.append(RContainer)

        const albumMonth = document.createElement("h2")
        albumMonth.innerText = alb.month;
        albumMonth.className = "Bander"
        albumMonth.id = "TextBander"
        RContainer.appendChild(albumMonth)

        const ImageTitle = document.createElement("h2")
        ImageTitle.innerText = alb.albumname;
        ImageTitle.className = "Bander"
        ImageTitle.id = "Song"
        RContainer.appendChild(ImageTitle)

        const infoAlb = document.createElement("div")
        infoAlb.className = "ContTh"
        RContainer.appendChild(infoAlb)

        const image = document.createElement('img');
        image.src = alb.albumart;
        image.className = "Art-img"
        infoAlb.appendChild(image);

        const infB = document.createElement("div")
        infB.className = "Infoh"
        infoAlb.appendChild(infB)

        const artistName = document.createElement("h2")
        artistName.innerText = alb.artistname;
        artistName.className = "Bander"
        artistName.id = "TextBander"
        infB.appendChild(artistName)

        const Thought = document.createElement("p")
        Thought.className = "Bander"
        Thought.id = "ThoughtAlb"
        Thought.innerText = alb.thought
        infB.appendChild(Thought)

      });

  } catch (error) {

  }
}

GetAlbumRec()

