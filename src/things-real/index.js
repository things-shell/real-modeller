/**
 * 여기서는 things-scene과 동일한 export를 제공한다.
 *
 * things-shell 에서 사용하는 things-scene의 exports 들은 다음과 같다.
 *  - ReferenceMap, error, Component (things-real support)
 *  - Layer, create (things-real not support)
 *
 * things-real이 제공하지않는 create와 Layer를 여기서 구현한다.
 */

export * from '@hatiolab/things-real'

export { default as create } from './compatibles/create'
export { default as Layer } from './compatibles/layer'
