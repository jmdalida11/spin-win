import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { loadPlayers, loadPrizes, loadWheelColor } from "../utils";
import { Player, StorageName } from "../types/types";

const Container = styled.div`
  display: flex;

  .inputWithLabel {
    margin-bottom: 10px;
  }

   @media (max-width: 600px) {
    display: block;
  }
`;

const Left = styled.div`
  width: 50%;

  button {
    width: 100%;
    pointer: cursor;
  }

  input {
    width: 97%;
  }
`;
const Right = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 100%;
`;

const Card = styled.div`
  width: 80%;
  height: 80vh;
  background-color: white;
  border-radius: 1rem;
  padding: 20px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  background-color: #F2E5BF;
  height: 50px;
  width: 95%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  box-shadow: 0 0 1rem rgba(0,0,0,.6);
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bold;
  
  & > span {
    text-overflow: ellipsis;
    overflow: hidden;
    text-wrap: nowrap;
  }

  & > button {
    cursor: pointer;
  }
`;

const InputWithLabel: React.FC<{
   label: string; 
   value: string;
   setValue: (v: string) => void;
}> = ({ label, value, setValue }) => {
  return <div className="inputWithLabel">
    <label>{label}</label> <br />
    <input value={value} onChange={(e) => { setValue(e.target.value) }} />
  </div>
}

const AdminPage = () => {
  const [name, setName] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [players, setPlayers] = useState(loadPlayers());
  const [color, setColor] = useState(loadWheelColor());
  const textFieldPlayersRef = useRef(null);
  const textFieldPrizesRef = useRef(null);

  useEffect(() => {
    if (!textFieldPlayersRef.current) {
      return;
    }
    (textFieldPlayersRef.current as HTMLSelectElement).value = players.reduce((prev, cur) => prev + '\n' + cur.name, '').trim();
  }, [players]);

  useEffect(() => {
    if (!textFieldPrizesRef.current) {
      return;
    }
    const prizes = loadPrizes();
    (textFieldPrizesRef.current as HTMLSelectElement).value = prizes.reduce((prev, cur) => prev + '\n' + cur, '').trim();
  }, []);

  const handleAddClick = () => {
    players.unshift({
      id: crypto.randomUUID(),
      name,
    });
    setPlayers([...players]);
    localStorage.setItem(StorageName.Players, JSON.stringify(players));
    setName('');
  }

  const handleRemovePlayer = (id: string) => () => {
    const filteredPlayers = players.filter((p) => p.id !== id);
    setPlayers(filteredPlayers);
    localStorage.setItem(StorageName.Players, JSON.stringify(filteredPlayers));
  }

  const handleAddPlayers = () => {
    if (!textFieldPlayersRef.current) {
      return;
    }
    if (confirm('Current players will be replace with this new players. Proceed?')) {
      const value = (textFieldPlayersRef.current as HTMLSelectElement).value;
      const lines = value.split(/\r\n|\n|\r/);
      const newPlayers: Player[] = [];
      for (const line of lines) {
        const playerName = line.replace(/\t/, ' ').trim();
        if (playerName !== '') {
          newPlayers.push({
            id: crypto.randomUUID(),
            name: playerName
          });
        }
      }
      localStorage.setItem(StorageName.Players, JSON.stringify(newPlayers));
      setPlayers(newPlayers);
    }
  }

  const handleUpdatePrizes = () => {
    if (!textFieldPrizesRef.current) {
      return;
    }
    if (confirm('Current prizes will be replace with this new prizes. Proceed?')) {
      const value = (textFieldPrizesRef.current as HTMLSelectElement).value;
      const lines = value.split(/\r\n|\n|\r/);
      const newPrizes: string[] = [];
      for (const line of lines) {
        const prize = line.replace(/\t/, ' ').trim();
        if (prize !== '') {
          newPrizes.push(prize);
        }
      }
      localStorage.setItem(StorageName.Prizes, JSON.stringify(newPrizes));
    }
  }

  const handleUpdateColor = () => {
    if (CSS.supports('color', color)) {
      localStorage.setItem(StorageName.WheelColor, color);
      alert('Wheel Color Successfully Updated!');
    } else {
      alert('Invalid color: ' + color);
    }
  }

  const playerList = players.filter((p) => p.name.toLowerCase().includes(filteredName.toLowerCase()))
    .map((player) => <Item key={player.id}>
    <span>{player.name}</span>
    <button onClick={handleRemovePlayer(player.id)}>Remove</button>
  </Item>)

  return <Container>
    <Left>
      <fieldset>
        <legend>Players</legend>
        <textarea style={{ width: '98%' }} rows={5} ref={textFieldPlayersRef} />
        <button onClick={handleAddPlayers}>Update Players</button>
      </fieldset>
      <br />
      <fieldset>
        <legend>Add New Player</legend>
        <InputWithLabel label="Player name" value={name} setValue={setName} />
        <button onClick={handleAddClick} disabled={name === ''}>Add</button>
      </fieldset>
      <br />
      <fieldset>
        <legend>Search Players</legend>
        <InputWithLabel label="Player name" value={filteredName} setValue={setFilteredName} />
      </fieldset>
      <br />
      <fieldset>
        <legend>Update Prizes</legend>
        <textarea style={{ width: '98%' }} rows={5} ref={textFieldPrizesRef} />
        <button onClick={handleUpdatePrizes}>Update Prizes</button>
      </fieldset>
      <fieldset>
        <legend>Update Wheel color</legend>
        <InputWithLabel label="Color" value={color} setValue={setColor} />
        <button onClick={handleUpdateColor}>Update Color</button>
      </fieldset>
    </Left>
    <Right>
      <Card>
        <div style={{ width: '100%' }}>
          {playerList}
          {players.length > 0 && playerList.length === 0 && 'No player found.'}
          {players.length === 0 && 'No players registered yet.'}
        </div>
      </Card>
    </Right>
  </Container>
}

export default AdminPage;
