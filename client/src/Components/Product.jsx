import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import IconButton from "@mui/material/IconButton";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled as MuiStyled } from "@mui/material/styles";
import { mobile } from "../responsive";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDirect } from "../redux/cartRedux";

const ProductImgStyle = MuiStyled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  min-width: 250px;
  margin: 10px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }

  ${mobile({
    minWidth: "160px",
    maxWidth: "150px",
    height: "150px",
  })}
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: teal;
    transform: scale(1.1);
  }
`;

const Product = ({ product }) => {
  const dispatch = useDispatch(); // used to dispatch redux actions

  const handleCartClick = () => {
    const cart_id = new Date().getTime();
    const quantity = 1;
    dispatch(addDirect({ ...product, quantity, cart_id }));
  };

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <ProductImgStyle alt={product.name} src={product.img} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link
          to={`/product/${product._id}`}
          color="inherit"
          underline="hover"
          component={RouterLink}
        >
          <Typography variant="h6" noWrap>
            {product.name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">&#8358;{product.price}</Typography>
          <IconButton onClick={handleCartClick}>
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Card>

    // start
    // <Container>
    //   <Image src={product.img} />
    //   <Info>
    //     <LinkR to={`/product/${product._id}`}>
    //       <Icon>
    //         <InfoIcon sx={{ color: "black" }} />
    //       </Icon>
    //     </LinkR>

    //     <Icon>
    //       <IconButton onClick={handleCartClick}>
    //         <ShoppingCartOutlinedIcon />
    //       </IconButton>
    //     </Icon>
    //   </Info>
    // </Container>
  );
};

export default Product;
