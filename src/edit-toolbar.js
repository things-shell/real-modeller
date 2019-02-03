/**
 * @license Copyright © HatioLab Inc. All rights reserved.
 */

import { LitElement, html } from 'lit-element'

import { i18next, localize } from '@things-shell/client-i18n'

import { style } from './edit-toolbar-style'

class EditToolbar extends localize(i18next)(LitElement) {
  constructor() {
    super()

    this.scene = null
    this.selected = []
    this.hideProperty = false
    this.labelName = 'SAMPLE'
    this.variables = {}
    this.board = null
  }

  static get properties() {
    return {
      scene: Object,
      selected: Array,
      hideProperty: Boolean,
      labelName: String,
      variables: Object,
      board: Object
    }
  }

  static get styles() {
    return [style]
  }

  firstUpdated() {
    window.addEventListener('paste', e => {
      this.cliped = e.clipboardData.getData('text/plain')
    })

    this.shadowRoot.getElementById('undo').addEventListener('tap', this.onTapUndo.bind(this))
    this.shadowRoot.getElementById('redo').addEventListener('tap', this.onTapRedo.bind(this))
    this.shadowRoot.getElementById('fullscreen').addEventListener('tap', this.onTapFullscreen.bind(this))
    this.shadowRoot.getElementById('cut').addEventListener('tap', this.onTapCut.bind(this))
    this.shadowRoot.getElementById('copy').addEventListener('tap', this.onTapCopy.bind(this))
    this.shadowRoot.getElementById('paste').addEventListener('tap', this.onTapPaste.bind(this))
    this.shadowRoot.getElementById('delete').addEventListener('tap', this.onTapDelete.bind(this))
    this.shadowRoot.getElementById('group').addEventListener('tap', this.onTapGroup.bind(this))
    this.shadowRoot.getElementById('ungroup').addEventListener('tap', this.onTapUngroup.bind(this))
    this.shadowRoot.getElementById('toggle-property').addEventListener('tap', this.onTapToggle.bind(this))
    this.shadowRoot.getElementById('fit-scene').addEventListener('tap', this.onTapFitScene.bind(this))
    this.shadowRoot.getElementById('distribute-vertical').addEventListener('tap', this.onTapDistribute.bind(this))
    this.shadowRoot.getElementById('distribute-horizontal').addEventListener('tap', this.onTapDistribute.bind(this))
    this.shadowRoot.getElementById('preview').addEventListener('tap', this.onTapPreview.bind(this))

    // TODO injection 으로 변경합시다.
    // var modelerScene = this.parentNode.querySelector('things-scene-viewer')

    // var userOS = this._isMacOS() // OS가 맥인지 확인

    // modelerScene.addEventListener('keydown', e => {
    //   this.onShortcut(e, userOS)
    //   modelerScene.focus()
    // })
  }

  updated(change) {
    change.has('scene') && this.onSceneChanged(this.scene, change.scene)
    change.has('selected') && this.onSelectedChanged(this.selected, change.selected)
  }

  render() {
    return html`
      <label>${(this.board && this.board.name) || 'NO TITLE'}</label>

      <paper-icon-button id="undo" title="undo (${this.getShortcutString('cmd', 'z')})"> </paper-icon-button>
      <paper-icon-button id="redo" title="redo (${this.getShortcutString('cmd', 'shift', 'z')})"> </paper-icon-button>

      <span class="vline"></span>

      <paper-icon-button id="cut" title="cut (${this.getShortcutString('cmd', 'x')})"> </paper-icon-button>
      <paper-icon-button id="copy" title="copy (${this.getShortcutString('cmd', 'c')})"> </paper-icon-button>
      <paper-icon-button id="paste" title="paste (${this.getShortcutString('cmd', 'v')})"> </paper-icon-button>
      <paper-icon-button
        id="delete"
        title="delete (${this.getShortcutString('backspace')}, ${this.getShortcutString('delete')})"
      >
      </paper-icon-button>

      <span class="vline"></span>

      <!--
      TODO Implement style-copy
      <paper-icon-button id="style-copy" title="format painter"></paper-icon-button>
      <span class="vline"></span>
    -->

      <paper-icon-button
        data-distribute="HORIZONTAL"
        id="distribute-horizontal"
        title="distribute horizontally (${this.getShortcutString('alt', 'shift', 'h')})"
      >
      </paper-icon-button>

      <paper-icon-button
        data-distribute="VERTICAL"
        id="distribute-vertical"
        title="distribute vertically (${this.getShortcutString('alt', 'shift', 'v')})"
      >
      </paper-icon-button>

      <span class="vline"></span>

      <paper-icon-button id="group" title="group (${this.getShortcutString('cmd', 'g')})"> </paper-icon-button>
      <paper-icon-button id="ungroup" title="ungroup (${this.getShortcutString('cmd', 'shift', 'g')})">
      </paper-icon-button>

      <span class="vline"></span>

      <paper-icon-button id="fit-scene" title="fit scene (${this.getShortcutString('cmd', 'd')})"> </paper-icon-button>

      <span class="vline"></span>

      <paper-icon-button id="preview" title="preview (${this.getShortcutString('ctrl', 'p')})"> </paper-icon-button>

      <paper-icon-button id="fullscreen" title="fullscreen (${this.getShortcutString('f11')})"> </paper-icon-button>

      <paper-icon-button
        id="toggle-property"
        title="toggle property panel (${this.getShortcutString('cmd', 'h')})"
        toggles="true"
      >
      </paper-icon-button>
    `
  }

  _isMacOS() {
    return navigator.userAgent.indexOf('Mac') != -1
  }

  getSymbol(key) {
    var symbol
    switch (key) {
      case 'cmd':
      case 'ctrl':
        symbol = this._isMacOS() ? '⌘' : 'Ctrl'
        break
      case 'shift':
        symbol = this._isMacOS() ? '⇧' : 'Shift'
        break
      case 'alt':
      case 'option':
        symbol = this._isMacOS() ? '⌥' : 'Alt'
        break
      case 'backspace':
        symbol = this._isMacOS() ? '⌫' : 'BackSpace'
        break
      case 'delete':
        symbol = this._isMacOS() ? '⌦' : 'Del'
        break
      default:
        symbol = key.toUpperCase()
        break
    }

    return symbol
  }

  getShortcutString() {
    var symbols = []
    for (var i = 0; i < arguments.length; i++) {
      symbols.push(this.getSymbol(arguments[i]))
    }

    return symbols.join(this._isMacOS() ? '' : '+')
  }

  onShortcut(e, MacOS) {
    if (MacOS) var ctrlKey = e.metaKey
    else var ctrlKey = e.ctrlKey

    var altKey = e.altKey
    var shiftKey = e.shiftKey

    switch (e.code) {
      case 'KeyZ':
        if (ctrlKey && !shiftKey) this.onTapUndo()
        else if (ctrlKey && shiftKey) this.onTapRedo()
        break
      case 'KeyY':
        if (ctrlKey && !shiftKey) this.onTapRedo()
        else if (altKey && shiftKey) this.onTapSymmetryY()
        break
      case 'KeyC':
        if (ctrlKey && !shiftKey) this.onTapCopy()
        else if (altKey && shiftKey) this.onTapAlign('center')
        break
      case 'KeyX':
        if (ctrlKey && !shiftKey) this.onTapCut()
        else if (altKey && shiftKey) this.onTapSymmetryX()
        break
      case 'KeyV':
        if (ctrlKey && !shiftKey) this.onTapPaste()
        else if (altKey && shiftKey) this.onTapDistribute('VERTICAL')
        break
      case 'Delete':
      case 'Backspace':
        this.onTapDelete()
        break
      case 'KeyG':
        if (ctrlKey && !shiftKey) this.onTapGroup()
        else if (ctrlKey && shiftKey) this.onTapUngroup()
        break
      case 'KeyF':
        if (ctrlKey && !shiftKey) this.onTapZorder(forward)
        else if (ctrlKey && shiftKey) this.onTapZorder(front)
        break
      case 'KeyB':
        if (ctrlKey && !shiftKey) this.onTapZorder(backward)
        else if (ctrlKey && shiftKey) this.onTapZorder(back)
        else if (altKey && shiftKey) this.onTapAlign('bottom')
        break
      case 'Equal':
        if (ctrlKey) this.onTapZoom(zoomin)
        break
      case 'Minus':
        if (ctrlKey) this.onTapZoom(zoomout)
        break
      case 'KeyH':
        if (ctrlKey && !shiftKey) this.onTapToggle()
        else if (altKey && shiftKey) this.onTapDistribute('HORIZONTAL')
        break
      case 'F11':
        this.onTapFullscreen()
        break
      case 'KeyS':
        if (ctrlKey) {
          this.saveBoard()
          e.preventDefault()
        }
        break
      case 'KeyP':
        if (ctrlKey) this.onTapPreview()
        break
      case 'KeyA':
        if (ctrlKey) this.onTapSelectAll()
        break
      case 'KeyL':
        if (altKey && shiftKey) this.onTapAlign('left')
        break
      case 'KeyR':
        if (altKey && shiftKey) this.onTapAlign('right')
        break
      case 'KeyM':
        if (altKey && shiftKey) this.onTapAlign('middle')
        break
      case 'KeyT':
        if (altKey && shiftKey) this.onTapAlign('top')
        break
      case 'KeyY':
        if (altKey && shiftKey) this.onTapSymmetryY()
        break
      case 'KeyD':
        if (ctrlKey) this.onTapFitScene()
        break
      case 'KeyE':
        if (altKey && shiftKey) this.onTapRotateCW()
        else if (ctrlKey && shiftKey) this.onTapDownloadModel()
        break
      case 'KeyW':
        if (altKey && shiftKey) this.onTapRotateCCW()
        break
      case 'Digit1':
        if (ctrlKey) console.log('MODEL', this.scene && this.scene.model)
        break
      case 'Digit2':
        if (ctrlKey) console.log('SELECTED', this.scene && this.scene.selected)
        break
    }
  }

  onExecute(command, undoable, redoable) {
    this.shadowRoot.getElementById('undo').disabled = !undoable
    this.shadowRoot.getElementById('redo').disabled = !redoable
  }

  onUndo(undoable, redoable) {
    this.shadowRoot.getElementById('undo').disabled = !undoable
    this.shadowRoot.getElementById('redo').disabled = !redoable
  }

  onRedo(undoable, redoable) {
    this.shadowRoot.getElementById('undo').disabled = !undoable
    this.shadowRoot.getElementById('redo').disabled = !redoable
  }

  onSceneChanged(after, before) {
    // if (before) {
    //   before.off('execute', this.onExecute, this)
    //   before.off('undo', this.onUndo, this)
    //   before.off('redo', this.onRedo, this)
    // }

    if (after) {
      after.on('execute', this.onExecute, this)
      after.on('undo', this.onUndo, this)
      after.on('redo', this.onRedo, this)
    }
  }

  onSelectedChanged(after, before) {
    var alignable = after.length > 1

    this.shadowRoot.getElementById('align-left').disabled = !alignable
    this.shadowRoot.getElementById('align-center').disabled = !alignable
    this.shadowRoot.getElementById('align-right').disabled = !alignable
    this.shadowRoot.getElementById('align-top').disabled = !alignable
    this.shadowRoot.getElementById('align-middle').disabled = !alignable
    this.shadowRoot.getElementById('align-bottom').disabled = !alignable

    var movable = after.length === 1

    /* forward, backward 이동은 한 컴포넌트만 가능하다. */
    this.shadowRoot.getElementById('forward').disabled = !movable
    this.shadowRoot.getElementById('backward').disabled = !movable

    /* 여러 컴포넌트는 front, back 이동이 가능하다. */
    this.shadowRoot.getElementById('front').disabled = !(alignable || movable)
    this.shadowRoot.getElementById('back').disabled = !(alignable || movable)
  }

  onTapUndo(e) {
    this.scene && this.scene.undo()
  }

  onTapRedo(e) {
    this.scene && this.scene.redo()
  }

  onTapCut(e) {
    this.scene && this.scene.cut()
  }

  onTapCopy(e) {
    var copied = this.scene && this.scene.copy()

    if (!copied) return

    var textArea = document.createElement('textarea')
    textArea.style.position = 'absolute'
    textArea.style.opacity = '0'
    textArea.value = copied
    document.body.appendChild(textArea)

    setTimeout(() => {
      textArea.select()

      let succeess = document.execCommand('copy')
      document.body.removeChild(textArea)
    }, 100)

    this.cliped = copied
  }

  onTapPaste(e) {
    setTimeout(() => {
      this.scene && this.scene.paste(this.cliped)
    }, 100)
  }

  onTapDelete(e) {
    this.scene && this.scene.remove()
  }

  onTapSelectAll(e) {
    this.scene.select('(child)')
  }

  onTapFontIncrease(e) {
    var selected = this.scene.selected

    this.scene.undoableChange(function() {
      selected.forEach(function(component) {
        var fontSize = component.get('fontSize')

        if (!fontSize) fontSize = '15'

        if (fontSize) {
          var size = parseInt(fontSize)
          component.set('fontSize', size + 1)
        }
      })
    })
  }

  onTapFontDecrease(e) {
    var selected = this.scene.selected

    this.scene.undoableChange(function() {
      selected.forEach(function(component) {
        var fontSize = component.get('fontSize')

        if (!fontSize) fontSize = '15'

        if (fontSize) {
          var size = parseInt(fontSize)
          if (size > 1) component.set('fontSize', size - 1)
        }
      })
    })
  }

  onTapAlign(e) {
    if (!this.scene) return

    var selected = this.scene.selected
    if (selected.length <= 1) return

    if (e.target) {
      var button = e.target

      while (!button.hasAttribute('data-align') && button !== document.body) button = button.parentElement

      var align = button.getAttribute('data-align')
    } else {
      var align = e
    }

    this.scene.align(align)
  }

  onTapZorder(e) {
    if (!this.scene) return

    var selected = this.scene.selected
    if (selected.length < 1) return
    if (e.target) {
      var button = e.target

      while (!button.hasAttribute('data-zorder') && button !== document.body) button = button.parentElement

      var zorder = button.getAttribute('data-zorder')
    } else {
      var zorder = e.getAttribute('data-zorder')
    }

    this.scene.zorder(zorder)
  }

  onTapSymmetryX(e) {
    this.scene && this.scene.symmetryX()
  }

  onTapSymmetryY(e) {
    this.scene && this.scene.symmetryY()
  }

  onTapRotateCW(e) {
    if (!this.scene) return

    var selected = this.scene.selected

    this.scene.undoableChange(function() {
      selected.forEach(function(component) {
        var rotation = component.get('rotation')

        if (!rotation) rotation = 0

        component.set('rotation', (rotation + Math.PI / 2) % (Math.PI * 2))
      })
    })
  }

  onTapRotateCCW(e) {
    if (!this.scene) return

    var selected = this.scene.selected

    this.scene.undoableChange(function() {
      selected.forEach(function(component) {
        var rotation = component.get('rotation')

        if (!rotation) rotation = 0

        component.set('rotation', (rotation - Math.PI / 2) % (Math.PI * 2))
      })
    })
  }

  onTapGroup(e) {
    this.scene && this.scene.group()
  }

  onTapUngroup(e) {
    this.scene && this.scene.ungroup()
  }

  onTapFullscreen(e) {
    this.dispatchEvent(new CustomEvent('modeller-fullscreen'))
  }

  onTapToggle(e) {
    this.hideProperty = !this.hideProperty
    this.dispatchEvent(
      new CustomEvent('hide-property-changed', {
        bubbles: true,
        composed: true,
        detail: { value: this.hideProperty }
      })
    )
  }

  onTapFitScene(e) {
    if (this.scene) {
      this.scene.resize()
      this.scene.fit('ratio')
    }
  }

  onTapPreview(e) {
    this.dispatchEvent(new CustomEvent('open-preview'))
  }

  onTapDownloadModel(e) {
    this.dispatchEvent(new CustomEvent('download-model'))
  }

  onTapDistribute(e) {
    if (!this.scene) return

    var selected = this.scene.selected
    if (selected.length <= 1) return
    if (e.target) {
      var button = e.target

      while (!button.hasAttribute('data-distribute') && button !== document.body) button = button.parentElement

      var distribute = button.getAttribute('data-distribute')
    } else {
      var distribute = e
    }

    this.scene.distribute(distribute)
  }
}
