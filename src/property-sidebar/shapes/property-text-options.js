/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'

import '@things-shell/client-i18n/src/things-i18n-msg'
import '../../editors/things-editor-buttons-radio'

import { PropertySharedStyle } from '../property-shared-style'

class PropertyTextOptions extends LitElement {
  constructor() {
    super()

    this.value = {}
  }

  static get properties() {
    return {
      value: Object
    }
  }

  static get styles() {
    return [
      PropertySharedStyle,
      css`
        things-editor-buttons-radio paper-button {
          background: url(./assets/images/icon-properties.png) no-repeat;
        }

        things-editor-buttons-radio paper-button[data-value='left'] {
          background-position: 50% 3px;
        }

        things-editor-buttons-radio paper-button[data-value='center'] {
          background-position: 50% -47px;
        }

        things-editor-buttons-radio paper-button[data-value='right'] {
          background-position: 50% -97px;
        }

        things-editor-buttons-radio paper-button[data-value='justify'] {
          background-position: 50% -147px;
        }

        things-editor-buttons-radio paper-button[data-value='top'] {
          background-position: 50% -197px;
        }

        things-editor-buttons-radio paper-button[data-value='middle'] {
          background-position: 50% -193px;
        }

        things-editor-buttons-radio paper-button[data-value='bottom'] {
          background-position: 50% -188px;
        }

        things-editor-buttons-radio paper-button[active] {
          border-color: #f2471c;
        }

        .box-padding {
          width: 100%;
        }

        .box-padding td {
          background: url(./assets/images/icon-properties-padding.png) 50% 0 no-repeat;
        }

        .box-padding tr:nth-child(1),
        .box-padding tr:nth-child(3) {
          height: 20px;
        }

        .box-padding tr td:nth-child(1),
        .box-padding tr td:nth-child(3) {
          width: 18px;
        }

        .box-padding .slide1 {
          background-position: 0 0;
        }

        .box-padding .slide2 {
          background-position: 50% -40px;
          background-color: rgba(69, 46, 41, 0.2);
        }

        .box-padding .slide3 {
          background-position: 100% -440px;
        }

        .box-padding .slide4 {
          background-position: 0 -360px;
          background-color: rgba(69, 46, 41, 0.2);
        }

        .box-padding .slide5 {
          background: none;
          text-align: center;
        }

        .box-padding .slide6 {
          background-position: 100% -160px;
          background-color: rgba(69, 46, 41, 0.2);
        }

        .box-padding .slide7 {
          background-position: 0 100%;
        }

        .box-padding .slide8 {
          background-position: 50% -320px;
          background-color: rgba(69, 46, 41, 0.2);
        }

        .box-padding .slide9 {
          background-position: 0 0px;
        }

        .box-padding input {
          background-color: transparent;
          width: 35px;
          margin: 0px;
          padding: 0px;
          clear: both;
          float: initial;
          border: 1px solid #fff;
          border-width: 0 0 1px 0;
          text-align: right;
          font-size: 14px;
        }

        .slide5 input:nth-child(1),
        .slide5 input:nth-child(4) {
          display: block;
          margin: auto;
        }

        .slide5 input:nth-child(2) {
          float: left;
        }

        .slide5 input:nth-child(3) {
          float: right;
          margin-top: -25px;
        }

        .slide5 input:nth-child(4) {
          margin-top: -5px;
        }
      `
    ]
  }

  render() {
    return html`
      <div class="property-grid">
        <label> <things-i18n-msg msgid="label.text">Text</things-i18n-msg> </label>
        <input value-key="text" .value=${this.value.text || ''} />
        <label> <things-i18n-msg msgid="label.text-format">Text Format</things-i18n-msg> </label>
        <input value-key="textFormat" .value=${this.value.textFormat || ''} list="format-list" />
        <datalist id="format-list">
          <option value="#,###."> </option>
          <option value="#,###.#"> </option>
          <option value="#,###.0"> </option>
          <option value="#,##0.#"> </option>
          <option value="#,##0.0"> </option>
          <option value="#,##0.0%"> </option>
        </datalist>

        <label> <things-i18n-msg msgid="label.horizontal">horizontal</things-i18n-msg> </label>
        <things-editor-buttons-radio value-key="textAlign" .value=${this.value.textAlign}>
          <paper-button data-value="left"></paper-button>
          <paper-button data-value="center"></paper-button>
          <paper-button data-value="right"></paper-button>
          <paper-button data-value="justify"></paper-button>
        </things-editor-buttons-radio>

        <label> <things-i18n-msg msgid="label.vertical">vertical</things-i18n-msg> </label>
        <things-editor-buttons-radio value-key="textBaseline" .value=${this.value.textBaseline}>
          <paper-button data-value="top"></paper-button>
          <paper-button data-value="middle"></paper-button>
          <paper-button data-value="bottom"></paper-button>
        </things-editor-buttons-radio>

        <div class="checkbox-row">
          <input type="checkbox" value-key="textWrap" ?checked=${this.value.textWrap} />
          <label> <things-i18n-msg msgid="label.text-wrap">Text Wrap</things-i18n-msg> </label>
        </div>

        <label> <things-i18n-msg msgid="label.padding">padding</things-i18n-msg> </label>
        <table class="box-padding">
          <tr>
            <td class="slide1"></td>
            <td class="slide2"></td>
            <td class="slide3"></td>
          </tr>
          <tr>
            <td class="slide4"></td>
            <td class="slide5">
              <input type="number" value-key="paddingTop" .value=${this.value.paddingTop} />
              <input type="number" value-key="paddingLeft" .value=${this.value.paddingLeft} />
              <input type="number" value-key="paddingRight" .value=${this.value.paddingRight} />
              <input type="number" value-key="paddingBottom" .value=${this.value.paddingBottom} />
            </td>
            <td class="slide6"></td>
          </tr>
          <tr>
            <td class="slide7"></td>
            <td class="slide8"></td>
            <td class="slide9"></td>
          </tr>
        </table>
      </div>
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

customElements.define('property-text-options', PropertyTextOptions)
