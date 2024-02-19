import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar-main">
      <h1 className="uppercase md:text-3xl text-2xl font-bold">
        Song
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Recommender
        </span>
      </h1>
      <a
        href="https://github.com/jakekeech"
        target="_blank"
        rel="noopener noreferrer"
        className="flex"
      >
        <button type="button">
          <FaGithub className="md:w-8 w-6 md:h-8 h-6" />
        </button>
      </a>
    </div>
  );
};

export default Navbar;
