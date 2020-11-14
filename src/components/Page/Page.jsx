import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import "./Page.scss";

const Page = ({ children, name, ...props }) => {
  const pageName = `Page-${name}`;
  return (
    <div data-testid={pageName} className={cn("Page", pageName)} {...props}>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
};

export default Page;
