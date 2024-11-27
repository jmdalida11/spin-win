import styled from "@emotion/styled";
import Spinner from "../components/Spinner";
import Confetti from 'react-confetti';
import { useMemo, useState } from "react";
import { loadPlayers } from "../utils";

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;

  @media (max-width: 1200px) {
    display: block;
  }
`;

const Left = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  width: 100%;
  border: 1px solid black;
`;

const SpinButton = styled.button`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  cursor: pointer;
`;

function Play() {
  const [runConfetti, setRunConfetti] = useState(false);

  const players = useMemo(() => {
    return loadPlayers();
  }, []);

  return <Container>
    <Left>
      <div>
        <Spinner players={players} />
        <SpinButton disabled={players.length < 5} onClick={() => setRunConfetti(!runConfetti)}>Spin it!</SpinButton>
      </div>
    </Left>
    <Right>Right</Right>
    {runConfetti && <Confetti
      width={window.innerWidth - 50}
      height={window.innerHeight - 50}
    />}
  </Container>
}

export default Play;