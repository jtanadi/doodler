import React, { ReactElement, MouseEvent } from "react"
import { Bar, MinimizeButton, CloseButton } from "./styles"

type PropTypes = {
  closable?: boolean
  minimizable?: boolean
  handleMinimize(e: MouseEvent): void
  handleClose?(e: MouseEvent): void
}

const WindowBar: React.FC<PropTypes> = ({
  closable,
  minimizable,
  handleMinimize,
  handleClose,
}): ReactElement => {
  return (
    <Bar className="palette-bar">
      {minimizable && <MinimizeButton onClick={handleMinimize} />}
      {closable && <CloseButton onClick={handleClose} />}
    </Bar>
  )
}

export default WindowBar
