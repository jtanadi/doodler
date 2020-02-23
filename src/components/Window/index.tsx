import React, {
  useState,
  ReactElement,
  ReactNodeArray,
  ReactNode,
  MouseEvent,
} from "react"
import Draggable from "react-draggable"

import { StyledWindow } from "./styles"
import WindowBar from "../WindowBar"

type PropTypes = {
  id?: string
  children: ReactNodeArray | ReactNode
  useDraggable?: boolean
  contentWidth: number
  contentHeight: number
  top?: number
  left?: number
  handleClick?(ev: MouseEvent): void
  handleClose?(ev: MouseEvent): void
}

const Window: React.FC<PropTypes> = ({
  id,
  useDraggable,
  children,
  contentWidth,
  contentHeight,
  top,
  left,
  handleClick,
  handleClose,
}): ReactElement => {
  const [open, setOpen] = useState(true)
  const handleMinimize = (): void => setOpen(prevState => !prevState)

  if (useDraggable) {
    return (
      <Draggable handle=".palette-bar" bounds="body">
        <StyledWindow
          id={id}
          open={open}
          absolutePosition={true}
          contentWidth={contentWidth}
          contentHeight={contentHeight}
          onClick={handleClick}
          top={top}
          left={left}
        >
          <WindowBar
            closable
            handleMinimize={handleMinimize}
            handleClose={handleClose}
          />
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
      <WindowBar handleMinimize={handleMinimize} />
      {children}
    </StyledWindow>
  )
}

export default Window
