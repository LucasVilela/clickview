import VideoItem from "../components/video-item";
import { Container, Spinner } from "react-bootstrap";
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
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </main>
  );
}
