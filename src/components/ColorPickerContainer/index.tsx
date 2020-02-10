import React, { ReactElement } from "react"

import { StyledContainer, StrokeColorButton, FillColorButton } from "./styles"

type PropTypes = {
  strokeColor: string
  fillColor: string
  handleFillColor(type: string): void
  handleStrokeColor(type: string): void
}

const ColorPickerContainer: React.FC<PropTypes> = ({
  strokeColor,
  fillColor,
  handleFillColor,
  handleStrokeColor,
}): ReactElement => {
  return (
    <StyledContainer>
      <FillColorButton
        color={fillColor}
        onClick={(): void => handleFillColor("yellow")}
      />
      <StrokeColorButton
        color={strokeColor}
        onClick={(): void => handleStrokeColor("blue")}
      />
    </StyledContainer>
  )
}

export default ColorPickerContainer
