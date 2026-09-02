---
title: "Research note title"
description: "One-sentence summary of the note."
publishDate: 2026-09-02
category: Research
tags: [inventory, warranty]
collection: Warranty & Inventory Notes
aliases: ["Optional short name used by wiki links"]
lang: zh
# englishSummary: "Optional 3–5 sentence English summary for a Chinese note."
# translationOf: path-of-the-other-language-version
# paper:
#   title: "Paper title"
#   authors: ["Author One", "Author Two"]
#   year: 2026
#   venue: "Journal"
#   doi: "10.xxxx/xxxxx"
# readingStatus: Reading # Reading | Read | Revisit | Core
# paperTakeaways:
#   story: "What operational problem does the paper explain?"
#   state: "What state / information must the decision maker retain?"
#   structure: "What structural result is obtained?"
#   question: "What assumption would be most interesting to relax?"
# references:
#   - id: example2026
#     title: "Paper title"
#     authors: "Author One and Author Two"
#     year: 2026
#     venue: "Journal"
#     doi: "10.xxxx/xxxxx"
draft: true
featured: false
---

Start with the question you are trying to understand.

Internal note links can use wiki syntax: `[[Exact note title]]`, `[[alias|display text]]`, or `[[note-slug|display text]]`. These links generate backlinks and strong edges in the Knowledge Graph. A target that does not exist remains visible as an unresolved link instead of silently breaking.

## Context

Explain why the question matters and what assumptions are being made.

> [!sidenote]
> 这一类 blockquote 会自动变成侧注。在足够宽的桌面屏幕上进入页边，在较窄屏幕上自动退化成正文内的注释卡片。

## Model or argument

Put equations close to the text that interprets them. Display equations automatically receive a `Copy TeX` button.

$$
V_t(s)=\min_a\left\{c(s,a)+\mathbb E[V_{t+1}(S_{t+1})\mid s,a]\right\}.
$$

If `references` is provided in frontmatter, cite one with ordinary Markdown such as `[Author et al. (2026)](#ref-example2026)`. The hover card is generated automatically.

For Paper Reading notes, the optional `readingStatus` and `paperTakeaways` fields feed the Paper Reading Dashboard automatically.

## What I learned

End with what changed in your understanding and what remains unresolved.
