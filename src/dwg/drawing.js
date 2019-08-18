import FixedCapStack from "./fixedCapStack.js";
import parseSVG from "./parseSVG.js"

// Private convenience functions (only available to this module)
// Not sure if a good idea to be here (vs. public methods)
const drawMethods = {
  line(x0, y0, x1, y1, pathToDraw) {
    pathToDraw.moveTo(x0, y0);
    pathToDraw.lineTo(x1, y1);
  },
  rect(x0, y0, x1, y1, pathToDraw) {
    const width = Math.abs(x1 - x0);
    const height = Math.abs(y1 - y0);

    // Recalculate dims so our SVGs don't have negative values
    x0 = (x0 > x1) ? x0 - width : x0;
    y0 = (y0 > y1) ? y0 - height : y0;

    pathToDraw.rect(x0, y0, width, height);
    return [x0, y0, width, height];
  },
  ellipse(x0, y0, x1, y1, pathToDraw) {
    const rx = Math.abs(x1 - x0) / 2
    const ry = Math.abs(y1 - y0) / 2
    const cx = (x1 > x0) ? x0 + rx : x0 - rx;
    const cy = (y1 > y0) ? y0 + ry : y0 - ry;

    pathToDraw.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);

    return [cx, cy, rx, ry];
  }
}

export default class Drawing {
  constructor(canvas) {
    this.canvas = canvas;

    try {
      this.context = this.canvas.getContext("2d");
      this.context.translate(0.5, 0.5);
    } catch (e) {
      console.err(e);
    }

    // Keep a shapes stack because they have to be redrawn often
    // (so they appear persistent) and so we can save an SVG file later
    this.shapes = [];

    this.history = new FixedCapStack(10);
  }

  clear() {
    // Clear context by drawing a clearRect the size of the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawMarquee(x0, y0, x1, y1, mode) {
    // Draw marquee by clearing context and drawing a shape
    // from (x0, y0) (top left) to (x1, y1) (bottom right)

    // Draw all shapes so they appear persistent
    this.drawShapes();

    const path = new Path2D();
    if (mode === "rect") {
      drawMethods.rect(x0, y0, x1, y1, path);
    } else if (mode === "circ") {
      drawMethods.ellipse(x0, y0, x1, y1, path);
    } else if (mode === "line") {
      drawMethods.line(x0, y0, x1, y1, path);
    }

    // Draw marquee
    this.context.stroke(path);
  }

  createShape(x0, y0, x1, y1, mode, stroke="black", fill="none") {
    // Create shape by making a new Path2D object
    // Shape objects (path and SVG data) are saved in `this.shapes` stack and redrawn at every turn
    // x0, y0 is top left corner; x1, y1 is bottom right corner

    let svg;
    const path = new Path2D();
    if (mode === "rect") {
      const [x, y, width, height] = drawMethods.rect(x0, y0, x1, y1, path);
      svg = `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="${stroke}" fill="${fill}"/>`;
    } else if (mode === "circ") {
      const [cx, cy, rx, ry] = drawMethods.ellipse(x0, y0, x1, y1, path);
      svg = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" stroke="${stroke}" fill="${fill}"/>`
    } else if (mode === "line") {
      drawMethods.line(x0, y0, x1, y1, path);
      svg = `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="${stroke}" fill="none"/>`;
    }

    this.shapes.push({ path, svg });
    this.drawShapes();
    this.history.clear();
  }

  drawShapes() {
    this.clear();
    this.shapes.forEach(shape => this.context.stroke(shape.path));
  }

  load(svg) {
    this.shapes = parseSVG(svg);
    this.drawShapes();
  }

  save() {
    let xml = `<?xml version="1.0" encoding="UTF-8" ?>\n<svg width="${this.canvas.width}" height="${this.canvas.height}" xmlns="http://www.w3.org/2000/svg">\n`

    xml += this.shapes.map(shape => `  ${shape.svg}`).join("\n")
    xml += "\n</svg>"

    console.log(xml)
  }

  undo() {
    const shapeToStore = this.shapes.pop()
    if (!shapeToStore) return;

    // If we're at capacity, `this.history` stack will return
    // the item we're trying to push; when that happens,
    // push that back onto our `this.shapes` array (ie. don't undo)
    const shapeReturned = this.history.push(shapeToStore);
    if (shapeReturned) this.shapes.push(shapeReturned);
    this.drawShapes();
  }

  redo() {
    const shapeToRedraw = this.history.pop();
    if (!shapeToRedraw) return;
    this.shapes.push(shapeToRedraw);
    this.drawShapes();
  }
}
