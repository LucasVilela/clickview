import { Navigate, Route, Routes } from "react-router-dom";

import { NotFound, Playlists, PlaylistVideos, Videos } from "./routes";
import Layout from "./components/layout";
import { AppState } from "./context/AppState";

/**
 * Comments
 * - Due time constrains of the 2hrs I focus more in the functionality than in the UI and UX
 * - Thinking back I would use a global context and add all the functionalities (CRUD) to keep the state of the playlists and videos that would keep the state of the app even after a transition
 */

export default function App() {
  return (
    <AppState>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Navigate to="/playlists" replace />} />
          <Route path="playlists">
            <Route index element={<Playlists />} />
            <Route path=":id" element={<PlaylistVideos />} />
          </Route>
          <Route path="videos" element={<Videos />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppState>
  );
}
