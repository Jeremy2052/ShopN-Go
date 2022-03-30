import styled from "styled-components";
import { Search, ShoppingCartOutlined, Home } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/userRedux";
import { useState } from "react";
import logo from "../logo.png";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  height: 60px;
  background-color: #fdc55d;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px" })}
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 2px;
  color: black;
  background-color: white;
  border-radius: 5px;
  height: 35px;
  ${mobile({ height: "25px", marginLeft: "10px" })}

  input {
    border: none;
    outline: none;
    width: 100%;
    background-color: transparent;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 60px;
  height: 40px;
  ${mobile({display:"none"})}
`

const Icon = styled(Home)`
  &.materialIcon {
    display: none;
    ${mobile({ display: "block" })}
  }
`;

const NavbarButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  margin-left: 20px;
  font-size: 16px;
  ${mobile({
    fontSize: "12px",
    marginLeft: "5px",
  })}

  :hover {
    color: white;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ flex: 2 })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 1.5 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: 500;
  color: black;

  &:hover{
    color: white;
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin: 0 10px;
  ${mobile({ display: "none" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleAuth = () => {
    dispatch(signOut());
    navigate("/login");
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    const res = await publicRequest("products");
    const filteredProducts = res.data.filter((productList) => {
      if (query === "") {
        return null;
      } else if (productList.title.toLowerCase().includes(query.toLowerCase())) {
        return productList;
      }
    });
    filteredProducts.length && navigate(`/productSearch/${query}`, { state: { filteredProducts } });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // console.log({ query });
      handleSubmit();
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Icon className="materialIcon" />
            <Image alt="" src={logo} />
          </Link>
          <Link to="/products/men">
            <NavbarButton>Men</NavbarButton>
          </Link>
          <Link to="/products/women">
            <NavbarButton>Women</NavbarButton>
          </Link>
        </Left>
        <Center>
          <SearchContainer>
            <input placeholder="Enter keyword" onKeyPress={handleKeyPress} type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Search onClick={handleSubmit} style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Center>
        <Right>
          {user && (
            <Name>
              <b>Hello, </b>
              <>{user.first}</>{" "}
            </Name>
          )}
          {user ? <MenuItem onClick={handleAuth}>Sign Out</MenuItem> : <MenuItem onClick={handleAuth}>Sign In</MenuItem>}
          <Link to={user ? `/orders/${user._id}` : "/login"} style={{ textDecoration: "none", color: "black" }}>
            <MenuItem>Orders</MenuItem>
          </Link>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
