import { FavoriteBorderOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  /* border: 1px solid gray; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* position: relative; */
  /* background-color: blue; */
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  /* position: absolute;
  top: 0;
  left:0;
  align-items: center; */
`;
const Image = styled.img`
  height: 250px;
  width: 250px;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.5s ease;

  :hover {
    transform: scale(1.1);
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 10px 20px;

  :hover {
    opacity: 0.7;
  }
`;

const Price = styled.span`
  font-weight: 300;
  font-size: 24px;
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Link to={`/product/${item._id}`}>
        <Image src={item.img} />
      </Link>
      <Info>
        <Icon color="#fdc55d">
          <ShoppingCartOutlined />
        </Icon>
        <Price>$ {item.price}</Price>
        <Icon color="#FED0D0">
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
