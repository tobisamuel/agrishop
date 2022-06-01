import styled from "styled-components";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const LinkR = styled(Link)`
  text-decoration: none;
  color: teal;
`;

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* align-items: flex-start; */
`;

const Logo = styled.h1`
  margin: 0px;
`;
const Description = styled.p`
  margin: 0px;
  padding: 10px 0px;
`;
const IconContainer = styled.div`
  display: flex;
  /* justify-content: center; */
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h2`
  margin: 0;
`;
const List = styled.ul`
  margin-top: 15px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 5px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "lightgray" })}
`;

const ContactItem = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-content: center;
`;

const Payment = styled.img``;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>AGRISHOP</Logo>
        <Description>
          AgriShop is a digital marketplace for selling and buying crops and
          agricultural products. AgriShop is a virtual platform where farmers
          can register as Vendors and list their products for sale and perform
          business transactions electronically.
        </Description>
        <IconContainer>
          <Icon>
            <TwitterIcon />
          </Icon>
          <Icon>
            <FacebookIcon />
          </Icon>
          <Icon>
            <InstagramIcon />
          </Icon>
          <Icon>
            <YouTubeIcon />
          </Icon>
        </IconContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <LinkR to="/">Home</LinkR>
          </ListItem>
          <ListItem>
            <LinkR to="/products/all">Products</LinkR>
          </ListItem>
          <ListItem>
            <LinkR to="/vendor">Vendor</LinkR>
          </ListItem>
          <ListItem>
            <LinkR to="/cart">Cart</LinkR>
          </ListItem>
          <ListItem>
            <LinkR to="/register">Register</LinkR>
          </ListItem>
          <ListItem>
            <LinkR to="/login">Login</LinkR>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnIcon sx={{ mr: "10px" }} /> University of Ilorin, Fate
          Tanke Rd, Ilorin, Kwara.
        </ContactItem>
        <ContactItem>
          <PhoneIcon sx={{ mr: "10px" }} /> +234 123 456 789
        </ContactItem>
        <ContactItem>
          <EmailOutlinedIcon sx={{ mr: "10px" }} /> agrishop@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
