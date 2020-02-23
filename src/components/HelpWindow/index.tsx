import React, { ReactElement, useState, useEffect } from "react"

import Window from "../Window"
import { TopDiv, HelpCover, TextDiv, HR, H1, H2, P, Code, A } from "./styles"

const CONTENT_WIDTH = 400
const CONTENT_HEIGHT = 640

type PropTypes = {
  handleClose(): void
}

const HelpWindow: React.FC<PropTypes> = ({ handleClose }): ReactElement => {
  const [windowTop, setWindowTop] = useState(
    window.innerHeight / 2 / 16 - CONTENT_HEIGHT / 2 / 16 - 2
  )
  const [windowLeft, setWindowLeft] = useState(
    window.innerWidth / 2 / 16 - CONTENT_WIDTH / 2 / 16
  )

  const handleResize = (): void => {
    setWindowTop(window.innerHeight / 2 / 16 - CONTENT_HEIGHT / 2 / 16 - 2)
    setWindowLeft(window.innerWidth / 2 / 16 - CONTENT_WIDTH / 2 / 16)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return (): void => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <TopDiv>
        <Window
          useDraggable
          contentWidth={CONTENT_WIDTH / 16}
          contentHeight={CONTENT_HEIGHT / 16}
          top={windowTop}
          left={windowLeft}
          handleClose={handleClose}
        >
          <TextDiv height={CONTENT_HEIGHT}>
            <H1>doodler</H1>
            <P>
              A small multi-window drawing app written in TypeScript. The app
              uses the{" "}
              <A
                href="https://github.com/jtanadi/gambar"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gambar
              </A>{" "}
              library instead of interacting directly with the Canvas API.
            </P>
            <P>
              Doodler is a work-in-progress written by{" "}
              <A
                href="https://dev.jesentanadi.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jesen Tanadi
              </A>{" "}
              and is open sourced on{" "}
              <A
                href="https://github.com/jtanadi/doodler/"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </A>
              .
            </P>
            <HR />
            <H2>shortcuts</H2>
            <P>
              <Code>n</Code> - Create new drawing
            </P>
            <P>
              <Code>u</Code> - Undo
            </P>
            <P>
              <Code>r</Code> - Redo
            </P>
            <P>
              <Code>[</Code> - Move layer backward
            </P>
            <P>
              <Code>]</Code> - Move layer forward
            </P>
            <P>
              <Code>1</Code> - Selection Tool
            </P>
            <P>
              <Code>2</Code> - Rectangle Tool
            </P>
            <P>
              <Code>3</Code> - Ellipse Tool
            </P>
            <P>
              <Code>4</Code> - Diamond Tool
            </P>
            <P>
              <Code>5</Code> - Line Tool
            </P>
            <P>
              <Code>6</Code> - Polyline Tool
            </P>
          </TextDiv>
        </Window>
      </TopDiv>
      <HelpCover onClick={handleClose} />
    </>
  )
}

export default HelpWindow
