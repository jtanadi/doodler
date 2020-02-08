const tester = `
<?xml version="1.0" encoding="UTF-8" ?>
<svg width="391" height="391" viewBox="-70.5 -70.5 391 391" xmlns="http://www.w3.org/2000/svg">
  <rect x="25" y="25" width="200" height="200" fill="lime" stroke-width="4" stroke="pink" />
  <circle cx="125" cy="125" r="75" fill="orange" />
  <polyline points="50,150 50,200 200,200 200,100" stroke="red" stroke-width="4" fill="none" />
  <line x1="50" y1="50" x2="200" y2="200" stroke="blue" stroke-width="4" />
</svg>
`

export default function parseSVG(xmlString) {
  const svgObjects = removeHeaderFooter(xmlString)
  return svgToPaths(svgObjects)
}

function removeHeaderFooter(xml) {
  // Naive implementation...
  // Will probably only work with our own SVGs
  const xmlArr = xml.split("\n")
  return xmlArr.slice(2, xmlArr.length - 1)
}

function svgToPaths(svgs) {
  // svgs is an array
  // [<line.../>, <rect.../>, <ellipse.../>]
  return svgs.map(svg => {
    const path = new Path2D()
    const properties = svg.split(" ").filter(prop => {
      return (
        prop &&
        prop !== "/>" &&
        !prop.includes("stroke") &&
        !prop.includes("fill") &&
        !prop.includes("color")
      )
    })

    let shape = properties.shift()
    shape = shape.slice(1, shape.length)

    if (shape === "rect") {
      let [x, y, width, height] = properties
      x = getValue(x)
      y = getValue(y)
      width = getValue(width)
      height = getValue(height)

      path.rect(x, y, width, height)
    } else if (shape === "ellipse") {
      let [cx, cy, rx, ry] = properties
      cx = getValue(cx)
      cy = getValue(cy)
      rx = getValue(rx)
      ry = getValue(ry)

      path.ellipse(cx, cy, rx, ry)
    } else if (shape === "line") {
      let [x0, y0, x1, y1] = properties
      x0 = getValue(x0)
      y0 = getValue(y0)
      x1 = getValue(x1)
      y1 = getValue(y1)

      path.moveTo(x0, y0)
      path.lineTo(x1, y1)
    }
    return { path, svg }
  })
}

function getValue(property) {
  return parseInt(
    property
      .split("=")
      .pop()
      .split('"')[1]
  )
}
