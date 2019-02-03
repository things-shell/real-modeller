/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html } from 'lit-element'

import '../../editors/things-i18n-msg'

class PropertyCamera extends LitElement {
  static get is() {
    return
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
    ]
  }

  render() {
    return html`
      <label> <things-i18n-msg msgid="label.far">far</things-i18n-msg> </label>
      <input type="number" value-key="far" .value=${this.value.far} placeholder="100000" />

      <label> <things-i18n-msg msgid="label.near">near</things-i18n-msg> </label>
      <input type="number" value-key="near" .value=${this.value.near} placeholder="1" />

      <label> <things-i18n-msg msgid="label.fov">fov</things-i18n-msg> </label>
      <input type="number" value-key="fov" .value=${this.value.fov} placeholder="80" />

      <label> <things-i18n-msg msgid="label.zoom">zoom</things-i18n-msg> </label>
      <input type="number" value-key="zoom" .value=${this.value.zoom} placeholder="1" />

      <input value-key="active" type="checkbox" ?checked=${this.value.active} />
      <label class="checkbox-label"> <things-i18n-msg msgid="label.active">active</things-i18n-msg> </label>
    `
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onValueChange.bind(this))
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

customElements.define('property-camera', PropertyCamera)
