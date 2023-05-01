import { useState, useEffect } from "react";
import { Playlist } from "../interfaces/playlist";

const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);

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

  return playlists;
};

export default usePlaylists;
