import React, { ReactElement } from "react"

import { StyledButton } from "./styles"

type PropTypes = {
  top?: string
  bottom?: string
  left?: string
  right?: string
  onClick(): void
}

const RoundButton: React.FC<PropTypes> = ({
  top,
  bottom,
  left,
  right,
  onClick,
  children,
}): ReactElement => {
  return (
    <StyledButton
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export default RoundButton
