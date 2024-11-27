import styled from "@emotion/styled";
import { memo, useMemo, useState } from "react";
import { Player } from "../types/types";

const SpinnerStyle = styled.div`
  width: 500px;
  padding: 30px;
  border: 10px solid black;
  border-radius: 1rem;
  background-color: #eaeaea;
`;

const Card = styled.div<{ 
  width?: string;
  main?: boolean;
  isTop?: boolean; 
  isBottom?: boolean; 
}>`
  height: 50px;
  width: ${({ width }) => width ?? '100%'};
   box-shadow: 0 0 1rem rgba(0,0,0,.6);
   ${({ main }) => main ? `
    cursor: pointer;
    color: white;
    background-color: #3498db;
    border-radius: 1rem;
    height: 60px;` : 
    `
    background-color: #fff;
    `};
  ${({ isTop }) => isTop ? `
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  ` : ''}
   ${({ isBottom }) => isBottom ? `
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  ` : ''}
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
`;


interface Props {
  players: Player[];
}

const Spinner: React.FC<Props> = ({ players }) => {
  // const [winnerIndex, setWinnerIndex] = useState<number>(randomNumber);
  // const winner = useMemo(() => {
  //   if (players.length) {
  //     return 'Enter Player';
  //   }
  // }, [players]);

  return <SpinnerStyle>
    <CardContainer>
      <Card width="60%" isTop>
        <span>Enter Player</span>
      </Card>
    </CardContainer>
    <CardContainer>
      <Card width="80%" isTop>
      <span>Enter Player</span>
      </Card>
    </CardContainer>
    <CardContainer>
      <Card main>
      <span>Enter Player</span>
      </Card>
    </CardContainer>
    <CardContainer>
      <Card width="80%" isBottom>
      <span>Enter Player</span>
      </Card>
    </CardContainer>
    <CardContainer>
      <Card width="60%" isBottom>
      <span>Enter Player</span>
      </Card>
    </CardContainer>
  </SpinnerStyle>
}

export default memo(Spinner);