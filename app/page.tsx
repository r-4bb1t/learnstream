import { CACHE_REVALIDATE } from "@/constant/cache";
import Main from "./main";

const fetchPlaylists = async () => {
  const response = await fetch(
    `${process.env.APP_URL}/api/playlist?category=all`,
    {
      next: {
        revalidate: CACHE_REVALIDATE.playlist,
      },
    },
  );
  const playlists = await response.json();
  return playlists;
};

export default async function Home() {
  const playlists = await fetchPlaylists();

  return (
    <main className="h-full min-h-full w-full">
      <Main defaultPlaylist={playlists} />
    </main>
  );
}
