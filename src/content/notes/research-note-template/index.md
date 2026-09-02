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
# researchQuestions:
#   - id: question-short-id
#     text: "A question worth tracking explicitly."
#     status: Open # Open | Exploring | Reframed | Resolved
#     kind: Research # Research | Reading
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

> [!assumption id=independent-demand] Example assumption
> 用 Assumption block 单独保存真正进入模型的假设。文章右侧的 Assumptions 面板会自动收集它。

Later, `[[assumption:independent-demand]]` will become an automatic cross-reference.

## Model or argument

> [!notation id=state] State notation
> 例如 \(s_t\) 表示第 \(t\) 期决策前状态。Notation block 会自动进入文章右侧的 Notation 面板。

> [!definition id=value-function] Value function
> Define \(V_t(s)\) as the optimal expected future cost from state \(s\) at period \(t\).

Put equations close to the text that interprets them. Every display equation is numbered and receives a `Copy TeX` button. Put `:eq[label]` immediately after an equation when you want to reference it later.

$$
V_t(s)=\min_a\left\{c(s,a)+\mathbb E[V_{t+1}(S_{t+1})\mid s,a]\right\}.
$$

:eq[bellman]

Then write `[[eq:bellman]]` or `[[def:value-function]]` in ordinary prose to create a numbered cross-reference.

> [!theorem id=policy-structure] Example structural result
> State the theorem or structural result here. The page will number Theorem, Lemma, Proposition, and Definition blocks automatically.

The sentence `[[thm:policy-structure]]` will link back to that theorem.

> [!proof]
> Proof blocks become collapsible and end with a square. Keep the argument itself here; do not use this environment merely for commentary.

If `references` is provided in frontmatter, cite one with ordinary Markdown such as `[Author et al. (2026)](#ref-example2026)`. The hover card is generated automatically.

For Paper Reading notes, the optional `readingStatus` and `paperTakeaways` fields feed the Paper Reading Dashboard automatically. `researchQuestions` feeds the Questions Board. Revisit dates are separate and remain local to the browser.

## What I learned

End with what changed in your understanding and what remains unresolved.
