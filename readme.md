# remark-math

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] and [**rehype**][rehype] plugins to support math!

## Install

[npm][]:

```sh
npm install remark-math rehype-katex
```

## Use

Say we have the following file, `example.md`:

```markdown
Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$
```

And our script, `example.js`, looks as follows:

```js
const vfile = require('to-vfile')
const unified = require('unified')
const markdown = require('remark-parse')
const math = require('remark-math')
const remark2rehype = require('remark-rehype')
const katex = require('rehype-katex')
const stringify = require('rehype-stringify')

unified()
  .use(markdown)
  .use(math)
  .use(remark2rehype)
  .use(katex)
  .use(stringify)
  .process(vfile.readSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
<p>Lift(<span class="inlineMath"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>L</mi></mrow><annotation encoding="application/x-tex">L</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.68333em;vertical-align:0em;"></span><span class="mord mathdefault">L</span></span></span></span></span>) can be determined by Lift Coefficient (<span class="inlineMath"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><msub><mi>C</mi><mi>L</mi></msub></mrow><annotation encoding="application/x-tex">C_L</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.83333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathdefault" style="margin-right:0.07153em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.32833099999999993em;"><span style="top:-2.5500000000000003em;margin-left:-0.07153em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">L</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span>) like the following equation.</p>
<div class="math"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>L</mi><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>ρ</mi><msup><mi>v</mi><mn>2</mn></msup><mi>S</mi><msub><mi>C</mi><mi>L</mi></msub></mrow><annotation encoding="application/x-tex">L = \frac{1}{2} \rho v^2 S C_L</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.68333em;vertical-align:0em;"></span><span class="mord mathdefault">L</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:2.00744em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.32144em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">2</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mord mathdefault">ρ</span><span class="mord"><span class="mord mathdefault" style="margin-right:0.03588em;">v</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641079999999999em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mord mathdefault" style="margin-right:0.05764em;">S</span><span class="mord"><span class="mord mathdefault" style="margin-right:0.07153em;">C</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.32833099999999993em;"><span style="top:-2.5500000000000003em;margin-left:-0.07153em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathdefault mtight">L</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></span></div>
```

Wow, that’s a lot!
But in a browser, that looks something like this:

![][screenshot]

> Note: you should also use `katex.css` somewhere on the page to style math
> properly:
>
> ```html
> <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css" integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG" crossorigin="anonymous">
> ```

## Packages

This repo houses four packages:

*   [`remark-math`][remark-math]
    — Parses `$` as `inlineMath` and `$$` as `math` nodes
*   [`rehype-katex`][rehype-katex]
    — Transforms math nodes with [KaTeX][]
    (✨ recommended)
*   [`rehype-mathjax`][rehype-mathjax]
    — Transforms math nodes with [MathJax][]
    (✨ recommended)
*   [`remark-html-katex`][remark-html-katex]
    — Transforms math nodes with [KaTeX][] for [`remark-html`][remark-html]
    (discouraged)

See their readmes for more information.

## Security

Use of `rehype-katex` or `remark-html-katex` renders user content with
[KaTeX][], so any vulnerability in KaTeX can open you to a
[cross-site scripting (XSS)][xss] attack.

Always be wary of user input and use [`rehype-sanitize`][rehype-sanitize].

## Related

*   [`remark-github`][remark-github]
    — Auto-link references like in GitHub issues, PRs, and comments
*   [`remark-frontmatter`][remark-frontmatter]
    — Support frontmatter (YAML, TOML, and more)
*   [`remark-footnotes`][remark-footnotes]
    — Support footnotes
*   [`remark-breaks`][remark-breaks]
    – Support hard breaks without needing spaces (like on issues)

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Junyoung Choi][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-math/main.svg

[build]: https://travis-ci.org/remarkjs/remark-math

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-math.svg

[coverage]: https://codecov.io/github/remarkjs/remark-math

[downloads-badge]: https://img.shields.io/npm/dm/remark-math.svg

[downloads]: https://www.npmjs.com/package/remark-math

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-math.svg

[size]: https://bundlephobia.com/result?p=remark-math

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://rokt33r.github.io

[remark]: https://github.com/remarkjs/remark

[remark-html]: https://github.com/remarkjs/remark-html

[remark-github]: https://github.com/remarkjs/remark-github

[remark-frontmatter]: https://github.com/remarkjs/remark-frontmatter

[remark-footnotes]: https://github.com/remarkjs/remark-footnotes

[remark-breaks]: https://github.com/remarkjs/remark-breaks

[rehype]: https://github.com/rehypejs/rehype

[rehype-sanitize]: https://github.com/rehypejs/rehype-sanitize

[katex]: https://github.com/Khan/KaTeX

[mathjax]: https://mathjax.org/

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[remark-math]: ./packages/remark-math

[rehype-katex]: ./packages/rehype-katex

[rehype-mathjax]: ./packages/rehype-mathjax

[remark-html-katex]: ./packages/remark-html-katex

[screenshot]: screenshot.png
