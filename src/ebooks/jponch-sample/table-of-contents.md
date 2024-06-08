---
title: "Table of Contents"
layout: table-of-contents.liquid
pagination:
  data: collections.booksWithChapters
  size: 1
  alias: "bookWithChapters"
  filter: "{{ page.filePathStem.split('/')[2] }}"
---

{% include "table-of-contents.liquid" %}