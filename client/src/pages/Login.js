import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4)), url("https://www.addictioncenter.com/app/uploads/2020/01/online_shopping_addiction-scaled.jpeg") center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 30%;
  padding: 30px;
  background-color: #ffffffdf;
  border-radius: 10px;
  ${mobile({ width: "80%" })}
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  font-size: 18px;
  outline: none;
  padding: 10px;
`;
const Button = styled.button`
  width: 100px;
  padding: 10px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  background-color: #fdc55d;
  color: white;
  font-size: 20px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }

  :hover {
    opacity: 0.7;
  }
`;

const Links = styled.a`
  margin: 5px 0;
  font-size: 12px;
  color: #066fb4;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Logo = styled.h1``;

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <Logo>ShopN Go</Logo>
        </Link>
        <Title>Sign In</Title>
        <Form>
          <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleClick} disabled={isFetching}>
            Log In
          </Button>
          {error && <Error>Something went wrong</Error>}
          <Links>Forgot Password</Links>
          <Links href="/register">Create Account</Links>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
