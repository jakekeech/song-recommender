import { useState } from "react";

import "./App.css";
import Playlist from "./components/Playlist";
import Search from "./components/Search";
import Recommendations from "./components/Recommendations";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import LoadingFull from "./components/LoadingFull";
import Error from "./components/Error";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recoTracks, setRecoTracks] = useState([]);
  const [isRecoOpen, setIsRecoOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState("");

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
    searchResults,
    setIsLoading,
    selectedTracks,
    setSelectedTracks,
    setRecoTracks,
    setIsRecoOpen,
    alert,
    setAlert,
    setResError,
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

  const errorProps = {
    resError,
    setResError,
  };

  const searchProps = {
    addToPlaylist,
    searchResults,
    setSearchResults,
    isLoading,
    setIsLoading,
    alert,
    setAlert,
    resError,
    setResError,
  };

  return (
    <>
      <div className="main bg-gradient-radial">
        {isLoading ? (
          <LoadingFull />
        ) : resError !== "" ? (
          <Error {...errorProps} />
        ) : (
          <>
            <Navbar />
            <Search {...searchProps} />
            <Alert {...alertProps} />
            <Playlist {...playlistProps} />
            <Recommendations {...recommendationsProps} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
