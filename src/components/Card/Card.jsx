import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import "./Card.scss";

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

Card.propTypes = {
  small: PropTypes.bool,
  title: PropTypes.string,
  wrapped: PropTypes.bool,
  children: PropTypes.node,
  centered: PropTypes.bool,
  flexContent: PropTypes.bool,
  gridContent: PropTypes.bool,
  className: PropTypes.string,
  transparent: PropTypes.bool,
  spaceBetween: PropTypes.bool,
  optionalContent: PropTypes.node,
};

export default Card;
