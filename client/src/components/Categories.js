import styled from "styled-components"
import { categories } from "../data"
import { mobile } from "../responsive"
import CategoryItem from "./CategoryItem"

const Container = styled.div`
  display: flex;
  /* padding: 20px; */
  justify-content: space-between;
  /* background-color: #fdc55d; */
  ${mobile({flexDirection:"column"})}
`

const Categories = () => {
  return (
    <Container>
      {categories.map(item => (<CategoryItem key={item.id} item={item}></CategoryItem>))}
    </Container>
  )
}

export default Categories