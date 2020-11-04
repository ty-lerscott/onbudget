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
  optionalContent,
  centered = false,
  flexContent = true,
  gridContent = false,
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
      {(title || optionalContent) && (
        <div className="Row">
          {!!title && <p className="title">{title}</p>}
          {optionalContent}
        </div>
      )}

      {wrapped ? (
        <div
          className={cn("content", {
            grid: gridContent,
            flex: flexContent,
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
