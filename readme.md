# doodler
Doodler is a small drawing app that implements the Canvas API. It's very much still a work-in-progres...

![screenshot](./docs/doodler.png)


### Dev Notes
- Data model, so app state can be saved and loaded from localStorage:
```
{
    appName: string,
    version: string,
    savedDate: number,
    palette: {
        positionX: number,
        positionY: number,
        minimized: boolean
    },
    drawingObjects: [
        {
            shape: string,
            coordinates: [[x1, y1], [x2, y2], ...]
        },
        {
            shape: string,
            coordinates: [[x1, y1], [x2, y2], ...]
        }
    ]
}
```
- History function should `pop()` and `push()` from the `drawingObjects` stack, so we can undo and redo the brush tool per element, instead of one line at a time (current bug)
    - The `drawingObjects` stack will also help with layering
- Switching layer order:
```javascript
// drawingObjects is a stack where the last item is the top-most layer

function pushForward(layerIndices) {
    // if layerIndices = [2, 4, 5]
    // [a, b, X, c, Y, Z, d] => [a, b, c, X, d, Y, Z]
    //  0  1  2  3  4  5  6  =>  0  1  2  3  4  5  6

    // gotta traverse backwards... sneaky
    for (let i = layerIndices.length - 1; i >= 0; i--) {
        // top-most object can't be pushed any more forward
        if (i < drawingObjects.length - 1) {
            drawingObjects.swap(layerIndices[i], layerIndices[i + 1])
        }
    }
}

function pushBack(layerIndices) {
    // if layerIndices = [2, 4, 5]
    // [a, b, X, c, Y, Z, d] => [a, X, b, X, Z, c, d]
    //  0  1  2  3  4  5  6  =>  0  1  2  3  4  5  6

    for (const i of layerIndices) {
        // bottom-most object can't be pushed any more backward
        if (i > 0) {
            drawingObjects.swap(i, i - 1)
        }
    }
}
```
