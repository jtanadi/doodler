import styled from "styled-components"

const StyledContainer = styled.div`
  box-sizing: content-box;
  width: 5rem;
  margin: 1.9rem auto 0 auto;
  border: 1px solid black;
  &:nth-child(3) {
    margin: 0.25rem auto 1rem auto;
  }
`

export { StyledContainer }
