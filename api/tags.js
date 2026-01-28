
export default async function handler(req, res) {
  const videoId = req.query.videoId;

  if (!videoId) {
    return res.status(400).json({ error: "Video ID missing" });
  }

  const API_KEY = process.env.YOUTUBE_API_KEY;

  const apiUrl =
`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: "Video not found" });
    }

    const tags = data.items[0].snippet.tags || [];

    return res.status(200).json({ tags });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
