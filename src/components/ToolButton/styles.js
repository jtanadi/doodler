import styled, { css } from "styled-components"

const StyledToolButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border: 0;
  border-bottom: 1px solid gray;

  &:nth-child(odd) {
    border-right: 1px solid gray;
  }

  &:last-child,
  &:nth-last-child(2) {
    border-bottom: 0;
  }

  ${props =>
    props.selected &&
    css`
      background-color: black;
      color: white;
    `}
`
export default StyledToolButton
