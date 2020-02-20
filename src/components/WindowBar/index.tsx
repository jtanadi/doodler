import React, { ReactElement, MouseEvent } from "react"
import { Bar, MinimizeButton, CloseButton } from "./styles"

type PropTypes = {
  closable?: boolean
  handleMinimize(e: MouseEvent): void
  handleClose?(e: MouseEvent): void
}

const WindowBar: React.FC<PropTypes> = ({
  closable,
  handleMinimize,
  handleClose,
}): ReactElement => {
  return (
    <Bar className="palette-bar">
      <MinimizeButton onClick={handleMinimize} />
      {closable ? <CloseButton onClick={handleClose} /> : null}
    </Bar>
  )
}

export default WindowBar
