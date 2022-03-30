import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#f1f1f1" })}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  ${mobile({ justifyContent: "center" })}
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Payment = styled.img`
  width: 200px;
  height: 40px;
  ${mobile({ width: "50%", height: "40px" })}
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>World Shopping Spree</Logo>
        <Desc>Shop around in a world of online shopping whether it is for yourself, family or friends. There are sales every week just for you and new products added for everyone to see.</Desc>
        <SocialContainer>
          <SocialIcon color="#2857C3">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="#7EC8E3">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="#DD9999">
            <Instagram />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men Clothing</ListItem>
          <ListItem>Women Clothing</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Orders</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          6501 Falcon River Way
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          682-208-6837
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          jeremy93214@hotmail.com
        </ContactItem>
        <Payment src="https://www.russellschwartzdds.com/storage/app/media/creditcards.png" />
      </Right>
    </Container>
  );
};

export default Footer;
