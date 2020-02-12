import styled, { css } from "styled-components"

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

export { Popover, PaletteWrapper }
