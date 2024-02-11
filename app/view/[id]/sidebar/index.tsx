import { PlaylistType, VideoType } from "@/app/type/playlist";
import SidebarView from "./view";
import { CACHE_REVALIDATE } from "@/constant/cache";
import { cookies } from "next/headers";

const fetchPlaylist = async (playlistId: string) => {
  const userId = cookies().get("learnstream-user")?.value;
  const response = await fetch(
    `${process.env.APP_URL}/api/playlist/${playlistId}`,
    {
      credentials: "include",
      headers: { cookie: `learnstream-user=${userId}` },
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
  return <SidebarView video={video} defaultPlaylist={playlist} />;
}
