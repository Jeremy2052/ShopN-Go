import styled from "styled-components"

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 20px;
`

const Announcement = () => {
  return (
    <Container>
      Welcome to the world of shopping!
    </Container>
  )
}

export default Announcement