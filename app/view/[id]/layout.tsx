import { Suspense } from "react";
import VideoViewLoading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<VideoViewLoading />}>{children}</Suspense>;
}
