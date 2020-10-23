import React from "react";
import cn from "classnames";

import "./Card.css";

//TODO: proptypes

const Card = ({
  title,
  children,
  className,
  small = false,
  wrapped = false,
  centered = false,
  spaceBetween = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "Card",
        {
          CardSmall: small,
        },
        className
      )}
      {...props}
    >
      {!!title && <p className="title">{title}</p>}
      {wrapped ? (
        <div
          className={cn("content flex", {
            centered: centered,
            "space-between": spaceBetween,
          })}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Card;
