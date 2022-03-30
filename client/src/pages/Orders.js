import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import { userRequest } from "../requestMethod";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding-top: 20px;
  ${mobile({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  })}
`;

const OrderWrapper = styled.div`
`;
const ProductWrapper = styled.div`
  border-radius: 10px;
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
  padding: 10px;
  /* height: 250px; */
  ${mobile({
    flexDirection: "column",
    width: "70vw",
  })}
`;

const ImageWrapper = styled.div`
  flex: 2;
`;
const Image = styled.img`
  width: 250px;
  height: 250px;
  /* object-fit: contain; */
  border-radius: 10px;
`;

const DescWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 10px;

`;
const Title = styled.h1`
  font-weight: 400;
  font-size: 20px;
`;
const Desc = styled.span`
  font-weight: 300;
`;
const OrderDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  ${mobile({width:"80%"})}
`;
const Detail = styled.span`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${user._id}`, { headers: { token: `Bearer ${user.accessToken}` } });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getOrders();
  }, [user._id, user.accessToken]);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        {orders.map((order) => (
          <OrderWrapper key={order._id}>
            <span style={{ marginLeft: "20px" }}>Order #: {order._id}</span>
            {order.products.map((product) => (
              <ProductWrapper key={product._id}>
                <ImageWrapper>
                  <Image src={product.img} />
                </ImageWrapper>
                <DescWrapper>
                  <Title>{product.title}</Title>
                  <Desc>{product.desc}</Desc>
                  <Desc>Quantity: {product.quantity}</Desc>
                  <Desc>Total: ${order.amount}</Desc>
                </DescWrapper>
                <OrderDetails>
                  <Detail>View order details</Detail>
                  <Detail>View invoice</Detail>
                  <Detail>Write product review</Detail>
                </OrderDetails>
              </ProductWrapper>
            ))}
          </OrderWrapper>
        ))}
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Orders;
