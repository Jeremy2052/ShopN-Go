import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
`;
const Title = styled.h1`
  font-size: 60px;
`;
const Desc = styled.h3`
  font-size: 24px;
`;
const Span = styled.span``;
const Back = styled.div``;
const Links = styled.a`
  cursor: pointer;
`;

const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <Desc>Not Found</Desc>
      <Span>The page you are looking for doesn't exist or an other error occured.</Span>
      <Back>
        <Span>Go to </Span>
        <Link to="/">
          <Links>Home</Links>
        </Link>
      </Back>
    </Container>
  );
};

export default NotFound;
