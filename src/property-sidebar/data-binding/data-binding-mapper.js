/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'

import '@polymer/iron-pages/iron-pages'
import '@polymer/paper-radio-button/paper-radio-button'
import '@polymer/paper-radio-group/paper-radio-group'

import '@things-shell/client-i18n'
import '../../editors/things-editor-code'
import './data-binding-value-map'
import './data-binding-value-range'

/**
element for mapping data value editing

Example:

  <data-binding-mapper mapping=${mapping}>
  </data-binding-mapper>
*/
export default class DataBindingMapper extends LitElement {
  static get is() {
    return 'data-binding-mapper'
  }

  static get properties() {
    return {
      mapping: Object,
      rule: Object,
      properties: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          background-color: rgba(255, 255, 255, 0.5);
          overflow: hidden;
          padding: 7px 0 0 0;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-width: 0 1px 1px 1px;
          padding: 4px;

          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-gap: 4px;
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
        :host > paper-radio-group {
          grid-column: span 7;
        }

        :host > iron-pages {
          grid-column: span 10;
        }

        paper-radio-button {
          padding: 2px 1px 2px 4px !important;
        }

        things-editor-code {
          height: 300px;
          overflow: auto;
        }
      `
    ]
  }

  constructor() {
    super()
    this.mapping = {}
    this.rule = {}
    this.properties = []
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onChange.bind(this))
  }

  updated(change) {
    change.has('mapping') && this._onChangedMapping(this.mapping)
  }

  render() {
    return html`
      <label> <things-i18n-msg msgid="label.accessor">accessor</things-i18n-msg> </label>
      <input value-key="accessor" type="text" data-mapping-accessor .value=${this.mapping.accessor || ''} />

      <label> <things-i18n-msg msgid="label.target">target</things-i18n-msg> </label>

      <input id="target-input" type="text" value-key="target" list="target-list" .value=${this.mapping.target || ''} />
      <datalist id="target-list">
        <option value="(self)"></option>
        <option value="(key)"></option>
      </datalist>

      <label> <things-i18n-msg msgid="label.property">property</things-i18n-msg> </label>
      <select value-key="property" .value=${this.mapping.property}>
        ${this.properties.map(
          item =>
            html`
              <option .value=${item.name}>${item.label}</option>
            `
        )}
      </select>

      <label> <things-i18n-msg msgid="label.rule-type">rule type</things-i18n-msg> </label>
      <paper-radio-group @click=${e => this._onChangeRule(e)} .selected=${this.mapping.rule}>
        <paper-radio-button name="value">
          <things-i18n-msg msgid="label.value">value</things-i18n-msg>
        </paper-radio-button>
        <paper-radio-button name="map"> <things-i18n-msg msgid="label.map">map</things-i18n-msg> </paper-radio-button>
        <paper-radio-button name="range">
          <things-i18n-msg msgid="label.range">range</things-i18n-msg>
        </paper-radio-button>
        <paper-radio-button name="eval">
          <things-i18n-msg msgid="label.eval">eval</things-i18n-msg>
        </paper-radio-button>
      </paper-radio-group>

      <iron-pages attr-for-selected="data-rule-type" selected=${this.mapping.rule} class="content">
        <data-binding-value-map
          value-key="map"
          data-rule-type="map"
          .value=${this.rule.map || {}}
          .valuetype=${this._valuetype(this.mapping.property)}
        >
        </data-binding-value-map>

        <data-binding-value-range
          value-key="range"
          data-rule-type="range"
          .value=${this.rule.range || []}
          .valuetype=${this._valuetype(this.mapping.property)}
        >
        </data-binding-value-range>

        <div data-rule-type="eval">
          <things-editor-code value-key="eval" id="eval-editor" .value=${this.rule.eval || ''}> </things-editor-code>
        </div>
      </iron-pages>
    `
  }

  _valuetype(property) {
    switch (property) {
      case 'hidden':
      case 'started':
        return 'boolean'
        break
      case 'rotation':
      case 'value':
        return 'number'
        break
      case 'fillStyle':
      case 'strokeStyle':
      case 'fontColor':
        return 'color'
        break
      case 'data':
      case 'location':
      case 'dimension':
        return 'object'
        break
      case 'text':
      case 'ref':
      default:
        return 'string'
        break
    }
  }

  async _onChangedMapping(change) {
    if (this._keep_saved_rule_params) {
      this._keep_saved_rule_params = false
    } else {
      this.shadowRoot.querySelector('[data-mapping-accessor]').select()

      await this.renderComplete

      var rule = {}

      if (this.mapping) {
        switch (this.mapping.rule) {
          case 'map':
            rule.map = this.mapping.param || {}
            break
          case 'range':
            rule.range = this.mapping.param || []
            break
          case 'eval':
            rule.eval = this.mapping.param || ''
            break
        }
      }

      this.rule = rule
    }
  }

  _onChangeRule(e) {
    /* [주의]
    paper-radio-group의 on-selected-changed 이벤트를 사용하면, cyclic 이 발생할 수 있으므로,
    사용자의 액션에 의한 이벤트인 on-click 이벤트를 사용한다.
    */
    var element = e.target
    var value = element.name

    let param
    this.mapping.rule = value

    switch (this.mapping.rule) {
      case 'map':
        param = this.rule.map
        break
      case 'range':
        param = this.rule.range
        break
      case 'eval':
        param = this.rule.eval || ''

        let editor = this.shadowRoot.querySelector('#eval-editor')
        // rule.eval에 값이 없을 때, ace-editor 내용이 초기화되지 않는 문제때문에 처리함.
        if (!param) {
          editor.value = 'return'
        }
        break
      default:
    }

    this.mapping = {
      ...this.mapping,
      rule: value,
      param
    }

    this._keep_saved_rule_params = true
    this.dispatchEvent(new CustomEvent('value-change', { bubbles: true, composed: true }))
  }

  _onChange(e) {
    var element = e.target
    var key = element.getAttribute('value-key')

    if (!key) {
      return
    }

    var value = element.value

    if (key == 'target') {
      if (value.length > 0 && !/^[.#(\[]/.test(value)) {
        value = '#' + value.trim()

        this.shadowRoot.querySelector('#target-input').value = value
      }

      this.mapping = {
        ...this.mapping,
        target: value
      }
    } else if (key == 'accessor') {
      this.mapping = {
        ...this.mapping,
        accessor: (value || '').trim()
      }
    } else if (key == 'property') {
      this.mapping = {
        ...this.mapping,
        property: (value || '').trim()
      }
    } else if (key == 'map' || key == 'range' || key == 'eval') {
      this.rule[key] = value
      this.mapping = {
        ...this.mapping,
        param: value
      }
    }

    this._keep_saved_rule_params = true
    this.dispatchEvent(new CustomEvent('value-change', { bubbles: true, composed: true }))
  }
}

customElements.define(DataBindingMapper.is, DataBindingMapper)
