import React, { ReactElement } from "react"

import { StyledContainer } from "./styles"

type PropType = {
  children: ReactElement
}
const ToolButtonsContainer: React.FC<PropType> = ({
  children,
}): ReactElement => {
  return <StyledContainer>{children}</StyledContainer>
}

export default ToolButtonsContainer
