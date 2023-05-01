import { Button, Col, Row } from "react-bootstrap";
import { Playlist } from "../interfaces/playlist";
import { Link } from "react-router-dom";

interface PlaylistItemProps {
  playlist: Playlist;
  deletePlaylist: (playlistId: number) => void;
}

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist, deletePlaylist } = props;

  const videoCount =
    playlist.videoIds.length === 1
      ? "1 video"
      : `${playlist.videoIds.length} videos`;

  const handleDelete = async () => {
    await deletePlaylist(playlist.id);
  };

  return (
    <Row className="border rounded p-2 mb-2">
      <Col xs="12" md="3">
        <h2 className="h5">{playlist.name}</h2>
        <p className="mb-0">{videoCount}</p>
      </Col>
      <Col xs="12" md="9">
        <p className="mb-0">{playlist.description}</p>
      </Col>
      <Col xs="12" md="9">
        <Link to={playlist.id.toString()}>
          <Button variant="outline-primary">View</Button>
        </Link>
        <Button variant="outline-danger" onClick={handleDelete}>
          Delete
        </Button>
      </Col>
    </Row>
  );
}
