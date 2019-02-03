/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html } from 'lit-element'

import '@things-shell/client-i18n'
import './property-animation'

import { PropertySharedStyle } from '../property-shared-style'

class PropertyAnimations extends LitElement {
  static get is() {
    return 'property-animations'
  }

  static get properties() {
    return {
      value: Object
    }
  }

  static get styles() {
    return [PropertySharedStyle]
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
      <fieldset>
        <legend><things-i18n-msg msgid="label.animation">animation</things-i18n-msg></legend>

        <property-animation value-key="oncreate" .value=${this.value.oncreate || {}}> </property-animation>
      </fieldset>
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

customElements.define(PropertyAnimations.is, PropertyAnimations)
