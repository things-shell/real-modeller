/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'

import '../../editors/things-editor-color'

/**
map value editor element

Example:

  <data-binding-value-map value=${map}
                          keytype=${keytype}
                          valuetype=${valuetype}>
  </data-binding-value-map>
*/
export default class DataBindingValueMap extends LitElement {
  static get is() {
    return 'data-binding-value-map'
  }

  static get properties() {
    return {
      value: Object,
      valuetype: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          width: 94%;
          overflow: hidden;
          clear: both;
          margin: -7px 0 7px 7px;
          border: 1px solid #ccc;
        }

        * {
          float: left;
        }

        input,
        things-editor-color {
          width: 41%;
          margin: 3px 0 3px 3px;
        }

        things-editor-color {
          border-radius: 0;
          margin-bottom: 0;
          padding: 1px 3px 1px 3px;
          font-size: 12px;

          --things-editor-color-input-color: {
            margin: 2px;
          }
          --things-editor-color-input-span: {
            width: 12px;
            height: 12px;
          }
        }

        input[type='checkbox'] {
          width: initial !important;
          margin-top: 6px;
        }

        div {
          border-bottom: 1px solid #c0c0c0;
          width: 100%;
        }

        div:last-child {
          border-bottom: none;
        }
      `
    ]
  }

  constructor() {
    super()
    this.value = {}
    this.valuetype = 'string'
    this.keytype = 'string'
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onChange.bind(this))
  }

  render() {
    return html`
      ${
        this._toArray(this.value).map(
          item => html`
            <div data-record>
              <input type="text" data-key placeholder="key" .value=${item.key} /> ${
                this.valuetype == 'boolean'
                  ? html`
                      <input type="checkbox" data-value ?checked=${item.value} data-value-type=${this.valuetype} />
                    `
                  : this.valuetype == 'color'
                  ? html`
                      <things-editor-color data-value .value=${item.value} tabindex="-1"> </things-editor-color>
                    `
                  : html`
                      <input
                        type="text"
                        data-value
                        placeholder="value"
                        .value=${item.value}
                        data-value-type=${this.valuetype}
                      />
                    `
              } <button class="record-action" @click=${e => this._delete(e)} tabindex="-1">-</button>
            </div>
          `
        )
      }

      <div data-record-new>
        <input type="text" data-key placeholder="key" value="" /> ${
          this.valuetype == 'boolean'
            ? html`
                <input type="checkbox" data-value data-value-type=${this.valuetype} />
              `
            : this.valuetype == 'color'
            ? html`
                <things-editor-color data-value value="" tabindex="-1" placeholder="value"> </things-editor-color>
              `
            : html`
                <input type="text" data-value placeholder="value" value="" data-value-type=${this.valuetype} />
              `
        } <button class="record-action" @click=${e => this._add(e)} tabindex="-1">+</button>
      </div>

      <div data-record>
        <input type="text" data-key .value="default" disabled /> ${
          this.valuetype == 'boolean'
            ? html`
                <input
                  type="checkbox"
                  data-value
                  ?checked=${this.value && this.value.default}
                  data-value-type=${this.valuetype}
                />
              `
            : this.valuetype == 'color'
            ? html`
                <things-editor-color
                  data-value
                  .value=${(this.value && this.value.default) || ''}
                  placeholder="value"
                  tabindex="-1"
                >
                </things-editor-color>
              `
            : html`
                <input
                  type="text"
                  data-value
                  placeholder="value"
                  .value=${(this.value && this.value.default) || ''}
                  data-value-type=${this.valuetype}
                />
              `
        } <button class="record-action" @click=${e => this._sort(e)} tabindex="-1">&gt;</button>
      </div>
    `
  }

  _defaultValue(type) {
    switch (type || this.valuetype) {
      case 'color':
        return '#000000'
      case 'boolean':
      case 'checkbox':
        return false
      default:
        return ''
    }
  }

  _onChange(e) {
    if (this._changingNow) {
      return
    }

    this._changingNow = true

    var input = e.target
    var value

    if (input.type == 'checkbox') value = Boolean(input.checked)
    else value = input.value

    var div = input.parentElement

    if (div.hasAttribute('data-record')) {
      var dataList = div.querySelectorAll('[data-value]:not([hidden])')
      for (var i = 0; i < dataList.length; i++)
        if (dataList[i] !== input) dataList[i].value = value || this._defaultValue()
    }

    if (div.hasAttribute('data-record')) this._build()
    else if (div.hasAttribute('data-record-new') && input.hasAttribute('data-value')) this._add()

    this._changingNow = false
  }

  _build(includeNewRecord) {
    if (includeNewRecord) var records = this.shadowRoot.querySelectorAll('[data-record],[data-record-new]')
    else var records = this.shadowRoot.querySelectorAll('[data-record]')

    var newmap = {}

    for (var i = 0; i < records.length; i++) {
      var record = records[i]

      var key = record.querySelector('[data-key]').value
      var inputs = record.querySelectorAll('[data-value]:not([style*="display: none"])')
      if (!inputs || inputs.length == 0) continue

      var input = inputs[inputs.length - 1]

      var value

      if (input.type == 'checkbox') value = Boolean(input.checked)
      else value = input.value

      if (key) newmap[key] = value || this._defaultValue()
    }

    this.value = newmap
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }

  /* default를 제외한 map아이템들을 template(dom-repeat)용 배열로 변환하는 함수 */
  _toArray(map) {
    var array = []

    for (var key in map) {
      if (key == 'default') continue
      array.push({
        key: key,
        value: map[key]
      })
    }

    return array
  }

  _sort(e) {
    var sorter =
      this.keytype === 'number'
        ? function(a, b) {
            return parseFloat(b.key) < parseFloat(a.key)
          }
        : function(a, b) {
            return b.key < a.key
          }

    var map = this._toArray(this.value)
      .sort(sorter)
      .reduce(function(sum, i) {
        sum[i.key] = i.value
        return sum
      }, {})

    map.default = this.value.default

    this.value = map
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }

  _add(e) {
    this._build(true)

    var inputs = this.shadowRoot.querySelectorAll('[data-record-new] input:not([style*="display: none"])')

    for (var i = 0; i < inputs.length; i++) {
      let input = inputs[i]

      if (input.type == 'checkbox') input.checked = false
      else input.value = this._defaultValue(input.type)
    }

    inputs[0].focus()
  }

  _delete(e) {
    var record = e.target.parentElement
    record.querySelector('[data-key]').value = ''
    this._build()
  }
}

customElements.define(DataBindingValueMap.is, DataBindingValueMap)
