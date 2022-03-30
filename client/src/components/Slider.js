import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  /* height: calc(100vh - 60px); */
  display: flex;
  /* border: 1px solid blue; */
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
  ${mobile({ height: "40vh" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  /* background-color: #f0efef; */
  /* border-radius: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  color: #7c7b7b;
  z-index: 2;

  :hover {
    opacity: 0.7;
  }
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  transition: all 1.5s ease;
  align-items: center;
  /* position: relative; */
`;
Wrapper.displayName = 'Wrapper'

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.bg};
  ${mobile({ flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 2;
  height: 100%;
  width: 100%;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  ${mobile({ fontSize: "20px" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  /* height: 80%; */
  /* width: 300px; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* position: absolute;
  left:5%;
  top:20%; */
  ${mobile({ padding: "0 10px", flexDirection: "row" })}
`;

const Title = styled.h1`
  font-size: 60px;
  ${mobile({ fontSize: "20px" })}
`;

const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-size: 500;
  letter-spacing: 3px;
  ${mobile({ fontSize: "10px", margin: "20px 0" })}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  width: 30%;
  ${mobile({ fontSize: "14px", width: "80%", height: "40px" })}

  :hover {
    opacity: 0.7;
  }
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const delay = 4000;
  const timeoutRef = useRef(null);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  };

  const resetTimeoust = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeoust();
    timeoutRef.current = setTimeout(() => setSlideIndex((prevSlide) => (prevSlide === sliderItems.length - 1 ? 0 : prevSlide + 1)), delay);

    return () => {
      resetTimeoust();
    };
  }, [slideIndex]);

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowBackIos fontSize="large" />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              {/* <Button>Shop Now</Button> */}
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowForwardIos fontSize="large" />
      </Arrow>
    </Container>
  );
};

export default Slider;
