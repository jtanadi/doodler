# doodler

Doodler is a small drawing app written in TypeScript. The app uses the [Gambar](https://github.com/jtanadi/gambar) library instead of interacting directly with the Canvas API. It's very much still a work-in-progres...

![screenshot](./docs/doodler2.png)

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
