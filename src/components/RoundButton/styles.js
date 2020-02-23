import styled, { css } from "styled-components"

const StyledButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  position: fixed;
  background-color: lightgray;
  box-shadow: inset -1.5px -1.5px 1px rgba(0, 0, 0, 0.3),
    inset 1.5px 1.5px 1px rgba(255, 255, 255, 0.75);
  border: 1px solid black;
  cursor: pointer;

  ${props =>
    props.top &&
    css`
      ${props => `top: ${props.top};`}
    `}

  ${props =>
    props.bottom &&
    css`
      ${props => `bottom: ${props.bottom};`}
    `}
  
  ${props =>
    props.left &&
    css`
      ${props => `left: ${props.left};`}
    `}

  ${props =>
    props.right &&
    css`
      ${props => `right: ${props.right};`}
    `}

  &:active {
    background-color: gray;
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3),
      inset -1px -1px 1px rgba(255, 255, 255, 0.75);
  }
`

export { StyledButton }
