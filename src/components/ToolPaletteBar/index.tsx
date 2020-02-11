import React, { ReactElement, MouseEvent } from "react"
import { StyledBar, StyledMinimizeBtn } from "./styles"

type PropTypes = {
  onClick(e: MouseEvent): void
}

const ToolPaletteBar: React.FC<PropTypes> = ({ onClick }): ReactElement => {
  return (
    <StyledBar className="palette-bar">
      <StyledMinimizeBtn onClick={onClick} />
    </StyledBar>
  )
}

export default ToolPaletteBar
