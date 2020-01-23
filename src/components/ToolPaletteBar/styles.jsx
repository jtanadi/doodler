import styled, { css } from "styled-components"

const StyledBar = styled.div`
  width: 100%;
  height: 1.75rem;
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 1px solid green;
  cursor: grabbing;
`

const StyledMinimizeBtn = styled.button`
  width: 1rem;
  height: 1rem;
  position: absolute;
  padding: none;
  top: calc((1.75rem - 1rem) / 2) ;
  left: calc((1.75rem - 1rem) / 2) ;
  background-color: green;
  border: none;
  border-radius: 0.5rem;
`

export { StyledBar, StyledMinimizeBtn }
