import styled from "styled-components"

const TopDiv = styled.div`
  z-index: 999;
`

const HelpCover = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`

const TextDiv = styled.div`
  width: 100%;
  height: ${props => props.height}px;
  background-color: white;
  border: 1px solid black;
  padding: 0.25rem 0.5rem;
`

const HR = styled.hr`
  border: 1px solid lightgray;
  margin-top: 1.5rem;
  margin-bottom: 1.25rem;
`

const H1 = styled.h1`
  margin-top: 0.3875rem;
  margin-bottom: 0.35rem;
  font-size: 1.65rem;
`

const H2 = styled.h2`
  font-size: 1.25rem;
`

const P = styled.p`
  margin-top: 0;
`

const Code = styled.span`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  font-family: monospace;
  background-color: lightgray;
`

export { TopDiv, HelpCover, TextDiv, HR, H1, H2, P, Code }
