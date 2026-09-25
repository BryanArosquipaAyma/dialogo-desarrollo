export function convertirAEmbed(url: string): string | null {
  if (!url) return null;

  // YouTube (múltiples formatos)
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Spotify (episode, track, show, album)
  const spotifyMatch = url.match(
    /open\.spotify\.com\/(episode|track|show|album)\/([a-zA-Z0-9]+)/
  );
  if (spotifyMatch) {
    return `https://open.spotify.com/embed/${spotifyMatch[1]}/${spotifyMatch[2]}`;
  }

  // SoundCloud
  if (url.includes("soundcloud.com")) {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(
      url
    )}&color=%23ff5500&auto_play=false`;
  }

  return null;
}
