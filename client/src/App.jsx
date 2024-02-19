import { useState } from "react";

import "./App.css";
import Playlist from "./components/Playlist";
import Search from "./components/Search";
import Recommendations from "./components/Recommendations";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [recoTracks, setRecoTracks] = useState([]);
  const [isRecoOpen, setIsRecoOpen] = useState(false);
  const [alert, setAlert] = useState("");

  const addToPlaylist = (track) => {
    if (!playlist.includes(track)) {
      console.log(`Track added: ${track.name}`);
      setPlaylist([...playlist, track]);
    } else {
      console.log(`Track already in playlist!`);
    }
  };

  const playlistProps = {
    playlist,
    setPlaylist,
    selectedTracks,
    setSelectedTracks,
    setRecoTracks,
    setIsRecoOpen,
    alert,
    setAlert,
  };

  const recommendationsProps = {
    recoTracks,
    isRecoOpen,
    setIsRecoOpen,
    addToPlaylist,
  };

  const alertProps = {
    alert,
    setAlert,
  };

  return (
    <>
      <div className="main">
        <Navbar />
        <Search onResultSelect={addToPlaylist} />
        <Alert {...alertProps} />
        <Playlist {...playlistProps} />
        <Recommendations {...recommendationsProps} />
      </div>
    </>
  );
}

export default App;
