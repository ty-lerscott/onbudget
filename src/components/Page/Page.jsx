import React from "react";
import PropTypes from "prop-types";

// TODO: PropTypes

import "./Page.scss";

const Page = ({ children, ...props }) => {
  return (
    <div className="Page" {...props}>
      {children}
    </div>
  );
};

export default Page;
