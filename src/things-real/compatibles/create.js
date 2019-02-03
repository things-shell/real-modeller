/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { SceneMode, FitMode, Scene } from '@hatiolab/things-real'

/* things-shell에서 things-scene.create 를 사용한 사례들

    this._setScene(createScene({
      target: this,
      model: JSON.parse(JSON.stringify(model)),
      layers,
      handlers,
      mode: this.mode,
      refProvider: this.provider
    }))

    scene = create({
      model,
      mode: 0,
      refProvider: this.refProvider
    })
*/

export default function create({ target, model, layers = [], handlers = [], mode = SceneMode.VIEW, refProvider }) {
  // target이 없으면 안된다.
  // target이 문자열이면, document에서 해당 id를 가진 DOM Element를 찾는다.
  // target은 최종엔 DOM Element 이어야한다.
  // target에 이미 다른 Scene이 붙어있는 지도 확인해라.
  var targetEl = null

  if (typeof target == 'string') {
    targetEl = document.getElementById(target)
    if (!targetEl) throw `target element '${target}' is not exist`

    if (targetEl.firstChild) throw `target element '${target}' is not empty`
  } else {
    targetEl = target
  }

  if (targetEl && targetEl.style) {
    targetEl.style.cursor = 'default'
    targetEl.style.overflow = 'hidden'
  }

  return new Scene({
    targetEl,
    mode,
    model,
    fit: FitMode.RATIO,
    refProvider
  })
}
