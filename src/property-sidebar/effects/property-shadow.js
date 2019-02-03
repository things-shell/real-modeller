/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'

import '@things-shell/client-i18n'
import '../../editors/things-editor-color'

/**
 * 컴포넌트의 그림자 속성을 편집하는 element
 *
 * Example:
 *  <property-shadow
 *    @change="${e => { this.shadow = e.target.value }}"
 *    value="${this.shadow}"
 *  ></property-shadow>
 */

export default class PropertyShadow extends LitElement {
  static get is() {
    return 'property-shadow'
  }

  static get properties() {
    return {
      value: Object
    }
  }

  static get styles() {
    return [
      css`
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

        :host > input[type='number'],
        :host > things-editor-color {
          grid-column: span 7;
        }

        paper-radio-button {
          padding: 2px 1px 10px 7px !important;
        }

        .icon-only-label {
          background: url(./assets/images/icon-properties-label.png) no-repeat;
          width: 30px;
          height: 24px;
          float: left;
          margin-top: 2px;
          margin-left: 40px;
        }

        .icon-only-label.color {
          background-position: 70% -498px;
        }
      `
    ]
  }

  constructor() {
    super()

    this.value = {}
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onValueChange.bind(this))
  }

  render() {
    return html`
      <label> <things-i18n-msg msgid="label.shadowOffsetX">offset-X</things-i18n-msg> </label>

      <input type="number" value-key="left" .value=${this.value.left} />

      <label> <things-i18n-msg msgid="label.shadowOffsetY">offset-Y</things-i18n-msg> </label>

      <input type="number" value-key="top" .value=${this.value.top} />

      <label> <things-i18n-msg msgid="label.shadowSize">Size</things-i18n-msg> </label>

      <input type="number" value-key="blurSize" .value=${this.value.blurSize} />

      <label class="icon-only-label color"></label>

      <things-editor-color value-key="color" .value=${this.value.color}> </things-editor-color>
    `
  }

  _onValueChange(e) {
    var element = e.target
    var key = element.getAttribute('value-key')

    if (!key) {
      return
    }

    var value

    switch (element.tagName) {
      case 'THINGS-EDITOR-ANGLE-INPUT':
        value = Number(element.radian) || 0
        break

      case 'INPUT':
        switch (element.type) {
          case 'checkbox':
            value = element.checked
            break
          case 'number':
            value = Number(element.value) || 0
            break
          case 'text':
            value = String(element.value)
        }
        break

      case 'PAPER-BUTTON':
        value = element.active
        break

      case 'PAPER-LISTBOX':
        value = element.selected
        break

      default:
        value = element.value
        break
    }

    this.value = {
      ...this.value,
      [key]: value
    }

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }
}

customElements.define(PropertyShadow.is, PropertyShadow)
