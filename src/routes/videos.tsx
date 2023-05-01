import VideoItem from "../components/video-item";
import { Container } from "react-bootstrap";
import useVideos from "../hooks/use-videos";

export function Videos() {
  const videos = useVideos();

  return (
    <main>
      {videos ? (
        <Container>
          {videos.map((video) => {
            return <VideoItem video={video} />;
          })}
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
