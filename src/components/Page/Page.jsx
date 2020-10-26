import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

// TODO: PropTypes

import "./Page.scss";

const Page = ({ children, name, ...props }) => {
  return (
    <div className={cn("Page", `Page-${name}`)} {...props}>
      {children}
    </div>
  );
};

export default Page;
