import PropTypes from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string,
  isBill: PropTypes.bool,
  isDeposit: PropTypes.bool,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
});
