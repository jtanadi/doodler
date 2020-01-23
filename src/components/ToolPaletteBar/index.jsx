import React from "react"

import {
  StyledBar,
  StyledMinimizeBtn
} from "./styles"

export default function ToolPaletteBar(props) {
  return (
    <StyledBar className="palette-bar">
      <StyledMinimizeBtn onClick={props.onClick} />
    </StyledBar>
  )
}
