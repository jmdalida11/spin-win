import styled from "@emotion/styled";
import Nav from "./components/Nav";
import AdminPage from "./pages/Admin";
import PlayPage from "./pages/Play";
import { Route, Routes } from "react-router";

const StyledBody = styled.div`
  padding: 10px 20px 0px 20px;
`;

function App() {
  return <div>
    <Nav />
    <StyledBody>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/play" element={<PlayPage />} />
      </Routes>
    </StyledBody>
  </div>
}

export default App;
