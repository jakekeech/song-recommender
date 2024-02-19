import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";

const Recommendations = ({
  recoTracks,
  isRecoOpen,
  setIsRecoOpen,
  addToPlaylist,
}) => {
  if (isRecoOpen == false) {
    return null;
  }

  const handleClickClose = () => {
    setIsRecoOpen(false);
  };

  const handleClickAdd = (track) => {
    addToPlaylist(track);
  };

  return (
    <div className="reco-main">
      <div className="reco-box">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">Try These!</h3>
          <button
            type="button"
            className="close-reco"
            onClick={() => handleClickClose()}
          >
            <IoMdClose className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[400px] p-2 grid gap-2">
          {recoTracks.map((track, index) => {
            return (
              <div key={index} className="playlist-item">
                <div className="flex">
                  {track.album.images && (
                    <img
                      className="w-10 h-10 rounded-md"
                      src={track.album.images[0].url}
                      alt=""
                    />
                  )}
                  <div className="w-[150px] px-2 flex flex-col">
                    <p className="truncate">{track.name}</p>
                    <p className="truncate text-gray-300 italic">
                      {track.artists[0].name}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="font-semibold"
                    onClick={() => handleClickAdd(track)}
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Recommendations.propTypes = {
  recoTracks: PropTypes.array.isRequired,
  isRecoOpen: PropTypes.bool.isRequired,
  setIsRecoOpen: PropTypes.func.isRequired,
  addToPlaylist: PropTypes.func.isRequired,
};

export default Recommendations;
