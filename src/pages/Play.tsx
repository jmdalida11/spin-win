import styled from "@emotion/styled";
import Spinner from "../components/Spinner";
import Confetti from 'react-confetti';
import { useEffect, useMemo, useState } from "react";
import { loadPlayers, loadPrizes, loadWheelColor, loadWinners, randomNumber } from "../utils";
import SpinAudio from '../assets/spin.mp3';
import { Player, StorageName, Winner } from "../types/types";
import Logo from "../assets/logo.png";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;

  @media (max-width: 1000px) {
    display: block;
  }
`;

const Left = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Right = styled.div`
  width: 70%;
  height: 90%;
  padding-top: 30px;
  overflow-y: scroll;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const SpinButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  cursor: pointer;
`;

const Winners = styled.div<{color: string}>`
  background-color: ${({ color }) => color ?? '#3498db'};
  padding: 5px;
  width: 90%;
  display: inline-flex;
  justify-content: space-between;
  margin-bottom: 5px;

  :hover {
    cursor: pointer;
    background-color: lightblue;
  }
`;

const audio = new Audio(SpinAudio);
const defaultNames = [
  'Enter Player',
  'Enter Player',
  'Enter Player',
  'Enter Player',
  'Enter Player',
];

function Play() {
  const [runConfetti, setRunConfetti] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [prizes, setPrizes] = useState<string[]>([]);
  const [prize, setPrize] = useState('');
  const [winnerIndex, setWinnerIndex] = useState(randomNumber(Math.max(players.length, 1)));
  const [isInputPrize, setIsInputPrize] = useState(false);
  const [inputPrize, setInputPrize] = useState('');

  const winnersColor = useMemo(() => loadWheelColor(), []);

  useEffect(() => {
    setPlayers(loadPlayers());
    setWinners(loadWinners());
    setPrizes(loadPrizes());

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  
  useEffect(() => {
    setPrize(prizes[0] ?? '');
  }, [prizes]);

  const getTopPlayers = () => {
    const topNames = [...defaultNames];

    if (players.length === 0) {
      return topNames;
    }

    if (winnerIndex-2 < 0) {
      topNames[0] = `${players[Math.max(players.length-2, 0)].name}`;
    } else {
      topNames[0] = `${players[winnerIndex-2].name}`
    }
    if (winnerIndex-1 < 0) {
      topNames[1] = `${players[players.length-1].name}`
    } else {
      topNames[1] = `${players[winnerIndex-1].name}`;
    }
    topNames[2] = `${players[winnerIndex].name}`;
    topNames[3] = `${players[(winnerIndex+1)%players.length].name}`;
    topNames[4] = `${players[(winnerIndex+2)%players.length].name}`;

    return topNames;
  }

  const removeWinner = (id: string) => () => {
    const filteredWinners = winners.filter((w) => w.id !== id);
    setWinners(filteredWinners);
    localStorage.setItem(StorageName.Winners, JSON.stringify(filteredWinners));
  }

  const clearAllWinners = () => {
    if (confirm('Are you sure you want to delete all the winners?')) {
      setWinners([]);
      localStorage.setItem(StorageName.Winners, '[]');
    }
  }

  const removePlayer = () => {
    if (players.length > 0) {
      if (confirm(`Are you sure you want to remove "${players[winnerIndex].name}"?`)) {
        const filteredPlayers = players.filter((p) => p.id !== players[winnerIndex].id);
        setPlayers(filteredPlayers);
        localStorage.setItem(StorageName.Players, JSON.stringify(filteredPlayers));
        setWinnerIndex(randomNumber(players.length));
      }
    }
  }

  const topPlayers = getTopPlayers();

  const handleSpin = () => {
    if (!audio.paused) {
      return;
    }
    audio.play();
    let index = winnerIndex;
    const increment = 10;
    const itervalId = setInterval(() => {
      if (!audio.paused && audio.currentTime < 9) {
        index += increment - Math.floor(audio.currentTime);
        setWinnerIndex(index % players.length);
        index = index % players.length;
      } else {
        if (players.length > 0) {
          const newWinners = [...winners, { ...players[index], id: crypto.randomUUID(), prize: isInputPrize ? inputPrize : prize }];
          setWinners(newWinners);
          localStorage.setItem(StorageName.Winners, JSON.stringify(newWinners));
        }
        setRunConfetti(true);
        clearInterval(itervalId);
        setTimeout(() => {
          setRunConfetti(false);
        }, 5000);
      }
    }, randomNumber(60) + 60);
  }

  const shuffle = () => {
    if (players.length > 0) {
      for (let i = 0; i < players.length; i++) {
        const swapPlayerIndex = randomNumber(players.length);
        const tempPlayer = players[i];
        players[i] = players[swapPlayerIndex];
        players[swapPlayerIndex] = tempPlayer; 
      }
      setPlayers([...players]);
      setWinnerIndex(randomNumber(players.length));
    }
  }

  return <Container>
    <Left>
      <div>
        <img src={Logo} height={100} />
        <Spinner names={topPlayers} />
        <SpinButton disabled={players.length === 0 || !audio.paused} onClick={handleSpin}>Spin it!</SpinButton>
        <SpinButton disabled={players.length === 0 || !audio.paused} onClick={shuffle}>Shuffle it!</SpinButton>
        <SpinButton
          style={{ color: 'red' }} 
          disabled={players.length === 0 || !audio.paused} 
          onClick={removePlayer}>Remove Player</SpinButton>
      </div>
    </Left>
    <Right>
      <div>
          <b>Prize: </b>
          <select value={prize} onChange={(e) => setPrize(e.target.value)} disabled={isInputPrize}>
            {prizes.map((v) => <option value={v}>{v}</option>)}
          </select>
          <span style={{ marginLeft: 20 }}>
            <b>Input Prize</b>
            <input type="checkbox" checked={isInputPrize} onChange={() => setIsInputPrize(prev => !prev)} />
            {isInputPrize && <input value={inputPrize} onChange={(e) => setInputPrize(e.target.value)} />}
          </span>
      </div>
      <div>
        <h4 style={{ display: 'inline-flex', justifyContent: 'space-between', width: '92%' }}>
          <span>Winners:</span>
          <span><button onClick={clearAllWinners}>Clear all winners</button></span>
        </h4>
        <div>
          {winners.map((w, idx) => 
          <Winners color={winnersColor}>
            <b>{idx+1}. {w.name} (Prize: {w.prize})</b>
            <button onClick={removeWinner(w.id)}>Remove</button>
          </Winners>)}
          
        </div>
      </div>
    </Right>
    {runConfetti && <Confetti
      numberOfPieces={500}
      recycle={false}
      width={window.innerWidth - (window.innerWidth * 0.05)}
      height={window.innerHeight - (window.innerHeight * 0.05)}
    />}
  </Container>
}

export default Play;
