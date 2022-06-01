import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";

const LinkR = styled(Link)`
  text-decoration: none;
  color: teal;
`;

const SearchBar = () => {
  return (
    <InputBase placeholder="Search AgriShop" sx={{ ml: 1, flex: 1 }}>
      <IconButton type="submit">
        <SearchIcon sx={{ color: "black" }} />
      </IconButton>
    </InputBase>
  );
};

const Container = styled.div`
  height: 60px;
  padding-bottom: 30px;
  ${mobile({ height: "30px", paddingBottom: "25px" })}
`;

const Wrapper = styled.div`
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 3px" })}
`;

const Left = styled.div`
  flex: 1;
  color: teal;
  /* text-align: center; */
`;

const Logo = styled.h2`
  font-weight: bold;
  ${mobile({ fontSize: "12px", paddingLeft: "0px", textAlign: "center" })}
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  ${mobile({ flex: 2, height: "15px" })}
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  width: 100%;
  ${mobile({ height: "20px", padding: "1px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: teal;
  ${mobile({ flex: 2, fontSize: "11px" })}
`;

const MenuItem = styled.div`
  font-size: 14;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ marginLeft: "5px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity); // get quantity from store with useSelector hook
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.alert(`You have successfully logged out`);
    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <MenuIcon /> */}
          {/* <SearchContainer>
            <SearchBar />
            <SearchIcon />
          </SearchContainer> */}
        </Left>
        <Center>
          <Logo>
            <LinkR to="/">AGRISHOP</LinkR>
          </Logo>
        </Center>
        <Right>
          {user ? (
            <LinkR to="/user/profile">
              <MenuItem>Hello, {user.firstName}</MenuItem>
            </LinkR>
          ) : (
            <LinkR to="/login">
              <MenuItem>LOGIN</MenuItem>
            </LinkR>
          )}

          {user ? (
            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
          ) : (
            <LinkR to="/register">
              <MenuItem>REGISTER</MenuItem>
            </LinkR>
          )}

          <LinkR to="/cart">
            <MenuItem>
              <Badge
                color="primary"
                badgeContent={quantity}
                sx={{ "& .MuiBadge-badge": { backgroundColor: "teal" } }}
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </LinkR>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
