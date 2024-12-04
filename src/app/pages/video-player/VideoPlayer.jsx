import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import Button from '../../components/form-elements/Button';

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  position: relative; 
`;

const ExitButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
`;

const VideoPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { videoUrl } = location.state || {};

  if (!videoUrl) {
    return <p>Video URL is not available.</p>;
  }

  function goToHome() {
    navigate('/');
  }

  return (
    <PlayerWrapper>
      <ReactPlayer url={videoUrl} controls width="80%" height="80%" />
      <ExitButton text="Exit" onClick={goToHome} />
    </PlayerWrapper>
  );
};

export default VideoPlayer;
