import styled from "@emotion/styled";
import { NavLink, useLocation } from "react-router";

const Container = styled.nav`
  display: flex;
  background-color: black;
  color: white;
`;

const NavItem = styled(NavLink)<{ current: string }>`
  all: unset;
  height: 100%;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  ${(props) => props.current === 'active' ? 'text-decoration: underline;' : ''}

  &:hover {
    background-color: grey;
  }
`;

function Nav() {
  const location = useLocation();

  return <Container>
    <NavItem to="/" current={location.pathname === '/' ? 'active' : ''}>Admin</NavItem>
    <NavItem to="/play" current={location.pathname === '/play' ? 'active' : ''}>Play</NavItem>
  </Container>
}

export default Nav;