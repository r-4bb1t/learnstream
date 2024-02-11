import { PlaylistType, VideoType } from "@/app/type/playlist";
import SidebarView from "./view";
import { CACHE_REVALIDATE } from "@/constant/cache";

const fetchPlaylist = async (playlistId: string) => {
  const response = await fetch(
    `${process.env.APP_URL}/api/playlist/${playlistId}`,
    {
      next: {
        revalidate: CACHE_REVALIDATE.playlistOfVideo,
      },
    },
  );
  const playlist: PlaylistType & { videos: VideoType[] } =
    await response.json();
  return playlist;
};

export default async function Sidebar({ video }: { video: VideoType }) {
  const playlist = await fetchPlaylist(video.playlist);
  return <SidebarView video={video} playlist={playlist} />;
}
