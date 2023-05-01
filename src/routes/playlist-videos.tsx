import { useParams } from "react-router-dom";
import VideoItem from "../components/video-item";
import { Button, Form } from "react-bootstrap";
import { useMemo } from "react";

import useApp from "../hooks/use-app";

export function PlaylistVideos() {
  const params = useParams();
  const { videos, playlists, removeVideoFromPlaylist, addVideoToPlaylist } =
    useApp();

  const currentPlaylist = playlists?.find(
    (playlist) => playlist.id === Number(params.id)
  );
  const playlistId = currentPlaylist?.id ?? 0;

  console.log("currentPlaylist :>> ", currentPlaylist);
  console.log("currentPlaylist :>> ", currentPlaylist?.id);

  const videosOnPlaylist = useMemo(() => {
    return videos?.filter((video) =>
      currentPlaylist?.videoIds.includes(video.id)
    );
  }, [videos, currentPlaylist?.videoIds]);

  return (
    <main>
      <h1>{currentPlaylist?.name}</h1>

      <div className="mb-3">
        Add video
        <Form.Select
          aria-label="Add video"
          onChange={(e) =>
            addVideoToPlaylist(playlistId, Number(e.target.value))
          }
        >
          <option>Open this select menu</option>

          {videos?.map((video) => {
            return <option value={video.id}>{video.name}</option>;
          })}
        </Form.Select>
      </div>

      {videosOnPlaylist?.map((video) => {
        return (
          <div className="mb-3">
            <VideoItem video={video} />
            <Button
              variant="outline-danger"
              onClick={() =>
                removeVideoFromPlaylist(currentPlaylist?.id ?? 0, video.id)
              }
            >
              Remove from playlist
            </Button>
          </div>
        );
      })}
    </main>
  );
}
