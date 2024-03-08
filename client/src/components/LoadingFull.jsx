import { useState, useEffect } from "react";
import { GiMusicalNotes } from "react-icons/gi";
import BarLoader from "react-spinners/BarLoader";

const LoadingFull = () => {
  const [screenWidth, setScreenWidth] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth >= 768 ? 300 : 100);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="loading-main">
      <GiMusicalNotes className="w-20 h-20 mb-5 text-[#357960]" />
      <BarLoader color="#357960" width={screenWidth} />
    </div>
  );
};

export default LoadingFull;
