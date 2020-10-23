import React from "react";
import cn from "classnames";

import "./Card.css";

//TODO: proptypes

const Card = ({ className, children, title, wrapped = false, ...props }) => {
  return (
    <div className={cn("Card", className)} {...props}>
      {!!title && <p className="title">{title}</p>}
      {wrapped ? (
        <div className="content flex centered">{children}</div>
      ) : (
        children
      )}
    </div>
  );
};

export default Card;
