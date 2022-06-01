import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  background-color: lightsalmon;
  position: relative;
  overflow: hidden;
  ${mobile({ height: "60vh" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: lightgray;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  ${mobile({ width: 30, height: 30 })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  ${mobile({
    justifyContent: "center",
    alignItems: "center",
  })}
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100%;
  ${mobile({ flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 2;
  display: flex;
  ${mobile({ display: "none" })}
`;

const Image = styled.img`
  /* height: 100%; */
  width: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ padding: "30px 50px", height: "100%" })}
`;

const Title = styled.h1`
  font-size: 50px;
  ${mobile({ margin: "10px 0", fontSize: "35px" })}
`;

const Description = styled.p`
  margin: 30px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  ${mobile({ margin: "15px 0" })}
`;
const Button = styled.button`
  padding: 10px;
  font-size: 10px;
  background-color: transparent;
  cursor: pointer;
`;

const LinkR = styled(Link)`
  text-decoration: none;
`;

function Slider() {
  const [slideIndex, setslideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setslideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setslideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <div>
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlinedIcon />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide key={item.id}>
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Description>{item.desc}</Description>
                <LinkR to="products/all">
                  <Button>BUY NOW</Button>
                </LinkR>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlinedIcon />
        </Arrow>
      </Container>
    </div>
  );
}

export default Slider;
