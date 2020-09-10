import React from 'react';
import Image from '../../../assets/bg-image-2.svg';
import Grow from '@material-ui/core/Grow';

const imageStyle = {
  position: 'fixed',
  top: 0,
  minWidth: '100%',
  minHeight: '100%',
  leftMargin: 240,
};

function Home() {
  return (
    <Grow timeout={4000} in={true}>
      <img style={imageStyle} src={Image} />
    </Grow>
  );
}

export default Home;
