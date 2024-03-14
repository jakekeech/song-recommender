import PropTypes from "prop-types";

import { PiWarningDuotone } from "react-icons/pi";

const Error = ({ setResError }) => {
  const handleClick = () => {
    setResError("");
  };

  return (
    <div className="error-main">
      <div className="flex flex-col items-center">
        <PiWarningDuotone className="w-16 md:w-24 h-16 md:h-24 text-[#357960] mb-2" />
        <h1 className="text-center text-md md:text-3xl text-[#357960] font-bold mb-6 md:mb-10">
          Looks like you&apos;ve sent too many requests! <br />
          Please wait for a moment before trying again.
        </h1>
        <button
          className="bg-[#357960] text-white md:bg-transparent hover:bg-[#357960] md:text-[#357960] font-semibold hover:text-white py-2 px-4 md:border md:border-[#357960] hover:border-transparent rounded md:text-2xl md:px-10 md:rounded-full md:py-3"
          onClick={() => handleClick()}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

Error.propTypes = {
  setResError: PropTypes.func.isRequired,
};

export default Error;
