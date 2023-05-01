import { useState, useEffect } from "react";
import { Video } from "../interfaces/video";

const useVideos = () => {
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(process.env.PUBLIC_URL + "/videos.json");
        const json = await response.json();

        setVideos(json);
      } catch (error) {
        console.error("Error fetching JSON file:", error);
      }
    }

    fetchData();
  }, []);

  return videos;
};

export default useVideos;
