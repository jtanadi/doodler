import styled, { css } from "styled-components"

const StyledWindow = styled.div`
  width: ${props => props.contentWidth + 0.95}rem;
  height: ${props => props.contentHeight + 2.5}rem;
  padding: 0 calc(0.95rem / 2 - 2px) 0.5rem calc(0.95rem / 2 - 2px);
  overflow: hidden;
  background-color: lightgray;
  border: 1px solid black;
  transition: height 0.5s;
  box-shadow: inset -1.5px -1.5px 1px rgba(0, 0, 0, 0.3),
    inset 1.5px 1.5px 1px rgba(255, 255, 255, 0.75), 3px 3px 0px rgb(0, 0, 0);

  ${props =>
    !props.open &&
    css`
      height: 1.9rem;
    `}
`

export { StyledWindow }
