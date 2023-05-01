import usePlaylists from "../hooks/use-playlists";
import { PlaylistItem } from "../components/playlist-item";

export function Playlists() {
  const playlists = usePlaylists();

  return (
    <main>
      <h1>Playlists</h1>
      {playlists ? (
        <div>
          {playlists.map((playlist) => {
            return <PlaylistItem playlist={playlist} />;
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
