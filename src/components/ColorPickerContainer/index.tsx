import React, { ReactElement } from "react"

import { StyledContainer, StrokeColorButton, FillColorButton } from "./styles"

type PropTypes = {
  strokeColor: string
  fillColor: string
  handleFillClick(): void
  handleStrokeClick(): void
}

const ColorPickerContainer: React.FC<PropTypes> = ({
  strokeColor,
  fillColor,
  handleFillClick,
  handleStrokeClick,
}): ReactElement => {
  return (
    <StyledContainer>
      <FillColorButton color={fillColor} onClick={handleFillClick} />
      <StrokeColorButton color={strokeColor} onClick={handleStrokeClick} />
    </StyledContainer>
  )
}

export default ColorPickerContainer
