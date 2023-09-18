import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const PaginationComponent = ({ location }) => {
  return (
    <>
      {location !== 1 ? (
        <div>
          <button onClick={() => window.location.reload()}>
            <Link to={`/${location - 1}`}>Previous Page</Link>
          </button>
          <button onClick={() => window.location.reload()}>
            <Link to={`/${location + 1}`}>Next Page</Link>
          </button>
        </div>
      ) : (
        <button onClick={() => window.location.reload()}>
          <Link to={`/${location + 1}`}>Next Page</Link>
        </button>
      )}
    </>
  );
};

PaginationComponent.propTypes = {
  location: PropTypes.number.isRequired,
};
