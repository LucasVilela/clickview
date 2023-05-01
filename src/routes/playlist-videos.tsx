import { useParams } from "react-router-dom";
import usePlaylists from "../hooks/use-playlists";
import useVideos from "../hooks/use-videos";
import VideoItem from "../components/video-item";
import { Button, Form } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";
import { Video } from "../interfaces/video";

export function PlaylistVideos() {
  const [playlistVideos, setPlaylistVideos] = useState<
    Video[] | [] | undefined
  >(undefined);
  const params = useParams();
  const { playlists } = usePlaylists();
  const videos = useVideos();

  const currentPlaylist = playlists?.find(
    (playlist) => playlist.id === Number(params.id)
  );

  const currentVideos = videos?.filter((video) =>
    currentPlaylist?.videoIds.includes(video.id)
  );

  useEffect(() => {
    if (playlistVideos === undefined) {
      setPlaylistVideos(currentVideos);
    }
  }, [currentVideos, playlistVideos]);

  const handleRemove = (videoId: number) => {
    const newPlaylistVideos = playlistVideos?.filter(
      (video) => video.id !== videoId
    );
    setPlaylistVideos(newPlaylistVideos);
  };

  const handleAdd = (videoId: number) => {
    const video = videos?.find((video) => video.id === videoId);
    const newPlaylistVideos = [...playlistVideos!, video!];
    setPlaylistVideos(newPlaylistVideos);
  };

  const filteredVideos = useMemo(() => {
    const currentIds = playlistVideos?.map((video) => video.id);

    return videos?.filter((video) => !currentIds?.includes(video.id));
  }, [playlistVideos, videos]);

  return (
    <main>
      <h1>{currentPlaylist?.name}</h1>

      <div className="mb-3">
        Add video
        <Form.Select
          aria-label="Add video"
          onChange={(e) => handleAdd(Number(e.target.value))}
        >
          <option>Open this select menu</option>

          {filteredVideos?.map((video) => {
            return <option value={video.id}>{video.name}</option>;
          })}
        </Form.Select>
      </div>

      {playlistVideos?.map((video) => {
        return (
          <div className="mb-3">
            <VideoItem video={video} />
            <Button
              variant="outline-danger"
              onClick={() => handleRemove(video.id)}
            >
              Remove from playlist
            </Button>
          </div>
        );
      })}
    </main>
  );
}
