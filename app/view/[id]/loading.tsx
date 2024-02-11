import Sidebar from "./sidebar/view";
import VideoInfo from "./info";
import VideoInfoLoading from "./info/loading";

export default async function VideoViewLoading() {
  return (
    <div className="flex h-screen w-full flex-col justify-between md:flex-row">
      <div className="w-full overflow-auto pt-16">
        <div className="aspect-video w-full animate-pulse bg-base-200/50" />
        <VideoInfoLoading />
      </div>
      <div className="relative flex h-full w-[360px] max-w-full shrink-0 flex-col md:h-screen md:pt-16"></div>
    </div>
  );
}
