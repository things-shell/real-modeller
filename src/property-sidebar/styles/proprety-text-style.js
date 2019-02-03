/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'

import '@things-shell/client-i18n/src/things-i18n-msg'
import '../../editors/things-editor-buttons-radio'
import '../../editors/things-editor-color'

import { PropertySharedStyle } from '../property-shared-style'

class PropertyFontStyle extends LitElement {
  static get properties() {
    return {
      value: Object,
      fonts: Array
    }
  }

  static get styles() {
    return [
      PropertySharedStyle,
      css`
        .btn-group paper-button {
          width: 30px;
          height: 25px;
          min-width: initial;
          margin: 0 4px 0 0;
          padding: 0;
          border-radius: 0;
          display: inline-block;
          border-bottom: 2px solid #fff;

          background: url(./assets/images/icon-properties.png) no-repeat;
          background-size: 70%;
        }

        .btn-group paper-button.tbold {
          background-position: 50% -170px;
        }

        .btn-group paper-button.titalic {
          background-position: 50% -205px;
        }

        .btn-group paper-button.tunderline {
          background-position: 50% -240px;
        }

        .btn-group paper-button.tstrikethrough {
          background-position: 50% -415px;
        }

        .btn-group paper-button[active] {
          border-color: #f2471c;
        }
      `
    ]
  }

  constructor() {
    super()

    this.value = {}
    this.fonts = []
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onValueChange.bind(this))
  }

  render() {
    return html`
      <div class="property-grid">
        <label class="property-full-label">
          <things-i18n-msg msgid="label.font-family">Font Family</things-i18n-msg>
        </label>

        <select value-key="fontFamily" .value=${this.value.fontFamily} class="property-full-input">
          <option value=""></option>
          ${this.fonts.map(
            font => html`
              <option .value=${font.name}>${font.name}</option>
            `
          )}
        </select>

        <label class="property-half-label icon-only-label font-size"></label>
        <input type="number" value-key="fontSize" .value=${this.value.fontSize} class="property-half-input" />

        <label class="property-half-label icon-only-label lineHeight"></label>
        <input type="number" value-key="lineHeight" value=${this.value.lineHeight} class="property-half-input" />

        <label class="property-half-label icon-only-label color"></label>
        <things-editor-color value-key="fontColor" .value=${this.value.fontColor} class="property-half-input">
        </things-editor-color>

        <label class="property-half-label"></label>
        <div class="property-half-input btn-group">
          <paper-button toggles value-key="bold" ?active=${this.value.bold} class="tbold"> </paper-button>
          <paper-button toggles value-key="italic" ?active=${this.value.italic} class="titalic"> </paper-button>
        </div>
      </div>
    `
  }

  _onValueChange(e) {
    var element = e.target
    var key = element.getAttribute('value-key')

    if (!key) {
      return
    }

    var value = element.value

    switch (element.tagName) {
      case 'PAPER-BUTTON':
        value = element.active
        break
      case 'PAPER-LISTBOX':
        value = element.selected
        break
    }

    this.value = {
      ...this.value,
      [key]: value
    }

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }
}

window.customElements.define('property-font-style', PropertyFontStyle)
