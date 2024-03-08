import PropTypes from "prop-types";
import axiosInstance from "../api/index.js";

const Playlist = ({
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
}) => {
  const handleRemove = (track) => {
    const updatedPlaylist = playlist.filter((item) => item.id !== track.id);

    setPlaylist(updatedPlaylist);
  };

  const handleSelectTrack = (track) => {
    if (selectedTracks.includes(track)) {
      const updatedSelectedTracks = selectedTracks.filter(
        (item) => item.id != track.id
      );
      setSelectedTracks(updatedSelectedTracks);
    } else if (selectedTracks.length < 5) {
      setSelectedTracks([...selectedTracks, track]);
    } else {
      setAlert("LimitAlert");
    }
  };

  const handleClickGenerate = async () => {
    let selectedIds;

    if (selectedTracks.length == 0) {
      setAlert("NullAlert");
    } else if (selectedTracks.length <= 5) {
      selectedIds = selectedTracks.map((track) => track.id);
      setIsLoading(true);
    } else {
      alert("Select up to 5 tracks");
    }

    try {
      const response = await axiosInstance.get(
        `/generate?seeds=${selectedIds}`
      );
      setRecoTracks(response.data.tracks);
      setIsRecoOpen(true);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`playlist-main ${alert ? "mt-2" : "mt-10"} ${
        searchResults.length > 0 ? "bg-gray-400 bg-opacity-75" : "bg-[#357960]"
      }`}
    >
      <div className="flex justify-between border-b-2">
        <h1 className="text-2xl md:text-3xl mb-2 font-semibold">Playlist</h1>
        <button
          className="generate-button"
          onClick={() => handleClickGenerate()}
        >
          Generate!
        </button>
      </div>
      <div className="playlist-box">
        {playlist.length < 1 ? (
          <p className="italic text-gray-300">
            Playlist is empty, search for some songs!
          </p>
        ) : (
          ""
        )}
        {playlist.map((track, index) => {
          return (
            <div
              key={index}
              className="playlist-item cursor-pointer"
              onClick={() => handleSelectTrack(track)}
            >
              <div className="flex">
                {track.album.images && (
                  <img
                    className="w-10 h-10 rounded-md"
                    src={track.album.images[0].url}
                    alt=""
                  />
                )}
                <div className="w-[150px] px-2 flex flex-col">
                  <p
                    className={` truncate ${
                      selectedTracks.includes(track)
                        ? "text-green-300 font-bold"
                        : ""
                    }`}
                  >
                    {track.name}
                  </p>
                  <p className="truncate text-gray-300 italic">
                    {track.artists[0].name}
                  </p>
                </div>
              </div>

              <div className="flex">
                {selectedTracks.includes(track) ? (
                  <p className="flex items-center text-green-300 font-bold">
                    Selected
                  </p>
                ) : (
                  <button
                    type="button"
                    className="text-red-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(track);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired, // Specifies that playlist prop must be an array and is required
  setPlaylist: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  selectedTracks: PropTypes.array.isRequired,
  setSelectedTracks: PropTypes.func.isRequired,
  setRecoTracks: PropTypes.func.isRequired,
  setIsRecoOpen: PropTypes.func.isRequired,
  alert: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Playlist;
