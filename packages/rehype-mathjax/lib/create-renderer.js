/**
 * @typedef {import('hast').Element} Element
 * @typedef {import('mathjax-full/js/core/OutputJax').OutputJax<HTMLElement, Text, Document>} OutputJax
 * @typedef {import('mathjax-full/js/core/MathDocument.js').MathDocument<HTMLElement, Text, Document>} MathDocument
 * @typedef {import('./create-plugin.js').CreateRenderer} CreateRenderer
 */

import {mathjax} from 'mathjax-full/js/mathjax.js'
import {RegisterHTMLHandler} from 'mathjax-full/js/handlers/html.js'
import {fromDom} from 'hast-util-from-dom'
import {toText} from 'hast-util-to-text'
import {createInput} from './create-input.js'
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
 * @type {CreateRenderer}
 * @param {OutputJax} output
 */
export function createRenderer(inputOptions, output) {
  const input = createInput(inputOptions)
  /** @type {MathDocument} */
  const doc = mathjax.document('', {InputJax: input, OutputJax: output})

  return {
    render(node, options) {
      // @ts-expect-error: assume mathml nodes can be handled by
      // `hast-util-from-dom`.
      const domNode = fromDom(doc.convert(toText(node), options))
      // @ts-expect-error: `fromDom` returns an element for a given element.
      node.children = [domNode]
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
