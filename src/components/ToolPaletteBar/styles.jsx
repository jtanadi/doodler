import styled, { css } from "styled-components"

const StyledBar = styled.div`
  width: 100%;
  height: 1.75rem;
  background-color: gray;
  position: absolute;
  top: 0;
  left: 0;
  cursor: grabbing;
`

const StyledMinimizeBtn = styled.button`
  width: 1.125rem;
  height: 1.125rem;
  position: absolute;
  padding: none;
  text-align: center;
  top: 0.25rem;
  left: 0.25rem;
  border: 0;
  background-color: yellow;
`

export { StyledBar, StyledMinimizeBtn }
