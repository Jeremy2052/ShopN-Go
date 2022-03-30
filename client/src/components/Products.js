import { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data"
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(category ? `https://shopn-go.herokuapp.com/api/products?category=${category}` : `https://shopn-go.herokuapp.com/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category && setFilteredProducts(products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value))));
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return <Container>{category ? filteredProducts.map((item) => <Product key={item._id} item={item}></Product>) : products.slice(0, 8).map((item) => <Product key={item._id} item={item}></Product>)}</Container>;
};

export default Products;
