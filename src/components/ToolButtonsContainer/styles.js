import styled from "styled-components"

const StyledContainer = styled.div`
  box-sizing: content-box;
  width: 5rem;
  margin: 1.9rem auto 0 auto;
  border: 1px solid black;
  &:nth-child(n + 3) {
    margin-top: 0.25rem;
  }
`

export { StyledContainer }
