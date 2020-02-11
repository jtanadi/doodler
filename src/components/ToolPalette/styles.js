import styled, { css } from "styled-components"

const StyledPalette = styled.div`
  width: 5.95rem;
  // height: auto;
  height: ${props => (props.numOfTools * 3) / 2 + 3.35}rem;
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

const Popover = styled.div`
  position: absolute;
  z-index: 3;

  ${props =>
    props.stroke &&
    css`
      left: 2.5rem;
    `}
`

const PaletteWrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 3rem;
  left: 3rem;
`

export { StyledPalette, Popover, PaletteWrapper }
