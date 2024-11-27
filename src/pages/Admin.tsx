import styled from "@emotion/styled";
import { useState } from "react";
import { loadPlayers } from "../utils";

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
  const [department, setDepartment] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [filteredDept, setFilteredDept] = useState('');
  const [players, setPlayers] = useState(loadPlayers());

  const handleAddClick = () => {
    players.unshift({
      id: crypto.randomUUID(),
      name,
      department,
    });
    setPlayers([...players]);
    localStorage.setItem('players', JSON.stringify(players));
    clear();
  }

  const handleRemovePlayer = (id: string) => () => {
    const filteredPlayers = players.filter((p) => p.id !== id);
    setPlayers(filteredPlayers);
    localStorage.setItem('players', JSON.stringify(filteredPlayers));
  }

  const deleteAllPlayers = () => {
    if (confirm('Are you sure you want to delete all the players?')) {
      setPlayers([]);
      localStorage.setItem('players', '[]');
    }
  }

  const clear = () => {
    setName('');
    setDepartment('');
  }

  const playerList = players.filter((p) => p.name.includes(filteredName) && p.department.includes(filteredDept))
  .map((player) => <Item key={player.id}>
    <span>{player.name} / {player.department}</span>
    <button onClick={handleRemovePlayer(player.id)}>Remove</button>
  </Item>)

  return <Container>
    <Left>
      <fieldset>
        <legend>Add New Player</legend>
        <InputWithLabel label="Player name" value={name} setValue={setName} />
        <InputWithLabel label="Department" value={department} setValue={setDepartment} />
        <button onClick={handleAddClick} disabled={name === '' || department === ''}>Add</button>
        <button onClick={clear} disabled={name === '' && department === ''}>Clear</button>
      </fieldset>
      <br />
      <fieldset>
        <legend>Filter Players</legend>
        <InputWithLabel label="Player name" value={filteredName} setValue={setFilteredName} />
        <InputWithLabel label="Department" value={filteredDept} setValue={setFilteredDept} />
      </fieldset>
      <br />
      <fieldset>
        <legend>Remove All Players</legend>
        <button onClick={deleteAllPlayers} disabled={players.length === 0}>Delete</button>
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
