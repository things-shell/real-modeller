/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html, css } from 'lit-element'
import { property } from '@things-shell/client-utils'

import '@polymer/paper-radio-group/paper-radio-group'
import '@polymer/paper-dropdown-menu/paper-dropdown-menu'

import '@things-shell/client-i18n/src/things-i18n-msg'
import '../../editors/things-editor-buttons-radio'
import '../../editors/things-editor-angle-input'
import '../../editors/things-editor-color'
import '../../editors/things-editor-color-style'

import { PropertySharedStyle } from '../property-shared-style'

class PropertyLineStyle extends LitElement {
  static get is() {
    return 'property-line-style'
  }

  @property({ type: Object })
  value = {}

  static get styles() {
    return [
      PropertySharedStyle,
      css`
        .line-type paper-listbox {
          overflow: hidden;
          max-width: 100px;
        }
        .line-type paper-item {
          background: url(./assets/images/icon-properties-line-type.png) 50% 0 no-repeat;
          min-height: 25px;
          padding: 3px 9px;
          width: 80px;
        }

        .line-type paper-item.solid {
          background-position: 50% 10px;
        }
        .line-type paper-item.round-dot {
          background-position: 50% -40px;
        }
        .line-type paper-item.square-dot {
          background-position: 50% -90px;
        }
        .line-type paper-item.dash {
          background-position: 50% -140px;
        }
        .line-type paper-item.dash-dot {
          background-position: 50% -190px;
        }
        .line-type paper-item.long-dash {
          background-position: 50% -240px;
        }
        .line-type paper-item.long-dash-dot {
          background-position: 50% -290px;
        }
        .line-type paper-item.long-dash-dot-dot {
          background-position: 50% -340px;
        }

        .line-type .paper-input-container input {
          background: url(./assets/images/icon-properties-line-type.png) 50% 0 no-repeat !important;
        }
        .line-type.solid .paper-input-container input {
          background-position: 50% 5px !important;
        }
        .line-type.round-dot .paper-input-container input {
          background-position: 50% -45px !important;
        }
        .line-type.square-dot .paper-input-container input {
          background-position: 50% -85px !important;
        }
        .line-type.dash .paper-input-container input {
          background-position: 50% -145px !important;
        }
        .line-type.dash-dot .paper-input-container input {
          background-position: 50% -185px !important;
        }
        .line-type.long-dash .paper-input-container input {
          background-position: 50% -245px !important;
        }
        .line-type.long-dash-dot .paper-input-container input {
          background-position: 50% -285px !important;
        }
        .line-type.long-dash-dot-dot .paper-input-container input {
          background-position: 50% -345px !important;
        }

        .arrow-type paper-menu {
          overflow: hidden;
          max-width: 140px;
        }
        .arrow-type paper-item {
          background: url(./assets/images/icon-properties-arrow-type.png) 50% 0 no-repeat;
          min-height: 30px;
          padding: 3px 7px;
          width: 30px;
          float: left;
        }
        .arrow-type paper-item.begin-no {
          background-position: 50% 16px;
        }
        .arrow-type paper-item.begin-arrow {
          background-position: 50% -39px;
        }
        .arrow-type paper-item.begin-open-arrow {
          background-position: 50% -89px;
        }
        .arrow-type paper-item.begin-stealth-arrow {
          background-position: 50% -139px;
        }
        .arrow-type paper-item.begin-diamond-arrow {
          background-position: 50% -190px;
        }
        .arrow-type paper-item.begin-oval-arrow {
          background-position: 50% -238px;
        }
        .arrow-type paper-item.begin-size1 {
          background-position: 50% -286px;
        }
        .arrow-type paper-item.begin-size2 {
          background-position: 50% -336px;
        }
        .arrow-type paper-item.begin-size3 {
          background-position: 50% -386px;
        }
        .arrow-type paper-item.begin-size4 {
          background-position: 50% -436px;
        }
        .arrow-type paper-item.begin-size5 {
          background-position: 50% -486px;
        }
        .arrow-type paper-item.begin-size6 {
          background-position: 50% -536px;
        }
        .arrow-type paper-item.begin-size7 {
          background-position: 50% -589px;
        }
        .arrow-type paper-item.begin-size8 {
          background-position: 50% -639px;
        }
        .arrow-type paper-item.begin-size9 {
          background-position: 50% -689px;
        }
        .arrow-type paper-item.end-no {
          background-position: 50% 16px;
        }
        .arrow-type paper-item.end-arrow {
          background-position: 50% -739px;
        }
        .arrow-type paper-item.end-open-arrow {
          background-position: 50% -789px;
        }
        .arrow-type paper-item.end-stealth-arrow {
          background-position: 50% -839px;
        }
        .arrow-type paper-item.end-diamond-arrow {
          background-position: 50% -890px;
        }
        .arrow-type paper-item.end-oval-arrow {
          background-position: 50% -938px;
        }
        .arrow-type paper-item.end-size1 {
          background-position: 50% -986px;
        }
        .arrow-type paper-item.end-size2 {
          background-position: 50% -1036px;
        }
        .arrow-type paper-item.end-size3 {
          background-position: 50% -1086px;
        }
        .arrow-type paper-item.end-size4 {
          background-position: 50% -1136px;
        }
        .arrow-type paper-item.end-size5 {
          background-position: 50% -1186px;
        }
        .arrow-type paper-item.end-size6 {
          background-position: 50% -1236px;
        }
        .arrow-type paper-item.end-size7 {
          background-position: 50% -1289px;
        }
        .arrow-type paper-item.end-size8 {
          background-position: 50% -1339px;
        }
        .arrow-type paper-item.end-size9 {
          background-position: 50% -1389px;
        }

        .arrow-type .paper-input-container input {
          background: url(./assets/images/icon-properties-arrow-type.png) 110% 0 no-repeat !important;
        }
        .arrow-type.begin-no .paper-input-container input {
          background-position: 110% 5px !important;
        }
        .arrow-type.begin-arrow .paper-input-container input {
          background-position: 110% -50px !important;
        }
        .arrow-type.begin-open-arrow .paper-input-container input {
          background-position: 110% -100px !important;
        }
        .arrow-type.begin-stealth-arrow .paper-input-container input {
          background-position: 110% -150px !important;
        }
        .arrow-type.begin-diamond-arrow .paper-input-container input {
          background-position: 110% -200px !important;
        }
        .arrow-type.begin-oval-arrow .paper-input-container input {
          background-position: 110% -250px !important;
        }
        .arrow-type.begin-size1 .paper-input-container input {
          background-position: 110% -298px !important;
        }
        .arrow-type.begin-size2 .paper-input-container input {
          background-position: 110% -348px !important;
        }
        .arrow-type.begin-size3 .paper-input-container input {
          background-position: 110% -398px !important;
        }
        .arrow-type.begin-size4 .paper-input-container input {
          background-position: 110% -448px !important;
        }
        .arrow-type.begin-size5 .paper-input-container input {
          background-position: 110% -498px !important;
        }
        .arrow-type.begin-size6 .paper-input-container input {
          background-position: 110% -548px !important;
        }
        .arrow-type.begin-size7 .paper-input-container input {
          background-position: 110% -600px !important;
        }
        .arrow-type.begin-size8 .paper-input-container input {
          background-position: 110% -650px !important;
        }
        .arrow-type.begin-size9 .paper-input-container input {
          background-position: 110% -700px !important;
        }
        .arrow-type.end-no .paper-input-container input {
          background-position: 110% 5px !important;
        }
        .arrow-type.end-arrow .paper-input-container input {
          background-position: 110% -750px !important;
        }
        .arrow-type.end-open-arrow .paper-input-container input {
          background-position: 110% -800px !important;
        }
        .arrow-type.end-stealth-arrow .paper-input-container input {
          background-position: 110% -850px !important;
        }
        .arrow-type.end-diamond-arrow .paper-input-container input {
          background-position: 110% -900px !important;
        }
        .arrow-type.end-oval-arrow .paper-input-container input {
          background-position: 110% -950px !important;
        }
        .arrow-type.end-size1 .paper-input-container input {
          background-position: 110% -998px !important;
        }
        .arrow-type.end-size2 .paper-input-container input {
          background-position: 110% -1048px !important;
        }
        .arrow-type.end-size3 .paper-input-container input {
          background-position: 110% -1098px !important;
        }
        .arrow-type.end-size4 .paper-input-container input {
          background-position: 110% -1148px !important;
        }
        .arrow-type.end-size5 .paper-input-container input {
          background-position: 110% -1198px !important;
        }
        .arrow-type.end-size6 .paper-input-container input {
          background-position: 110% -1248px !important;
        }
        .arrow-type.end-size7 .paper-input-container input {
          background-position: 110% -1300px !important;
        }
        .arrow-type.end-size8 .paper-input-container input {
          background-position: 110% -1350px !important;
        }
        .arrow-type.end-size9 .paper-input-container input {
          background-position: 110% -1400px !important;
        }
      `
    ]
  }
  firstUpdated() {
    this.shadowRoot.addEventListener('change', this._onValueChange.bind(this))
  }

  render() {
    return html`
      <div class="property-grid">
        <label class="property-half-label icon-only-label linewidth"></label>
        <input type="number" value-key="lineWidth" .value=${this.value.lineWidth} class="property-half-input" />

        <label class="property-half-label icon-only-label color"></label>
        <things-editor-color value-key="strokeStyle" .value=${this.value.strokeStyle} class="property-half-input">
        </things-editor-color>

        <label class="property-full-label">
          <things-i18n-msg msgid="label.line-type">line type</things-i18n-msg>
        </label>
        <paper-dropdown-menu no-label-float="true" class="property-full-input line-type solid">
          <!-- solid는 선택된 항목 보여주기위한 class로 하위 paper-item의 class와 동일하게 -->
          <paper-listbox
            value-key="lineDash"
            @selected-changed="${e => e.detail.value != this.value.lineDash && this._onValueChange(e)}"
            slot="dropdown-content"
            .selected=${this.value.lineDash}
            attr-for-selected="name"
          >
            <paper-item class="solid" name="solid"></paper-item>
            <paper-item class="round-dot" name="round-dot"></paper-item>
            <paper-item class="square-dot" name="square-dot"></paper-item>
            <paper-item class="dash" name="dash"></paper-item>
            <paper-item class="dash-dot" name="dash-dot"></paper-item>
            <paper-item class="long-dash" name="long-dash"></paper-item>
            <paper-item class="long-dash-dot" name="long-dash-dot"></paper-item>
            <paper-item class="long-dash-dot-dot" name="long-dash-dot-dot"></paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <label class="property-full-label"> <things-i18n-msg msgid="label.cap-type">cap type</things-i18n-msg> </label>
        <select class="property-full-input select-content" value-key="lineCap" .value=${this.value.lineCap}>
          <option value="butt"> <things-i18n-msg msgid="label.square">square</things-i18n-msg> </option>
          <option value="round"> <things-i18n-msg msgid="label.round">round</things-i18n-msg> </option>
        </select>

        <label class="property-full-label">
          <things-i18n-msg msgid="label.join-type">join type</things-i18n-msg>
        </label>
        <select
          class="property-full-input
          select-content"
          value-key="lineJoin"
          .value=${this.value.lineJoin}
        >
          <option value="miter"> <things-i18n-msg msgid="label.miter">miter</things-i18n-msg> </option>
          <option value="round"> <things-i18n-msg msgid="label.round">round</things-i18n-msg> </option>
          <option value="bevel"> <things-i18n-msg msgid="label.bevel">bevel</things-i18n-msg> </option>
        </select>
      </div>
    `
  }

  _onValueChange(e) {
    var element = e.target
    var key = element.getAttribute('value-key')

    if (!key) {
      return
    }

    this.value = {
      ...this.value,
      [key]: element.value
    }

    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
  }
}

window.customElements.define(PropertyLineStyle.is, PropertyLineStyle)
