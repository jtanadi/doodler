import styled from "styled-components"

const StyledButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: lightgray;
  box-shadow: inset -1.5px -1.5px 1px rgba(0, 0, 0, 0.3),
    inset 1.5px 1.5px 1px rgba(255, 255, 255, 0.75);
  border: 1px solid black;
  cursor: pointer;
`

export { StyledButton }
