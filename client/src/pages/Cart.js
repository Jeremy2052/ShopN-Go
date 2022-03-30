import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";
import { resetCart, removeProduct } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px 0 0 0" })}
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: white;
  border: 1px solid gray;
  ${mobile({ fontSize: "12px", width: "80px", height: "50px", padding: "5px" })}
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column", justifyContent: "center", alignItems: "center" })}
`;
const Image = styled.img`
  width: 250px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "100%" })}
`;

const ProductName = styled.span`
  font-size: 20px;
  ${mobile({ fontSize: "16px" })}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ marginBottom: "0px" })}
`;
const ProductAmount = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #dfdfdf;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #fdc55d;
  color: white;
  border: 1px solid lightgray;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: black;
    opacity: 0.8;
  }
`;

const DeleteIcon = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  color: gray;
  height: 30px;
  width: 30px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const Delete = styled.a`
  text-decoration: none;
  color: #099dce;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  // const history = useHistory();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total.toFixed(2) * 100,
        });

        await userRequest.post("/orders", { userId: user._id, products: cart.products, amount: cart.total, address: res.data.billing_details.address, status: res.data.status }, { headers: { token: `Bearer ${user.accessToken}` } });
        dispatch(resetCart());
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, user._id, cart.products, cart.total, user.accessToken, dispatch]);

  const removeProducts = (productId, quantity, total) => {
    dispatch(removeProduct({ productId, quantity, total }));
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Your cart</Title>
        <Top>
          <TopButton type="submit" onClick={() => navigate(-1)}>
            Continue Shopping
          </TopButton>
          <TopButton onClick={() => dispatch(resetCart())}>Clear Cart</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>Quantity:{product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>$ {(product.price * product.quantity).toFixed(2)}</ProductPrice>
                  <DeleteIcon>
                    <Delete onClick={() => removeProducts(product._id, product.quantity, product.price * product.quantity)}>Delete</Delete>
                  </DeleteIcon>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>Total:</SummaryItemText>
              <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout name="Shopping Spree" image="" billingAddress shippingAddress description={`Your total is $${cart.total.toFixed(2)}`} amount={cart.total.toFixed(2) * 100} token={onToken} stripeKey={KEY}>
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
