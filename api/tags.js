export default async function handler(req, res) {
  const videoId = req.query.videoId;

  const API_KEY = process.env.YOUTUBE_API_KEY;

  const apiUrl =
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return res.status(404).json({ error: "Video not found" });
  }

  const title = data.items[0].snippet.title;
  const description = data.items[0].snippet.description;

  // ✅ Generate Keywords instead of Tags
  const keywords = (
    title +
    " " +
    description
  )
    .split(" ")
    .filter(word => word.length > 4)
    .slice(0, 25);

  return res.status(200).json({ tags: keywords });
}
