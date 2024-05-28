import { NavLink } from "react-router-dom";
import KuvaLogo from "../../media/KuvaLogo.png";
import styled from "styled-components";
import "./styles.css";

const StyledNavLink = styled.div`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 0.5rem 1rem;
  text-align: left;
  border: 0;
  border-radius: 0.25rem;

  ${(props) => props.isActive && "background-color: #222222; color: #ff5100;"}

  & :hover {
    color: #ff5100;
  }

  & i {
    margin-right: 8px;
  }
`;

const CustomNavLink = ({ children, to }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <StyledNavLink isActive={isActive}>{children}</StyledNavLink>
      )}
    </NavLink>
  );
};

const NavigationBar = () => {
  return (
    <div className="layout-nav">
      <img src={KuvaLogo} />
      <hr />
      <nav>
        <CustomNavLink to="/">
          <span>
            <i class="fa fa-home"></i>
            Home
          </span>
        </CustomNavLink>
        <CustomNavLink to="/camara">
          <span>
            <i class="fa fa-exclamation-triangle"></i>
            Gas Leak Detection
          </span>
        </CustomNavLink>

        <CustomNavLink to="/account">
          <span>
            <i class="fa fa-user-circle-o"></i>
            Account
          </span>
        </CustomNavLink>
        <CustomNavLink to="/settings">
          <span>
            <i class="fa fa-cog"></i>
            Settings
          </span>
        </CustomNavLink>
      </nav>
    </div>
  );
};

export default NavigationBar;
