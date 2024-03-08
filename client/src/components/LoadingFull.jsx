import { useState, useEffect } from "react";
import { GiMusicalNotes } from "react-icons/gi";
import BarLoader from "react-spinners/BarLoader";

const LoadingFull = () => {
  const [screenWidth, setScreenWidth] = useState(100);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth >= 768 ? 300 : 100);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUptime((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loading-main">
      <GiMusicalNotes className="w-20 h-20 mb-5 text-[#357960]" />
      <BarLoader color="#357960" width={screenWidth} />
      {uptime > 5 ? (
        <div className="md:max-w-[350px] max-w-[300px] mt-5">
          <p className="text-center text-sm italic">
            Our backend is initializing, which may take a moment. Thank you for
            your patience!
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoadingFull;
