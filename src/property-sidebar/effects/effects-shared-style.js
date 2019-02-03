/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { css } from 'lit-element'

export const EffectsSharedStyle = css`
  :host {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 5px;
    grid-auto-rows: minmax(24px, auto);
  }

  :host > * {
    line-height: 1.5;
  }

  :host > label {
    grid-column: span 3;
    text-align: right;
    text-transform: capitalize;
  }

  :host > input,
  :host > select,
  :host > things-editor-angle-input,
  :host > things-editor-color {
    grid-column: span 7;
  }

  :host > input[type='checkbox'] {
    grid-column: 4 / 5;
  }

  :host > label.checkbox-label {
    grid-column: span 6;
    text-align: left;
  }
`
