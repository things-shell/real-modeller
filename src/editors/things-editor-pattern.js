/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'

import '@things-shell/client-i18n'

/**
 * 컴포넌트의 fill pattern을 편집하는 element
 *
 * Example:
 *  <things-editor-pattern
 *    @change="${e => { this.pattern = e.target.value }}"
 *    .value=${this.pattern}"
 *  ></things-editor-pattern>
 */

export default class ThingsEditorPattern extends LitElement {
  static get is() {
    return 'things-editor-pattern'
  }

  static get properties() {
    return {
      value: Object
    }
  }

  static get styles() {
    return [
      css`
        :host,
        .grid-10 {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-gap: 5px;
          grid-auto-rows: minmax(24px, auto);
        }

        :host > * {
          line-height: 1.5;
        }

        :host > label {
          grid-column: span 2;
          text-align: right;
          text-transform: capitalize;
        }

        :host > select,
        :host > input {
          grid-column: span 8;
        }

        .grid-10 > input[type='checkbox'] {
          grid-column: 3 / 4;
        }

        .grid-10 > input[type='checkbox'] ~ label {
          grid-column: span 7;
          text-align: left;
        }

        :host > .grid-10 {
          grid-column: span 10;
        }

        .grid-10 > input[type='number'] {
          grid-column: span 3;
        }

        .grid-10 > label {
          grid-column: span 2;
          text-align: right;
        }
      `
    ]
  }

  render() {
    return html`
      <label> <things-i18n-msg msgid="label.image" auto="">image</things-i18n-msg> </label>

      <input value-key="image" type="text" .value=${(this.value && this.value.image) || ''} />

      <label> <things-i18n-msg msgid="label.align" auto="">align</things-i18n-msg> </label>

      <select value-key="align" class="select-content" .value=${this.value && this.value.align}>
        <option value="left-top">Left Top</option>
        <option value="top">Top</option>
        <option value="right-top">Right Top</option>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
        <option value="left-bottom">Left Bottom</option>
        <option value="bottom">Bottom</option>
        <option value="right-bottom">Right Bottom</option>
      </select>

      <div class="grid-10">
        <label> <things-i18n-msg msgid="label.offset-x" auto="">offsetX</things-i18n-msg> </label>
        <input type="number" value-key="offsetX" .value=${this.value && this.value.offsetX} />

        <label> <things-i18n-msg msgid="label.offset-y" auto="">offsetY</things-i18n-msg> </label>
        <input type="number" value-key="offsetY" .value=${this.value && this.value.offsetY} />

        <label> <things-i18n-msg msgid="label.width" auto="">width</things-i18n-msg> </label>
        <input type="number" value-key="width" .value=${this.value && this.value.width} />

        <label> <things-i18n-msg msgid="label.height" auto="">height</things-i18n-msg> </label>
        <input type="number" value-key="height" .value=${this.value && this.value.height} />
      </div>

      <div class="grid-10">
        <input value-key="fitPattern" type="checkbox" ?checked=${this.value && this.value.fitPattern} required />
        <label> <things-i18n-msg msgid="label.fit" auto="">Fit</things-i18n-msg> </label>
      </div>
    `
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onChange.bind(this))
  }

  _onChange(e) {
    var element = e.target
    var key = element.getAttribute('value-key')
    var value = element.value

    if (key == 'fitPattern') {
      value = element.checked
    }

    this.value = {
      ...this.value,
      [key]: value
    }

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }
}

customElements.define(ThingsEditorPattern.is, ThingsEditorPattern)
