import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import Button from '../../components/form-elements/Button';
import { AppContext } from '../../state/Context';

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
  const { videoUrl, playerId } = location.state || {};
  const { state, deletePlayer, makePlayerActive } = useContext(AppContext);
  if (!videoUrl) {
    return <p>Video URL is not available.</p>;
  }

  function getActivePlayer() {
    return state.playersList.find((player) => player.active);
  }

  function getInActivePlayer() {
    return state.playersList.find((player) => !player.active);
  }

  const handleExit = () => {
    const activePlayer = getActivePlayer();
    const inactivePlayer = getInActivePlayer();

    if (activePlayer) {
      makePlayerActive(inactivePlayer.id); 
    }
    navigate('/');
  };

  // function goToHome() {
  //   navigate('/');
  // }
  return (
    <PlayerWrapper>
      <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
      <ExitButton text="Exit" onClick={handleExit} />
    </PlayerWrapper>
  );
};

export default VideoPlayer;
