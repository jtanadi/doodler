import React, { ReactElement } from "react"

import { StyledButton } from "./styles"

type PropTypes = {
  handleAdd(): void
}

const AddButton: React.FC<PropTypes> = ({ handleAdd }): ReactElement => {
  return <StyledButton onClick={handleAdd}>➕</StyledButton>
}

export default AddButton
