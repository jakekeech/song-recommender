import { IoMdClose } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import PropTypes from "prop-types";

const Alert = ({ alert, setAlert }) => {
  const handleClickClose = () => {
    setAlert(null);
  };

  if (!alert) {
    return null;
  }

  return (
    <div className="alert-main">
      <div className="flex items-center">
        <CiCircleInfo className="mr-3" />
        <h1>
          {alert == "NullAlert"
            ? "Select songs to generate a recommendation!"
            : alert == "LimitAlert"
            ? "You can only select up to 5 songs!"
            : ""}
        </h1>
      </div>
      <button type="button" onClick={() => handleClickClose()}>
        <IoMdClose />
      </button>
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Alert;
