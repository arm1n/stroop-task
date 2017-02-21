# StroopTask

This Angular 2 component implements the modified stroop task, which presents 24 words (8 related, 16 unrelated) to user in two colors (blue, red). The user has then to choose the current color of the given random word by pressing the key strokes (j=blue, k=red), which will be described in advance. Purpose of the component is to measure the user's reaction time for choosing the color via pressing a key.

## Prerequisites

You need [Angular CLI](https://cli.angular.io/) to run application locally and create a build for production. Angular CLI depends on [NodeJS](https://nodejs.org/en/download/) >= 4 and [NPM](https://www.npmjs.com/) >= 3. Simply [download and install NodeJS](https://nodejs.org/en/download/) if you haven't got it already. You can verify it by typing the following commands into your terminal:
- `node -v`
- `npm -v`

## Run
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Integration
After you have built the application you can refer to the contained `index.html` of `dist/` folder for an example of how to include the assets. The component itself can be simply included by:

```html
<stroop-task config='{ "configKey": "configValue" }'>
    Loading task...
</stroop-task>
```

Please note that you must provide a *valid* JSON-String if you want to configure the component. The following settings are possible showing also the defaults:

```js
{
    "rounds": 2,
    "countDown": 10,
    "randomMean": 1000,
    "randomStdDev": 250,
    "hiddenInputName": "results",
    "finishHTML": "<strong>Finished!</strong>",
    "colors": [
      { "value": "BLUE", "keyCode": 74 },
      { "value": "RED", "keyCode": 75 },
    ],
    "words": [
      { "value": "Google", "type": "RELATED" },
      { "value": "Yahoo", "type": "RELATED" },
      { "value": "screen", "type": "RELATED" },
      { "value": "browser", "type": "RELATED" },
      { "value": "modem", "type": "RELATED" },
      { "value": "keys", "type": "RELATED" },
      { "value": "internet", "type": "RELATED" },
      { "value": "computer", "type": "RELATED" },
      { "value": "Target", "type": "UNRELATED" },
      { "value": "Nike", "type": "UNRELATED" },
      { "value": "Coca Cola", "type": "UNRELATED" },
      { "value": "Yoplait", "type": "UNRELATED" },
      { "value": "table", "type": "UNRELATED" },
      { "value": "telephone", "type": "UNRELATED" },
      { "value": "book", "type": "UNRELATED" },
      { "value": "hammer", "type": "UNRELATED" },
      { "value": "nails", "type": "UNRELATED" },
      { "value": "chair", "type": "UNRELATED" },
      { "value": "piano", "type": "UNRELATED" },
      { "value": "pencil", "type": "UNRELATED" },
      { "value": "paper", "type": "UNRELATED" },
      { "value": "eraser", "type": "UNRELATED" },
      { "value": "laser", "type": "UNRELATED" },
      { "value": "television", "type": "UNRELATED" },
    ]
}
```
