import React, { useEffect, useState } from "react";
import useVideos from "../hooks/use-videos";
import usePlaylists from "../hooks/use-playlists";
import { Video } from "../interfaces/video";
import { Playlist } from "../interfaces/playlist";

export const AppContext = React.createContext<{
  videos: Video[] | [];
  playlists: Playlist[] | [];
  addNewPlaylist: (name: string, description: string) => void;
  removePlaylist: (playlistId: number) => void;
  removeVideoFromPlaylist: (videoId: number, playlistId: number) => void;
  addVideoToPlaylist: (videoId: number, playlistId: number) => void;
}>({
  videos: [],
  playlists: [],
  addNewPlaylist: () => {},
  removePlaylist: () => {},
  removeVideoFromPlaylist: () => {},
  addVideoToPlaylist: () => {}
});

export const AppState = ({ children }: { children: React.ReactElement }) => {
  const [videos, setVideos] = useState<Video[] | []>([]);
  const [playlists, setPlaylists] = useState<Playlist[] | []>([]);

  const originalVideoList = useVideos();
  const { playlists: playlistOrg } = usePlaylists();

  useEffect(() => {
    if (originalVideoList) {
      setVideos(originalVideoList);
    }

    if (playlistOrg) {
      setPlaylists(playlistOrg);
    }
  }, [originalVideoList, playlistOrg]);

  // Add video to a playlist using the video id and playlist id

  const addVideoToPlaylist = (playlistId: number, videoId: number) => {
    const newPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        const newVideoIds = [...playlist.videoIds, videoId];

        return { ...playlist, videoIds: newVideoIds };
      }

      return playlist;
    });

    setPlaylists(newPlaylists);
  };

  // Remove a video from a playlist using the video id and playlist id
  const removeVideoFromPlaylist = (playlistId: number, videoId: number) => {
    const currentPlaylist = playlists.find(
      (playlist) => playlist.id === playlistId
    );

    if (!currentPlaylist) {
      return;
    }

    const newVideoIds = currentPlaylist.videoIds.filter((id) => id !== videoId);

    const newPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return { ...playlist, videoIds: newVideoIds };
      }

      return playlist;
    });

    setPlaylists(newPlaylists);
  };

  // Remove a playlist
  const removePlaylist = (playlistId: number) => {
    setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
  };

  // Add a new playlist
  const addNewPlaylist = (name: string, description: string) => {
    const newPlaylist = {
      name,
      description,
      videoIds: [],
      dateCreated: "",
      id: Date.now()
    };

    setPlaylists([...playlists, newPlaylist]);
  };

  return (
    <AppContext.Provider
      value={{
        videos,
        playlists,
        addNewPlaylist,
        removePlaylist,
        removeVideoFromPlaylist,
        addVideoToPlaylist
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
