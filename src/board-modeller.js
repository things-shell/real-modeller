import { LitElement, html, css } from 'lit-element'

import '@material/mwc-fab/mwc-fab'

import '@polymer/paper-dialog/paper-dialog'
import { i18next } from '@things-shell/client-i18n'
import '@things-shell/board-viewer'

import './editors/things-scene-viewer/things-scene-viewer'
import './editors/things-scene-viewer/things-scene-inspector'

import './component-toolbar/component-toolbar'
import './property-sidebar/property-sidebar'

import en_US from '../locales/en-US.json'
import ko_KR from '../locales/ko-KR.json'
import zh_CN from '../locales/zh-CN.json'

class BoardModeller extends LitElement {
  constructor() {
    super()

    i18next.addResourceBundle('en-US', 'translations', en_US['en-US'], true, true)
    i18next.addResourceBundle('ko-KR', 'translations', ko_KR['ko-KR'], true, true)
    i18next.addResourceBundle('zh-CN', 'translations', zh_CN['zh-CN'], true, true)

    this.boardName = ''
    this.model = null
    this.baseUrl = ''
    this.selected = []
    this.mode = 1
    this.provider = null
    this.hideProperty = false
    this.overlay = null
    this.scene = null
    this.componentGroupList = []
    this.fonts = []
    this.propertyEditor = []
  }

  static get properties() {
    return {
      boardName: String,
      model: Object,
      baseUrl: String,
      selected: Array,
      mode: Number,
      provider: Object,
      hideProperty: Boolean,
      overlay: String,
      scene: Object,
      componentGroupList: Array,
      fonts: Array,
      propertyEditor: Array
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: row;
        }

        #scene-wrap {
          flex: 1;
          position: relative;

          display: flex;
          flex-direction: row;
        }

        things-scene-viewer {
          flex: 1;
        }

        things-scene-inspector {
          position: absolute;
          left: 0px;
          top: 0px;
        }

        mwc-fab {
          position: absolute;
          right: 15px;
          bottom: 15px;
        }
      `
    ]
  }

  render() {
    return html`
      <component-toolbar
        .scene=${this.scene}
        .mode=${this.mode}
        @mode-changed="${e => {
          this.mode = e.detail.value
        }}"
        .componentGroupList=${this.componentGroupList}
        .group=${this.group}
      >
      </component-toolbar>

      <div id="scene-wrap">
        <things-scene-viewer
          id="scene"
          .scene=${this.scene}
          @scene-changed="${e => {
            this.scene = e.detail.value
          }}"
          .model=${this.model}
          .selected=${this.selected}
          @selected-changed="${e => {
            this.selected = e.detail.value
          }}"
          .mode=${this.mode}
          @mode-changed="${e => {
            this.mode = e.detail.value
          }}"
          fit="ratio"
          .baseUrl=${this.baseUrl}
          @contextmenu="${e => this.onContextMenu(e)}"
          .provider=${this.provider}
          name="modeller"
        >
        </things-scene-viewer>

        <things-scene-inspector .scene="${this.scene}"></things-scene-inspector>

        <mwc-fab icon="save" @tap=${e => this.onTapSave(e)} title="save"> </mwc-fab>
      </div>

      <property-sidebar
        .scene=${this.scene}
        .selected=${this.selected}
        ?collapsed=${this.hideProperty}
        .fonts=${this.fonts}
        .propertyEditor=${this.propertyEditor}
      >
      </property-sidebar>
    `
  }

  preview() {
    this.previewModel = JSON.parse(JSON.stringify(this.scene.model))

    /*
     * paper-dialog appears behind backdrop when inside a <app-header-layout ..
     * https://github.com/PolymerElements/paper-dialog/issues/152
     **/

    var preview = document.createElement('board-viewer')

    preview.style.width = '100%'
    preview.style.height = '100%'
    preview.style.margin = '0'
    preview.style.padding = '0'
    preview.style.flex = 1
    preview.provider = this.provider
    preview.board = {
      id: 'preview',
      model: this.previewModel
    }

    var dialog = document.createElement('paper-dialog')

    dialog.style.width = '100%'
    dialog.style.height = '100%'
    dialog.style.display = 'flex'
    dialog.style['flex-direction'] = 'column'
    dialog.setAttribute('with-backdrop', true)
    dialog.setAttribute('auto-fit-on-attach', true)
    dialog.setAttribute('always-on-top', true)
    dialog.addEventListener('iron-overlay-closed', () => {
      preview.board = null
      dialog.parentNode.removeChild(dialog)
    })

    dialog.appendChild(preview)
    document.body.appendChild(dialog)

    dialog.open()

    requestAnimationFrame(() => {
      dispatchEvent(new Event('resize'))
    })
  }

  onTapSave() {
    this.dispatchEvent(new CustomEvent('save-model', { bubbles: true, composed: true, detail: { model: this.model } }))
  }
}

customElements.define('board-modeller', BoardModeller)
