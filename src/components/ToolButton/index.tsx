import React, { ReactElement, SyntheticEvent } from "react"

import StyledToolButton from "./styles"

type PropTypes = {
  icon: string
  pickTool(id: string): void
}

const ToolButton: React.FC<PropTypes> = ({ icon, pickTool }): ReactElement => {
  return (
    <StyledToolButton
      onClick={(e: SyntheticEvent): void => pickTool(e.currentTarget.id)}
    >
      <span>{icon}</span>
    </StyledToolButton>
  )
}

export default ToolButton
