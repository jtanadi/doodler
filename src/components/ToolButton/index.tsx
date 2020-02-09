import React, { ReactElement } from "react"

import StyledToolButton from "./styles"
import { Tool } from "../../utils/tools"

type PropTypes = {
  tool: Tool
  currentTool?: string
  handleButton(type?: string): void
}

const ToolButton: React.FC<PropTypes> = ({
  tool,
  currentTool,
  handleButton,
}): ReactElement => {
  return (
    <StyledToolButton
      onClick={(): void => handleButton(tool.type)}
      selected={tool.type === currentTool}
    >
      <span>{tool.icon}</span>
    </StyledToolButton>
  )
}

export default ToolButton
