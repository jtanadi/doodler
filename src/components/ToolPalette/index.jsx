import React, { useState } from "react"
import Draggable from "react-draggable"

import {
  StyledPalette,
  StyledButtonContainer
} from "./styles"

import ToolButton from "../ToolButton"
import ToolPaletteBar from "../ToolPaletteBar"

export default function ToolPalette() {
  const [open, setOpen] = useState(true)
  const handleClick = () => {
    setOpen(prevState => !prevState)
  }

  return (
    <Draggable handle=".palette-bar" bounds="body">
      <StyledPalette open={open}>
        <ToolPaletteBar onClick={handleClick} />

        <StyledButtonContainer>
          <ToolButton />
          <ToolButton />
          <ToolButton />
          <ToolButton />
        </StyledButtonContainer>
      </StyledPalette>
    </Draggable>
  )
}
