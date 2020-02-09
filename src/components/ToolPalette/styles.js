import styled, { css } from "styled-components"

const StyledPalette = styled.div`
  width: 5.95rem;
  height: ${props => (props.numOfTools * 2.5) / 2 + 3.25}rem;
  position: fixed;
  top: 3rem;
  left: 3rem;
  overflow: hidden;
  background-color: lightgray;
  border: 1px solid black;
  transition: height 0.5s;
  box-shadow: inset -1.5px -1.5px 1px rgba(0, 0, 0, 0.3),
    inset 1.5px 1.5px 1px rgba(255, 255, 255, 0.75), 3px 3px 0px rgb(0, 0, 0);

  ${props =>
    !props.open &&
    css`
      height: 2rem;
    `}
`

export { StyledPalette }
