import {
  PlaylistType,
  RawPlaylistType,
  RawVideoType,
  VideoType,
} from "../type/playlist";

export const convertPlaylist = (rawPlaylist: RawPlaylistType): PlaylistType => {
  const playlist: PlaylistType = {
    id: rawPlaylist.items[0].snippet.playlistId,
    title: "",
    description: rawPlaylist.items[0].snippet.description,
    thumbnail: rawPlaylist.items[0].snippet.thumbnails.high.url,
    publishedAt: rawPlaylist.items[0].snippet.publishedAt,
    channelTitle: rawPlaylist.items[0].snippet.channelTitle,
    duration: "",
    videos: rawPlaylist.items.map(
      (rawVideo) => rawVideo.snippet.resourceId.videoId,
    ),
    category: "web",
  };

  return playlist;
};

export const convertVideo = (rawVideo: RawVideoType): VideoType => {
  const video: VideoType = {
    id: rawVideo.items[0].id,
    title: rawVideo.items[0].snippet.title,
    description: rawVideo.items[0].snippet.description,
    thumbnail: rawVideo.items[0].snippet.thumbnails.high.url,
    duration: rawVideo.items[0].contentDetails.duration,
    playlist: "",
  };

  return video;
};

export const convertDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";

  const hours = match[1] ? match[1].replace("H", "") : "0";
  const minutes = match[2] ? match[2].replace("M", "") : "0";
  const seconds = match[3] ? match[3].replace("S", "") : "0";

  return `${hours}:${minutes}:${seconds}`;
};

export const addDuration = (durations: string[]) => {
  const seconds = durations.reduce((acc, cur) => {
    const [hour, minute, second] = cur.split(":").map(Number);
    return acc + hour * 3600 + minute * 60 + second;
  }, 0);
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  return `${hour}:${minute}:${second}`;
};
