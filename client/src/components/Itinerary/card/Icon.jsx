import React from 'react';
import PropTypes from 'prop-types';

const style = {
  position: 'relative',

  width: '30px',
  // height: "100%",
};

const AirlineIcon = ({ iconData }) => {
  // const imgUrl =
  const imgUrl = `https://logos.skyscnr.com/images/airlines/favicon/${iconData}.png`;
  return (
    <div>
      <img src={imgUrl} style={style} alt="" />
    </div>

  );
};

AirlineIcon.propTypes = {
  iconData: PropTypes.string,
};

AirlineIcon.defaultProps = {
  iconData: '',
};

export default AirlineIcon;
