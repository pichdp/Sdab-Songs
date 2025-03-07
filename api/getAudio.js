export default async function handler(req, res) {
    const { videoId } = req.query;
    if (!videoId) {
        return res.status(400).json({ error: "Missing videoId" });
    }

    const audioUrl = `https://api.vevioz.com/download-audio?url=https://www.youtube.com/watch?v=${videoId}`;
    return res.status(200).json({ audioUrl });
}
