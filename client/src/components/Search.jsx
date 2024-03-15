import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/index.js";
import PropTypes from "prop-types";

import { FaSearch } from "react-icons/fa";

const Search = ({
  addToPlaylist,
  searchResults,
  setSearchResults,
  setIsLoading,
  setAlert,
  setResError,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const searchResultsRef = useRef(null);
  const searchBarRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Searching for ${searchInput}`);
    setIsLoading(true);

    if (searchInput.trim() !== "") {
      try {
        const response = await axiosInstance.get(
          `/search?query=${searchInput}`
        );
        setResError("");
        setSearchResults(response.data.tracks.items);
      } catch (error) {
        console.log("Error: ", error);
        setSearchResults([]);
        if (
          error.response &&
          error.response.status &&
          error.response.status !== ""
        ) {
          setResError(error.response.status);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setAlert("BlankSearchAlert");
      console.log("blank search");
      setIsLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    // console.log("Click detected outside search results");
    // console.log("searchResultsRef:", searchResultsRef.current);
    // console.log("event target:", event.target);
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target) &&
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target)
    ) {
      setSearchResults([]);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.keyCode === 27) {
      // Escape key code
      setSearchResults([]);
    }
  };

  const handleSelectResult = (track) => {
    addToPlaylist(track);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  });

  return (
    <div className="w-full">
      <div className="search-main">
        <form
          className="search-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            ref={searchBarRef}
            name="song"
            type="text"
            placeholder="Search for a song"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
          <div
            ref={searchResultsRef}
            className={`${
              searchResults.length > 0 ? "search-results" : "hidden"
            }`}
          >
            {searchResults &&
              searchResults.map((track, index) => {
                return (
                  <div key={index} className="search-result-item">
                    {track.album.images && (
                      <img
                        className="w-10 h-10 rounded-md"
                        src={track.album.images[0].url}
                        alt=""
                      />
                    )}
                    <div className="flex justify-between w-full">
                      <div className="w-[150px] px-2 flex flex-col">
                        <p className="truncate">{track.name}</p>
                        <p className="truncate text-gray-300 italic">
                          {track.artists[0].name}
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleSelectResult(track)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </form>
      </div>
    </div>
  );
};

Search.propTypes = {
  addToPlaylist: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setResError: PropTypes.func.isRequired,
};

export default Search;
