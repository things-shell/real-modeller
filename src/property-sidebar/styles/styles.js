/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'

import '@things-shell/client-i18n/src/things-i18n-msg'
import '../../editors/things-editor-color-style'

import './property-line-style'
import './proprety-text-style'

import { PropertySharedStyle } from '../property-shared-style'

class PropertyStyles extends LitElement {
  constructor() {
    super()

    this.value = {}
    this.selected = []
    this.fonts = []
  }

  static get properties() {
    return {
      value: Object,
      selected: Array,
      fonts: Array
    }
  }

  static get styles() {
    return [
      PropertySharedStyle,
      css`
        paper-slider {
          width: 100%;
        }
      `
    ]
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onValueChange.bind(this))
  }

  render() {
    return html`
      <fieldset>
        <legend><things-i18n-msg msgid="label.opacity">opacity</things-i18n-msg></legend>
        <paper-slider min="0" max="1" step="0.1" value-key="alpha" .value=${this.value.alpha || 1} editable>
        </paper-slider>
      </fieldset>

      <fieldset>
        <legend><things-i18n-msg msgid="label.text-style">text style</things-i18n-msg></legend>

        <property-font-style value-key="textStyle" .value=${this.value.textStyle || {}} .fonts=${this.fonts}>
        </property-font-style>
      </fieldset>

      <fieldset>
        <legend><things-i18n-msg msgid="label.fill-style">fill style</things-i18n-msg></legend>
        <things-editor-color-style value-key="fillStyle" .value=${this.value.fillStyle}> </things-editor-color-style>
      </fieldset>

      <fieldset>
        <legend><things-i18n-msg msgid="label.line-style">line style</things-i18n-msg></legend>

        <property-line-style value-key="lineStyle" .value=${this.value.lineStyle || {}}> </property-line-style>
      </fieldset>
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

    this.dispatchEvent(
      new CustomEvent('property-change', {
        bubbles: true,
        composed: true,
        detail: {
          [key]: value
        }
      })
    )
  }
}

window.customElements.define('property-style', PropertyStyles)
