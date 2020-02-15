import React, { ReactElement } from "react"

import { StyledContainer } from "./styles"

import ToolButton from "../ToolButton"
import { Tool, ToolTypes, DrawingToolTypes } from "../../utils/"

type PropTypes = {
  tools: Tool[]
  currentTool?: string
  handleButton(type?: ToolTypes | DrawingToolTypes): void
}

const ToolButtonsContainer: React.FC<PropTypes> = ({
  tools,
  currentTool,
  handleButton,
}): ReactElement => {
  return (
    <StyledContainer>
      {tools.map((tool, i) =>
        // 0th tool is null
        i > 0 ? (
          <ToolButton
            key={i}
            tool={tool}
            handleButton={handleButton}
            currentTool={currentTool}
          />
        ) : null
      )}
    </StyledContainer>
  )
}

export default ToolButtonsContainer
