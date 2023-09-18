/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('mathjax-full/js/core/MathDocument.js').MathDocument<HTMLElement, Text, Document>} MathDocument
 * @typedef {import('mathjax-full/js/core/OutputJax.js').OutputJax<HTMLElement, Text, Document>} OutputJax
 * @typedef {import('./create-plugin.js').Options} Options
 * @typedef {import('./create-plugin.js').Renderer} Renderer
 */

import {fromDom} from 'hast-util-from-dom'
import {toText} from 'hast-util-to-text'
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js'
import {TeX} from 'mathjax-full/js/input/tex.js'
import {AllPackages} from 'mathjax-full/js/input/tex/AllPackages.js'
import {mathjax} from 'mathjax-full/js/mathjax.js'
import {createAdaptor} from './create-adaptor.js'

const adaptor = createAdaptor()

// To do next major: Keep resultant HTML handler from `register(adaptor)` to
// allow registering the `AssistiveMmlHandler` as in this demo:
// <https://github.com/mathjax/MathJax-demos-node/tree/master/direct>
//
// To do next major: If registering `AssistiveMmlHandler` is supported through
// configuration, move HTML handler registration to beginning of transformer and
// unregister at the end of transformer with
// `mathjax.handlers.unregister(handler)`.
// That is to prevent memory leak in `mathjax.handlers` whenever a new instance
// of the plugin is used.
/* eslint-disable-next-line new-cap */
RegisterHTMLHandler(adaptor)

/**
 * Create a renderer.
 *
 * @param {Options} options
 *   Configuration.
 * @param {OutputJax} output
 *   Output jax.
 * @returns {Renderer}
 *   Rendeder.
 */
export function createRenderer(options, output) {
  const input = new TeX({packages: AllPackages, ...options.tex})
  /** @type {MathDocument} */
  const doc = mathjax.document('', {InputJax: input, OutputJax: output})

  return {
    render(node, options) {
      const mathText = toText(node, {whitespace: 'pre'})
      // Cast as this practically results in `HTMLElement`.
      const domNode = /** @type {HTMLElement} */ (
        doc.convert(mathText, options)
      )
      // Cast as `HTMLElement` results in an `Element`.
      const hastNode = /** @type {Element} */ (fromDom(domNode))
      node.children = [hastNode]
    },
    styleSheet() {
      const value = adaptor.textContent(output.styleSheet(doc))

      return {
        type: 'element',
        tagName: 'style',
        properties: {},
        children: [{type: 'text', value}]
      }
    }
  }
}
