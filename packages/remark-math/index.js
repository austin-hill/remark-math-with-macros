import {math} from 'micromark-extension-math'
import {mathFromMarkdown, mathToMarkdown} from 'mdast-util-math'

let warningIssued

export default function remarkMath() {
  const data = this.data()

  // Old remark.
  /* c8 ignore next 14 */
  if (
    !warningIssued &&
    ((this.Parser &&
      this.Parser.prototype &&
      this.Parser.prototype.blockTokenizers) ||
      (this.Compiler &&
        this.Compiler.prototype &&
        this.Compiler.prototype.visitors))
  ) {
    warningIssued = true
    console.warn(
      '[remark-math] Warning: please upgrade to remark 13 to use this plugin'
    )
  }

  add('micromarkExtensions', math)
  add('fromMarkdownExtensions', mathFromMarkdown)
  add('toMarkdownExtensions', mathToMarkdown)

  function add(field, value) {
    // Other extensions.
    /* c8 ignore next */
    if (data[field]) data[field].push(value)
    else data[field] = [value]
  }
}
