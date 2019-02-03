/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html } from 'lit-element'
import { property } from '@things-shell/client-utils'

import '@things-shell/client-i18n/src/things-i18n-msg'
import '../../editors/things-editor-buttons-radio'
import '../../editors/things-editor-angle-input'
import '../../editors/things-editor-3dish'

import './property-text-options'

import { PropertySharedStyle } from '../property-shared-style'

class PropertyShapes extends LitElement {
  static get properties() {
    return {
      value: Object,
      selected: Array
    }
  }

  static get styles() {
    return [PropertySharedStyle]
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onValueChange.bind(this))
  }

  render() {
    return html`
      <fieldset>
        <div class="property-grid">
          ${this._isIdentifiable(this.selected)
            ? html`
                <label> <things-i18n-msg msgid="label.id">ID</things-i18n-msg> </label>
                <input value-key="id" .value=${this.value.id || ''} />
              `
            : html``}
          ${this._isClassIdentifiable(this.selected)
            ? html`
                <label> <things-i18n-msg msgid="label.class">Class</things-i18n-msg> </label>
                <input value-key="class" .value=${this.value.class || ''} />
              `
            : html``}
          ${this._hasProperties(this.selected)
            ? html`
                <div class="checkbox-row">
                  <input value-key="hidden" type="checkbox" ?checked=${this.value.hidden} />
                  <label> <things-i18n-msg msgid="label.item-hidden">Item Hidden</things-i18n-msg> </label>

                  <input value-key="locked" type="checkbox" ?checked=${this.value.locked} />
                  <label> <things-i18n-msg msgid="label.locked">Locked</things-i18n-msg> </label>
                </div>
              `
            : html``}
        </div>
      </fieldset>

      ${this._isRoot(this.selected)
        ? html`
            <fieldset>
              <legend><things-i18n-msg msgid="label.size">size</things-i18n-msg></legend>

              <div class="property-grid">
                <label class="width"> <things-i18n-msg msgid="label.width">width</things-i18n-msg> </label>
                <input type="number" value-key="width" .value=${this.value.width} />
                <label class="height"> <things-i18n-msg msgid="label.height">height</things-i18n-msg> </label>
                <input type="number" value-key="height" .value=${this.value.height} />
              </div>
            </fieldset>
          `
        : html``}
      ${this._is3dish(this.selected)
        ? html`
            <fieldset>
              <legend><things-i18n-msg msgid="label.3dish">3D</things-i18n-msg></legend>

              <things-editor-3dish
                .translatex=${this.value.translate}
                @translate-changed="${e => this._on3dishChange(e)}"
                .rotate=${this.value.rotate}
                @rotate-changed="${e => this._on3dishChange(e)}"
                .scale=${this.value.scale}
                @scale-changed="${e => this._on3dishChange(e)}"
                .dimension=${this.value.dimension}
                @dimension-changed="${e => this._on3dishChange(e)}"
              >
              </things-editor-3dish>
            </fieldset>
          `
        : html``}
      ${this._hasTextProperty(this.selected)
        ? html`
            <fieldset>
              <legend><things-i18n-msg msgid="label.text">text</things-i18n-msg></legend>

              <property-text-options value-key="textOptions" .value=${this.value.textOptions || {}}>
              </property-text-options>
            </fieldset>
          `
        : html``}
    `
  }

  _on3dishChange(e) {
    var key = e.type.slice(0, -8)

    this.dispatchEvent(
      new CustomEvent('property-change', {
        bubbles: true,
        composed: true,
        detail: {
          [key]: e.detail.value
        }
      })
    )
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

  _hasTextProperty(selected) {
    if (selected.length == 0) return false

    for (let i = 0; i < selected.length; i++) {
      if (!selected[i].hasTextProperty) return false
    }

    return true
  }

  _hasProperties(selected) {
    return selected && selected[0]
  }

  _isIdentifiable(selected) {
    return selected && selected[0]
  }

  _isClassIdentifiable(selected) {
    if (!selected) return false

    return true
  }

  _isRoot(selected) {
    return selected.length == 0
  }

  _is3dish(selected) {
    return selected && selected[0]
  }
}

customElements.define('property-shape', PropertyShapes)
