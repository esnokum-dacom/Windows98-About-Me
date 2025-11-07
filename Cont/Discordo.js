const userId = "1390457916506767450";
const ws = new WebSocket("wss://api.lanyard.rest/socket");

ws.onopen = () => {
  ws.send(JSON.stringify({
    op: 2,
    d: { subscribe_to_id: userId }
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
    const info = data.d;
    const status = info.discord_status
    const user = info.discord_user;
    const activities = info.activities;
    const state = activities.find(a => a.type === 4);
    const usern = info.discord_user.username;
    const DisplayN = info.discord_user.display_name;
    const spotify = info.spotify;


    document.getElementById("avatarDc").src =
      `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
    document.getElementById("user").innerText =
      `${DisplayN} - ${usern}`;
    document.getElementById("status").innerText = `Status / ${status}`
    document.getElementById("StatDc").innerText = `${state.state}`


    if (spotify) {
      const start = spotify.timestamps.start;
      const end = spotify.timestamps.end;
      const durationMs = end - start;

      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);

      document.getElementById("songNam").innerText = `${spotify.song}`
      document.getElementById("Artist").innerText = `${spotify.artist}`
      document.getElementById("CoverArtDc").src = spotify.album_art_url
      document.getElementById("Album").innerText = `${spotify.album}`
      document.getElementById("TempoT").innerText =
        `⊹ ₊ ${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    else if (spotify === null) {
      document.getElementById("songNam").innerText = "No listen now"
    }
  }
};
