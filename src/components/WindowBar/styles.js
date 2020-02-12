import styled from "styled-components"

const StyledBar = styled.div`
  width: 100%;
  height: 1.9rem;
  cursor: grabbing;
  position: relative;
`

const StyledMinimizeBtn = styled.button`
  width: 1rem;
  height: 1.1rem;
  position: absolute;
  padding: none;
  top: calc((1.75rem - 1rem) / 2);
  left: 0rem;
  background-color: lightgray;
  border: 1px solid black;
  box-shadow: inset 1px 1px 1px rgba(255, 255, 255, 0.75),
    inset -1px -1px 1px rgba(0, 0, 0, 0.3);

  :active {
    background-color: gray;
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3),
      inset -1px -1px 1px rgba(255, 255, 255, 0.75);
  }
`

export { StyledBar, StyledMinimizeBtn }
