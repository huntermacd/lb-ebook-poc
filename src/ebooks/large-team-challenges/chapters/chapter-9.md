---
title: Permissions that don’t match the requirements of your team
image: "chapter-9.png"
layout: chapter
---

Out of the box, Drupal comes with “edit mine” or “edit all” permissions
and no support for “edit some.” The fact that internal content teams aren’t
relevant to a customer-facing website is exacerbated by this. The internal
structure of the organization often needs to be hidden from end users but
still allow those editors to retain ownership of their content. Combine these
two things, and you end up with everyone on the team having the ability to
edit anything. The larger the team, the more this is a problem.

The big question: how do you govern access to content within the site when
departments or differing teams need to be isolated from one another?

### SOLUTIONS

- **Give each team their own content types**. This has the advantage of
working with the grain of Drupal. For example, the news team only edits
the “news” content type. But if you are not careful, this breaks down
quickly. What if multiple teams need an “event” content type? You don’t
want to create duplicates.
- **Custom access or contrib modules**. There are many contrib modules
to test, like the previously mentioned [Workbench Access](https://www.drupal.org/project/workbench_access). Drupal is also
extensible enough to create your own access solution.
- **Separate instances of Drupal**. Each instance can have the same content
types. It keeps both navigation and content ownership away from others
in the organization. It also simplifies development and keeps databases
smaller. You can even glue these instances into a single URL hierarchy
to give the illusion of a single website. This is the “big hammer” solution,
and to use it, make sure your problems are nails actually big enough
to warrant such a hammer. You can [learn more about how the State of Georgia found success with this model of implementation](https://www.lullabot.com/our-work/govhub-building-georgias-digital-future).
