---
title: "Research note title"
description: "One-sentence summary of the note."
publishDate: 2026-09-02
# Set updatedDate only when the published note changes materially.
# updatedDate: 2026-09-04
# Optional public change notes. The section appears only when entries exist.
# updates:
#   - date: 2026-09-04
#     note: "Clarified the state definition and added a numerical example."
# Pick exactly one primary shelf:
# Research      = your own model / derivation / experiment / proof / research idea
# Paper Reading = close reading of a paper or a group of papers
# Learning      = course / textbook / method / software / technical learning
# Essay         = writing / research life / website / nontechnical reflection
category: Research
# Tags are optional search metadata, not navigation.
tags: [inventory, warranty]
# Use collection only when this note is genuinely part of a continuing series.
# collection: Warranty & Inventory Notes
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
# Optional legacy/advanced metadata. Add it only when it is genuinely useful.
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

Internal note links can use wiki syntax: `[[Exact note title]]`, `[[alias|display text]]`, or `[[note-slug|display text]]`. When another published note links here, the article can show the surrounding sentence as a contextual backlink. Wiki links also continue to power optional knowledge tools in the Lab.

## Context

Explain why the question matters and what assumptions are being made.

> [!sidenote]
> 这一类 blockquote 会自动变成正文内的轻量注释，不与 Reader 或侧栏抢空间。

> [!assumption id=independent-demand] Example assumption
> 用 Assumption block 单独保存真正进入模型的假设。文章右侧的 Assumptions 面板会自动收集它。

Later, `[[assumption:independent-demand]]` will become an automatic cross-reference.

## Model or argument

> [!notation id=state] State notation
> 例如 \(s_t\) 表示第 \(t\) 期决策前状态。Notation block 会自动进入文章右侧的 Notation 面板。

> [!definition id=value-function] Value function
> Define \(V_t(s)\) as the optimal expected future cost from state \(s\) at period \(t\).

Put equations close to the text that interprets them. Put `:eq[label]` immediately after a display equation only when you want it numbered and referenced later.

$$
V_t(s)=\min_a\left\{c(s,a)+\mathbb E[V_{t+1}(S_{t+1})\mid s,a]\right\}.
$$

:eq[bellman]

Then write `[[eq:bellman]]` or `[[def:value-function]]` in ordinary prose to create a numbered cross-reference.

> [!theorem id=policy-structure] Example structural result
> State the theorem or structural result here. The page will number Theorem, Lemma, Proposition, and Definition blocks automatically.

The sentence `[[thm:policy-structure]]` will link back to that theorem.

> [!proof]
> Proof blocks are collapsible and end with a square. Keep the argument itself here; do not use this environment merely for commentary.

Use a generic detail block when information is useful but should not interrupt the main reading path:

> [!details Why this assumption matters]
> Put a longer derivation, numerical check, implementation note, alternative argument, or other optional detail here. It stays collapsed until the reader asks for it.

If `references` is provided in frontmatter, cite one with ordinary Markdown such as `[Author et al. (2026)](#ref-example2026)`. The hover card is generated automatically.

For a Paper Reading note, add the `paper` block so it appears in the Paper Reading shelf and can use the source-and-notes Reader. Advanced fields such as `paperTakeaways`, `researchQuestions`, wiki links, graph relations, and update history remain supported, but they are optional rather than part of the basic writing workflow.

## What I learned

End with what changed in your understanding and what remains unresolved.
