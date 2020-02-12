import React, { useState, ReactElement, ReactNodeArray, ReactNode } from "react"
import Draggable from "react-draggable"

import { StyledWindow } from "./styles"
import WindowBar from "../WindowBar"

type PropTypes = {
  children: ReactNodeArray | ReactNode
  useDraggable: boolean
  contentWidth: number
  contentHeight: number
  top?: number
  left?: number
  current?: boolean
  handleClick?(): void
}

const Window: React.FC<PropTypes> = ({
  useDraggable,
  children,
  contentWidth,
  contentHeight,
  top,
  left,
  current,
  handleClick,
}): ReactElement => {
  const [open, setOpen] = useState(true)
  const handleMinimize = (): void => setOpen(prevState => !prevState)

  if (useDraggable) {
    return (
      <Draggable handle=".palette-bar" bounds="body">
        <StyledWindow
          open={open}
          absolutePosition={true}
          contentWidth={contentWidth}
          contentHeight={contentHeight}
          onClick={handleClick}
          top={top}
          left={left}
          current={current}
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
