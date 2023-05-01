import { PlaylistItem } from "../components/playlist-item";
import { Button, Form, Spinner } from "react-bootstrap";
import useApp from "../hooks/use-app";

export function Playlists() {
  const { playlists, addNewPlaylist, removePlaylist } = useApp();

  const handleNewPlaylist = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = event.currentTarget.playlistName.value;
    const description = event.currentTarget.playlistDesc.value;

    addNewPlaylist(name, description);

    event.currentTarget.playlistName.value = "";
    event.currentTarget.playlistDesc.value = "";
  };

  return (
    <main>
      <h1>Playlists</h1>

      {playlists ? (
        <div>
          {playlists.map((playlist) => {
            return (
              <div>
                <PlaylistItem
                  playlist={playlist}
                  deletePlaylist={removePlaylist}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <div className="border rounded p-2 mb-2">
        <h2>Add new playlist</h2>

        <Form onSubmit={handleNewPlaylist}>
          <Form.Group className="mb-3" controlId="playlistName">
            <Form.Label>Playlist name</Form.Label>
            <Form.Control type="string" placeholder="Enter playlist name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="playlistDesc">
            <Form.Label>Playlist description</Form.Label>
            <Form.Control
              type="string"
              placeholder="Enter playlist description"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </main>
  );
}
