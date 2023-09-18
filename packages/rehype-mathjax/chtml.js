/**
 * @typedef {import('./lib/create-plugin.js').Options} Options
 */

import {CHTML} from 'mathjax-full/js/output/chtml.js'
import {createPlugin} from './lib/create-plugin.js'
import {createRenderer} from './lib/create-renderer.js'

const rehypeMathJaxCHtml = createPlugin(function (options) {
  if (!options.chtml || !options.chtml.fontURL) {
    throw new Error(
      'rehype-mathjax: missing `fontURL` in options, which must be set to a URL to reach MathJaX fonts'
    )
  }

  return createRenderer(options, new CHTML(options.chtml))
})

export default rehypeMathJaxCHtml
