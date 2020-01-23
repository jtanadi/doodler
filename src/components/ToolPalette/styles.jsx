import styled, { css } from "styled-components"

const StyledPalette = styled.div`
  width: 200px;
  height: 8rem;
  background-color: red;
  position: fixed;
  top: 3rem;
  left: 3rem;
  overflow: hidden;
  transition: height 0.25s;

  ${props => !props.open && css`
    height: 1.75rem;
  `}
`

const StyledButtonContainer = styled.div`
  width: 90%;
  margin: 2rem auto 1rem auto;
  display: flex;
`

export { StyledPalette, StyledButtonContainer }

