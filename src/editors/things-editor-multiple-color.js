/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

// TODO LitElement 로 변경 후 검증하지 않음.
import { LitElement, html, css } from 'lit-element'

import './things-editor-color'

/**
색상 배열을 편집하는 컴포넌트이다.

새로운 색상을 추가하고자 할 때는 `+` 버튼을 클릭한다.<br />
색상을 제거하고자 할 때는 `-` 버튼을 클릭한다.<br />

Example:

    <things-editor-multiple-color values=${values}>
    </things-editor-multiple-color>
*/

export default class ThingsEditorMultipleColor extends LitElement {
  static get is() {
    return 'things-editor-multiple-color'
  }

  static get properties() {
    return {
      values: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
        }

        things-editor-color {
          width: 90px;
        }

        things-editor-color input[type='text'] {
          width: 87%;
        }

        things-editor-color a#color {
          float: right;
          margin: -31px 4px 0 0;
        }

        input[type='button'] {
          width: 22px;
          height: 25px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          position: relative;
          top: -2px;
          padding-top: 0px;
          padding-bottom: 2px;
          background-color: #f1f2f4;
          color: #8f9192;
          font-size: 16px;
        }
      `
    ]
  }

  constructor() {
    super()

    this.values = []
  }

  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onValueChanged.bind(this))
  }

  // TODO style for things-editor-color
  render() {
    return html`
      <div id="colors-container">
        ${
          (this.values || []).map(
            (item, index) => html`
              <div>
                <input type="button" value="+" @click="${e => this._appendEditorColor(e)}" data-index=${index} />

                <things-editor-color .value=${item}> </things-editor-color>

                ${
                  (this.values || []).length > 1
                    ? html`
                        <input type="button" value="-" @click=${e => this._removeEditorColor(e)} data-index=${index} />
                      `
                    : html``
                }
              </div>
            `
          )
        }
      </div>
    `
  }

  _onValueChanged(e) {
    this.values = this._getheringValues()
  }

  _appendEditorColor(e) {
    this.values = [...this.values, 'black']

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }

  _removeEditorColor(e) {
    var values = []
    for (var i = 0; i < this.values.length; i++) {
      if (i === e.target.dataIndex) continue
      else values.push(this.values[i])
    }

    this.values = values
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }

  _getheringValues() {
    var colorsContainer = this.shadowRoot.querySelector('#colors-container')
    var values = []
    Array.from(colorsContainer.querySelectorAll('things-editor-color')).forEach(c => {
      values.push(c.value)
    })

    return values
  }
}

customElements.define(ThingsEditorMultipleColor.is, ThingsEditorMultipleColor)
