const client_id = '522f34cf68374de8a9e64d04402ca9ba';
const client_secret = '6fe22a4da44a4828b0a7080acd8f2a6d';
const refresh_token = 'AQCwu9sCngTBnrgLqi-R1SBaoGuI1UFsYSwaIcSKboUpia8OXJXKOuIql5nsLb0hvKz6pHN6fjQ2JAzt1Ba4HyHKAvOPK7z9ytkuZGeQ7ir4a06oWRUuBSETRFmf6YWv7hY';

async function getAccessToken() {
  const auth = btoa(`${client_id}:${client_secret}`);

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
  });

  const data = await res.json();
  return data.access_token;
}

async function getCurrentlyPlaying() {
  const token = await getAccessToken();

  const res = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (res.status === 204) {
    console.log('No estás escuchando nada ahora mismo.');
    return;
  }

  const data = await res.json();
  const song = data.item;
  const track = data.item;

  const progressms = data.progress_ms;
  const durationMs = track.duration_ms;

  const Time = t => {
    const totalSeconds = Math.floor(t / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}⁺${seconds.toString().padStart(2, '0')}`
  }

  document.getElementById('Song').innerText = `⋆ ${song.name}`;
  document.getElementById('AlbumArt').src = song.album.images[0].url;
  document.getElementById("Artist").innerText = ` ${song.artists[0].name}`
  document.getElementById("Album").innerText = ` ${song.album.name}`
  document.getElementById("Time").innerText = ` ${Time(progressms)} ♱ ${Time(durationMs)} `
  document.getElementById("BarInt").style.width = ` ${((progressms / durationMs) * 100).toFixed(1)}%`
}

setInterval(getCurrentlyPlaying, 1000);

