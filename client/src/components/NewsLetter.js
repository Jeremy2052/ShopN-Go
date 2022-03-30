import { Send } from "@material-ui/icons"
import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
  height: 50vh;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 10px;
`
Title.displayName = 'title'

const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
  ${mobile({textAlign:"center"})}
`
const Button = styled.button`
  flex:1;
  border: none;
  background-color: #fdc55d;
  color: white;
`
Button.displayName = 'newsButton'

const Input = styled.input`
  border: none;
  flex:8;
  outline: none;
  padding-left: 20px;
  font-size: 20px;
  font-weight: 200;
`
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({width:"80%"})}
`

const NewsLetter = () => {
  return (
    <Container>
      <Title>News Letter</Title>
      <Description>Get a 25% off coupon sent to you!</Description>
      <InputContainer>
        <Input placeholder="Email"/>
        <Button><Send/></Button>     
      </InputContainer>
    </Container>
  )
}

export default NewsLetter