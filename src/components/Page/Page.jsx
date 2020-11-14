import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import "./Page.scss";

const Page = ({ children, name, ...props }) => {
  return (
    <div className={cn("Page", `Page-${name}`)} {...props}>
      {children}
    </div>
  );
};

Page.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};

export default Page;
