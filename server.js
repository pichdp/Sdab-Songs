const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/get-audio', async (req, res) => {
    const videoId = req.query.videoId;
    if (!videoId) return res.status(400).json({ error: "Missing videoId" });

    try {
        const apiURL = `https://www.yt-download.org/api/button/mp3/${videoId}`;
        const response = await fetch(apiURL);
        const html = await response.text();

        let match = html.match(/href="(https:\/\/[^"]+\.mp3)"/);
        if (match) {
            res.json({ audioUrl: match[1] });
        } else {
            res.status(404).json({ error: "Audio not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch audio" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
