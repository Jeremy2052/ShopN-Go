import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* height: 100vh; */
  padding: 30px;
  justify-content: center;
  /* border: 1px solid gray; */
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 300px;
  border: 1px solid lightgray;
  margin: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const ImageContainer = styled.div`
  flex: 2;
  border-bottom: 1px solid lightgray;
  display: flex;
  align-self: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 250px;
  width: 250px;
  /* border: 1px solid blue; */
  margin-top: 10px;
`;

const Description = styled.div`
  flex: 1;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 18px;
  padding-bottom: 5px;
`;

const Desc = styled.span`
  font-size: 14px;
  padding-bottom: 5px;
`;

const Price = styled.span`
  font-size: 18px;
`;

const ProductSearch = () => {
  const { state } = useLocation();

  return (
    <Container>
      <Navbar />
      <Wrapper>
        {state.filteredProducts?.map((p) => (
          <div key={p._id}>
            <Link to={`/product/${p._id}`} style={{ textDecoration: "none", color: "black" }}>
              <ProductCard>
                <ImageContainer>
                  <Image src={p.img} />
                </ImageContainer>
                <Description>
                  <Title>{p.title}</Title>
                  <Desc>{p.desc}</Desc>
                  <Price>$ {p.price}</Price>
                </Description>
              </ProductCard>
            </Link>
          </div>
        ))}
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default ProductSearch;
