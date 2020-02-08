import styled, { css } from "styled-components"

const StyledToolButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border: 0;

  ${props =>
    props.selected &&
    css`
      background-color: black;
      color: white;
    `}
`
export default StyledToolButton
