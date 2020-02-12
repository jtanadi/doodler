import React, { useState, ReactElement, ReactNodeArray, ReactNode } from "react"
import Draggable from "react-draggable"

import { StyledWindow } from "./styles"
import WindowBar from "../WindowBar"

type PropTypes = {
  children: ReactNodeArray | ReactNode
  draggable: boolean
  contentWidth: number
  contentHeight: number
}

const Window: React.FC<PropTypes> = ({
  draggable,
  children,
  contentWidth,
  contentHeight,
}): ReactElement => {
  const [open, setOpen] = useState(true)
  const handleMinimize = (): void => setOpen(prevState => !prevState)

  if (draggable) {
    return (
      <Draggable handle=".palette-bar" bounds="body">
        <StyledWindow
          open={open}
          contentWidth={contentWidth}
          contentHeight={contentHeight}
        >
          <WindowBar onClick={handleMinimize} />
          {children}
        </StyledWindow>
      </Draggable>
    )
  }

  return (
    <StyledWindow
      open={open}
      contentWidth={contentWidth}
      contentHeight={contentHeight}
    >
      <WindowBar onClick={handleMinimize} />
      {children}
    </StyledWindow>
  )
}

export default Window
