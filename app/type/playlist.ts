export const CATEGORIES = ["all", "web", "design", "picked"] as const;

export type CategoryType = ArrayElement<typeof CATEGORIES>;

export interface VideoType {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  playlist: string;
  noteId?: string;
  sharedCnt: number;
}

export interface PlaylistType {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
  duration: string;
  videos: string[];
  category: CategoryType;
  pickedUser?: string[];
  isPicked?: boolean;
}

export interface RawVideoType {
  items: {
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        [key in "default" | "medium" | "high" | "standard" | "maxres"]: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
    };
    contentDetails: {
      duration: string;
    };
  }[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface RawPlaylistType {
  items: {
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        [key in "default" | "medium" | "high" | "standard" | "maxres"]: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
      playlistId: string;
      position: 0;
      resourceId: {
        kind: string;
        videoId: string;
      };
      videoOwnerChannelTitle: string;
      videoOwnerChannelId: string;
    };
    contentDetails: {
      videoId: string;
      videoPublishedAt: string;
    };
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
  }[];
}
