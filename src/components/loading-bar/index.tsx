import React from 'react';
import styled from './styles.module.scss';

const LoadingBar = () => {
  return (
    <div className={styled.progress}>
      <span className={`${styled['progress-bar']} w-3/4`} />
    </div>
  );
};

export default LoadingBar;
