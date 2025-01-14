import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/form-elements/Button';
import ButtonWrapper from '../../components/form-elements/ButtonWrapper';
import Subtitle from '../../components/typography/Subtitle';
import { AppContext } from '../../state/Context';

const Game = () => {
  const navigate = useNavigate();
  const { state, makePlayerActive, deletePlayer } = useContext(AppContext);
  const [currentPhase, setCurrentPhase] = useState('SING'); // PLAY, SING, NEXT_PLAYER
  const [currentActivePlayer, setCurrentActivePlayer] = useState(null);

  useEffect(() => {
    const activePlayer = state.playersList.find((player) => player.active);
    if (!activePlayer && state.playersList.length > 0) {
      makePlayerActive(state.playersList[0].id);
    }
    setCurrentActivePlayer(state.playersList.find((player) => player.active));
  }, [state.playersList, makePlayerActive]);

  const handlePlay = () => {
    setCurrentPhase('SING'); // Immediately transition to SING phase
  };

  const handleSing = () => {
    if (state.playersList.length > 1) {
      setTimeout(() => setCurrentPhase('NEXT_PLAYER'), 1000); // Show NEXT_PLAYER button after a delay
    } else {
      navigateToVideoPlayer();
    }
  };

  const handleNextPlayer = () => {
    navigateToVideoPlayer();
  };

  const navigateToVideoPlayer = () => {
    const activePlayer = state.playersList.find((player) => player.active);
    if (activePlayer) {
      navigate('/video-player', {
        state: { videoUrl: activePlayer.song, playerId: activePlayer.id },
      });
    } else {
      console.error('No active player found!');
    }
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <>
      <Subtitle>
        {currentPhase === 'NEXT_PLAYER'
          ? `Prepare for ${
              state.playersList.find((player) => !player.active)?.name ||
              'the next player'
            }`
          : `Time to sing ${currentActivePlayer?.name || ''}`}
      </Subtitle>
      <ButtonWrapper>
        {currentPhase === 'PLAY' && (
          <Button text="PLAY" size="small" onClick={handlePlay} />
        )}
        {currentPhase === 'SING' && (
          <>
            <Button text="CANCEL" size="small" onClick={() => navigate('/')} />
            <Button text="SING" size="small" onClick={handleSing} />
          </>
        )}
        {currentPhase === 'NEXT_PLAYER' && (
          <>
            {state.playersList.length === 1 ? (
              <Button text="FINISH" size="small" onClick={handleFinish} />
            ) : (
              <Button
                text="NEXT PLAYER"
                size="small"
                onClick={handleNextPlayer}
              />
            )}
          </>
        )}
      </ButtonWrapper>
    </>
  );
};

export default Game;


// import { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '../../components/form-elements/Button';
// import ButtonWrapper from '../../components/form-elements/ButtonWrapper';
// import Subtitle from '../../components/typography/Subtitle';
// import { randomNumber } from '../../helpers/generators';
// import { AppContext } from '../../state/Context';
// import ActivePlayer from './ActivePlayer';
// import NextPlayer from './NextPlayer';

// const Game = () => {
//   const navigate = useNavigate();
//   const { state, deletePlayer, makePlayerActive } = useContext(AppContext);
//   const [shuffle, setShuffle] = useState(state.playersList.length > 1);
//   const [showNext, setShowNext] = useState(false);
//   console.log('PlayerList=>', state.playersList)
//   useEffect(() => {
//     let timeout;
//     if (shuffle) {
//       timeout = setTimeout(() => setShuffle(false), randomNumber(3, 6) * 1000);
//     }

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [shuffle]);

//   useEffect(() => {
//     let interval;
//     if (shuffle) {
//       interval = setInterval(() => {
//         const randomIndex = randomNumber(0, state.playersList.length - 1);
//         const randomPlayer = state.playersList[randomIndex];
//         makePlayerActive(randomPlayer.id);
//       }, 100);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [shuffle, makePlayerActive, state.playersList]);

//   function goToHome() {
//     navigate('/');
//   }

//   function getActivePlayer() {
//     return state.playersList.find((player) => player.active);
//   }

//   function getInActivePlayer() {
//     return state.playersList.find((player) => !player.active);
//   }

//   // function openSong() {
//   //   //to navigate another screen, and play yotube video using  react player
//   //   window.open(getActivePlayer().song, '_blank');
//   //   setShowNext(true);
//   // }
//   function openSong() {
//     const activePlayer = getActivePlayer();
//     if (activePlayer && activePlayer.song) {
//       // First, show the NEXT PLAYER button
//       setShowNext(true);
  
//       setTimeout(() => {
//         navigate('/video-player', { state: { videoUrl: activePlayer.song, playerId: activePlayer.id } });
//       }, 1000); 
//     } else {
//       console.error('No active player or song found!');
//     }
//   }

//   function handleNext() {
//     setShowNext(false);
//     if (state.playersList.length === 2) {
//       makePlayerActive(getInActivePlayer().id);
//       deletePlayer(getActivePlayer().id);
//     } else if (state.playersList.length === 1) {
//       deletePlayer(getActivePlayer().id);
//       goToHome();
//     } else {
//       deletePlayer(getActivePlayer().id);
//       setShuffle(true);
//     }
//   }

//   return (
//     <>
//       {showNext && <NextPlayer />}
//       {!showNext && (
//         <Subtitle>
//           Time to sing <ActivePlayer animate={!shuffle} />
//         </Subtitle>
//       )}
//       <ButtonWrapper>
//         <Button text="CANCEL" size="small" onClick={goToHome} disabled={shuffle} />
//         {showNext ? (
//           <Button
//             text={state.playersList.length === 1 ? 'FINISH' : 'NEXT PLAYER'}
//             size="small"
//             onClick={handleNext}
//             disabled={shuffle}
//           />
//         ) : (
//           <Button
//             size="small"
//             onClick={openSong}
//             disabled={shuffle}
//             text={shuffle ? null : 'SING'}
//             icon={shuffle ? 'loader' : null}
//             iconSpin={shuffle}
//           />
//         )}
//       </ButtonWrapper>
//     </>
//   );
// };

// export default Game;
