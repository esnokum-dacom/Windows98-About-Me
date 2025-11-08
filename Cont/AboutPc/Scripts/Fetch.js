// github

async function GitFetch() {
  try {
    const response = await fetch('https://api.github.com/users/esnokum-dacom');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    document.getElementById('GHPfp').src = data.avatar_url;
    document.getElementById('Git-Name').innerText = data.name;
    document.getElementById('Git-User_name').innerText = data.login;
    document.getElementById('GitDesc').innerText = data.bio;
  } catch (error) {
    console.error('Error', error);
  }
}

GitFetch();


// TIktok

async function TikTokUsr() {
  try {
    const response = await axios.get("https://api.scrapecreators.com/v1/tiktok/profile?handle=lu1.on", {
      headers: { "x-api-key": "t45Nov4v8PSPSmVgkeONfBLSxCq1" }
    });
    const data = response.data;
    document.getElementById("TIKPfp").src = data.user.avatarThumb
    document.getElementById("Tik-Name").innerText = data.user.nickname
    document.getElementById("Tik-User_Name").innerText = data.user.uniqueId
    document.getElementById("TikDesc").innerText = data.user.signature
    console.log(data);
  }
  catch (error) {
    console.error('Error', error);
  }
}

TikTokUsr()

// Discord

const userId = "1390457916506767450";

async function DiscordUsr() {
  try {
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

        document.getElementById("DiscordPfp").src = `https://cdn.discordapp.com/avatars/${info.discord_user.id}/${info.discord_user.avatar}.png?size=256`
        document.getElementById("DC-Name").innerText = info.discord_user.username
      }

    }
  } catch (error) {
    console.error('Error', error);
  }

}

DiscordUsr()
