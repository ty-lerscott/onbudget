import React from "react";
import cn from "classnames";

import "./Card.scss";

//TODO: proptypes

const Card = ({
  title,
  children,
  className,
  small = false,
  wrapped = false,
  centered = false,
  transparent = false,
  spaceBetween = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "Card",
        {
          CardSmall: small,
          CardTransparent: transparent,
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
