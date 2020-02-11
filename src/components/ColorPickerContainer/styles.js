import styled from "styled-components"

const StyledContainer = styled.div`
  box-sizing: content-box;
  width: 5rem;
  margin: 0.25rem auto 0 auto;
  border: 1px solid black;
`

const FillColorButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-right: 1px solid black;
  background-color: ${props => props.color};
`

const StrokeColorButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: 0.75rem solid ${props => props.color};
  background-color: white;
`

export { StyledContainer, StrokeColorButton, FillColorButton }
