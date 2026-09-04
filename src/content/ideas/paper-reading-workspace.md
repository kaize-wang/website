---
title: "Paper-reading workspace"
summary: "Make close reading feel like one continuous surface: source on the left, my own reasoning on the right."
area: Build
stage: Active
createdDate: 2026-09-03
updatedDate: 2026-09-04
nextAction: "Test the PDF/Markdown source switch and simplify the remaining Reader controls."
whyNow: "This is already becoming part of the paper-reading workflow, so small usability improvements have immediate value."
milestones:
  - text: "Build the split source-and-notes layout"
    done: true
  - text: "Add local PDF persistence"
    done: true
  - text: "Add PDF / Markdown source switching"
    done: true
  - text: "Finish a calm usability pass"
    done: false
progress:
  - date: 2026-09-04
    note: "Simplified Reader controls and kept source files local to the browser."
  - date: 2026-09-03
    note: "First working split-view prototype for Huang (2008)."
tags: [reader, papers, workflow]
featured: true
---

## The thought

Paper reading should not feel like switching between two unrelated windows. The source and my interpretation should stay visibly connected.

## What good looks like

The workspace should disappear when I do not need it, but become immediately useful when I am doing close reading. Page references should move the source without turning the note itself into a control panel.

## Boundary

This is a reading tool, not a general PDF manager. If a control does not help with source-to-note comparison, it probably does not belong in the main Reader surface.
