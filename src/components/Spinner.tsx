import styled from "@emotion/styled";
import { memo, useMemo } from "react";
import { loadWheelColor } from "../utils";

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
  color?: string;
}>`
  position: relative;
  height: 50px;
  width: ${({ width }) => width ?? '100%'};
   box-shadow: 0 0 1rem rgba(0,0,0,.6);
   ${({ main, color }) => main ? `
    cursor: pointer;
    color: white;
    background-color: ${color ?? '#3498db'};
    border-radius: 1rem;
    height: 70px;` : 
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

  & > span {
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

interface Props {
  names: string[];
}

const Spinner: React.FC<Props> = ({ names }) => {
  const mainColor = useMemo(() => loadWheelColor(), []);

  return <SpinnerStyle>
    <CardContainer>
      <Card width="60%" isTop>
        <span>{names[4]}</span>
      </Card>
    </CardContainer>
    <CardContainer>
      <Card width="80%" isTop>
      <span>{names[3]}</span>
      </Card>
    </CardContainer>
    <CardContainer>
      <Card main color={mainColor}>
      <span>{names[2]}</span>
      </Card>
    </CardContainer>
    <CardContainer>
      <Card width="80%" isBottom>
      <span>{names[1]}</span>
      </Card>
    </CardContainer>
    <CardContainer>
      <Card width="60%" isBottom>
      <span>{names[0]}</span>
      </Card>
    </CardContainer>
  </SpinnerStyle>
}

export default memo(Spinner);
