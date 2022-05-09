import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Nav = ({ libraryIsOpen, setLibraryIsOpen }) => {
  return (
    <div className={`nav ${libraryIsOpen ? "moveRight" : ""}`}>
      <h1>Waves</h1>
      <button
        onClick={() => {
          setLibraryIsOpen(!libraryIsOpen);
        }}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  );
};

export default Nav;
