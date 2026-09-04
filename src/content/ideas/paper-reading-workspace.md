---
title: "Paper-reading workspace"
titleZh: "文献精读工作台"
summary: "Make close reading feel like one continuous surface: source on the left, my own reasoning on the right."
summaryZh: "把精读做成一个连续的阅读界面：左边是原文，右边是自己的理解与整理。"
area: Build
stage: Active
createdDate: 2026-09-03
updatedDate: 2026-09-04
nextAction: "Test the PDF/Markdown source switch and simplify the remaining Reader controls."
nextActionZh: "继续测试 PDF / Markdown 原文切换，并删减 Reader 里仍然多余的控制项。"
whyNow: "This is already becoming part of the paper-reading workflow, so small usability improvements have immediate value."
whyNowZh: "它已经开始成为论文阅读流程的一部分，所以细小的易用性改进会立刻产生价值。"
milestones:
  - text: "Build the split source-and-notes layout"
    textZh: "完成原文与笔记的分栏布局"
    done: true
  - text: "Add local PDF persistence"
    textZh: "支持本地 PDF 持久化"
    done: true
  - text: "Add PDF / Markdown source switching"
    textZh: "加入 PDF / Markdown 原文切换"
    done: true
  - text: "Finish a calm usability pass"
    textZh: "完成一轮克制的易用性整理"
    done: false
progress:
  - date: 2026-09-04
    note: "Simplified Reader controls and kept source files local to the browser."
    noteZh: "简化了 Reader 控制项，并让原文文件继续只保存在浏览器本地。"
  - date: 2026-09-03
    note: "First working split-view prototype for Huang (2008)."
    noteZh: "完成 Huang (2008) 的第一版可用分栏阅读原型。"
tags: [reader, papers, workflow]
featured: true
---

## The thought

Paper reading should not feel like switching between two unrelated windows. The source and my interpretation should stay visibly connected.

## What good looks like

The workspace should disappear when I do not need it, but become immediately useful when I am doing close reading. Page references should move the source without turning the note itself into a control panel.

## Boundary

This is a reading tool, not a general PDF manager. If a control does not help with source-to-note comparison, it probably does not belong in the main Reader surface.
