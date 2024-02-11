import { CACHE_REVALIDATE } from "@/constant/cache";
import Main from "./main";
import { cookies } from "next/headers";

const fetchPlaylists = async () => {
  const userId = cookies().get("learnstream-user")?.value;
  const response = await fetch(
    `${process.env.APP_URL}/api/playlist?category=all`,
    {
      credentials: "include",
      headers: { cookie: `learnstream-user=${userId}` },
      next: {
        revalidate: CACHE_REVALIDATE.playlist,
        tags: ["playlist"],
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
      <Main defaultPlaylists={playlists} />
    </main>
  );
}
