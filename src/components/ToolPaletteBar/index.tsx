import React, { ReactElement, SyntheticEvent } from "react"
import { StyledBar, StyledMinimizeBtn } from "./styles"

type PropTypes = {
  onClick(e: SyntheticEvent): void
}

const ToolPaletteBar: React.FC<PropTypes> = ({ onClick }): ReactElement => {
  return (
    <StyledBar className="palette-bar">
      <StyledMinimizeBtn onClick={onClick} />
    </StyledBar>
  )
}

export default ToolPaletteBar
