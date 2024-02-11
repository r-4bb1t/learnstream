import Sidebar from "./sidebar/view";
import VideoInfo from "./info";
import VideoInfoLoading from "./info/loading";

export default async function VideoViewLoading() {
  return (
    <div className="flex h-[100dvh] w-full flex-col justify-between lg:flex-row">
      <div className="w-full overflow-auto pt-16">
        <div className="aspect-video w-full animate-pulse bg-base-300" />
        <VideoInfoLoading />
      </div>
      <div className="relative flex h-full w-full max-w-[360px] animate-pulse flex-col bg-base-300 lg:h-[100dvh] lg:shrink-0 lg:pt-16"></div>
    </div>
  );
}
