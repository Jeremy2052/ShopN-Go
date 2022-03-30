import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethod";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";

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
  padding: 10px;
  background-color: #ffffffdf;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${mobile({ width: "80%" })}
`;
const Title = styled.h1`
  font-size: 36px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  width: 80%;
  /* flex-wrap: wrap; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Input = styled.input`
  flex: 2;
  width: 90%;
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
  ${mobile({ width: "180px" })}
  :hover {
    opacity: 0.7;
  }
`;
const Links = styled.a`
  margin: 5px 0;
  font-size: 14px;
  color: #066fb4;
  text-decoration: underline;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
`;

const Logo = styled.h1``;

const Register = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log({ username, email, password });
      const user = {
        username: username,
        email: email,
        first: first,
        last: last,
        password: password,
      };
      try {
        await publicRequest.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    } else {
      setError(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <Logo>ShopN Go</Logo>
        </Link>
        <Title>Create account</Title>
        <Form onSubmit={registerUser}>
          <Input onChange={(e) => setFirst(e.target.value)} placeholder="First name" />
          <Input onChange={(e) => setLast(e.target.value)} placeholder="Last name" />
          <Input onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <Input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
          <Button>Create</Button>
        </Form>
        <Links href="/login">Sign in</Links>
        {error && <Error>Passwords must match</Error>}
      </Wrapper>
    </Container>
  );
};

export default Register;
