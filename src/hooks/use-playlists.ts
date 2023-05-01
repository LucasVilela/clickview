import { useState, useEffect } from "react";
import { Playlist } from "../interfaces/playlist";

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[] | null | undefined>(
    null
  );

  const deletePlaylist = (id: number) => {
    const newPlaylists = playlists?.filter((playlist) => playlist.id !== id);
    setPlaylists(newPlaylists);
  };

  const addPlaylist = (playlist: Playlist) => {
    const newPlaylists = playlists?.concat(playlist);
    setPlaylists(newPlaylists);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          process.env.PUBLIC_URL + "/playlists.json"
        );
        const json = await response.json();

        setPlaylists(json);
      } catch (error) {
        console.error("Error fetching JSON file:", error);
      }
    }

    fetchData();
  }, []);

  return { playlists, deletePlaylist, addPlaylist };
};

export default usePlaylists;
