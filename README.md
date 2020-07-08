# ClearBitLogo

The ClearBitLogo component outputs the corresponding company logo for a given field. The component searches for a suitable Company logo from those available using the Clearbit logo API which allows you to quickly lookup company logos using just their domain. If the component finds no suitable logo, it instead outputs a generic one.

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/clear-bit-logo
```

2. Use the Component or extend it

Typescript:

```javascript
import { ClearBitLogo, IClearBitLogoOptions } from '@coveops/clear-bit-logo';
```

Javascript

```javascript
const ClearBitLogo = require('@coveops/clear-bit-logo').ClearBitLogo;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/clear-bit-logo'
```

4. Include the component in your template as follows:

Add the following markup to your result template:

```html
<div class="CoveoClearBitLogo" data-field="@myfield"></div>
```

## Options

The following options can be configured:

| Option  | Required |  Type  | Default |                                 Notes                                  |
| ------- | -------- | ------ | ------- | ---------------------------------------------------------------------- |
| `field` | Yes      | field  | ` `     | Specifies the field to extract the company domain (often we use urls ) |
| `size`  | No       | number | `65`    | Specifies the size of the company logo                                 |
          

## Extending

Extending the component can be done as follows:

```javascript
import { ClearBitLogo, IClearBitLogoOptions } from "@coveops/clear-bit-logo";

export interface IExtendedClearBitLogoOptions extends IClearBitLogoOptions {}

export class ExtendedClearBitLogo extends ClearBitLogo {}
```

## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`