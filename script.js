function searchSongs() {
    let query = document.getElementById("searchQuery").value;
    if (!query) return;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=AIzaSyCK_BfoHmwwNMeAmO_iW6JVDNXxzK7PRzo`)
        .then(response => response.json())
        .then(data => {
            let results = document.getElementById("searchResults");
            results.innerHTML = "";
            data.items.forEach(video => {
                let div = document.createElement("div");
                div.innerHTML = `
                    <p>${video.snippet.title}</p>
                    <button onclick="playAudio('${video.id.videoId}')">Play</button>
                    <button onclick="addToPlaylist('${video.id.videoId}', '${video.snippet.title}')">Add to Playlist</button>
                `;
                results.appendChild(div);
            });
        });
}

function playAudio(videoId) {
    let audioPlayer = document.getElementById("audioPlayer");

  fetch(`https://your-vercel-app.vercel.app/api/getAudio?videoId=${videoId}`)
   .then(response => response.json())
   .then(data => {
       document.getElementById("audioPlayer").src = data.audioUrl;
       document.getElementById("audioPlayer").play();
   })
   .catch(error => console.error("Error fetching audio:", error));

}

function addToPlaylist(videoId, title) {
    let playlist = document.getElementById("playlist");
    let li = document.createElement("li");
    li.innerHTML = `${title} <button onclick="playAudio('${videoId}')">Play</button>`;
    playlist.appendChild(li);
}
