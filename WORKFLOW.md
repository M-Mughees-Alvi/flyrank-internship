# AI-Assisted Workflow Drill

## Overview

For this assignment, I built the same React settings form twice using two different AI prompting approaches. The goal was to understand how prompt quality affects code quality, review effort, and overall development workflow.

---

## Round 1 – Vague Prompt

In the first round, I used a single, high-level prompt with very little context. The AI generated a working interface, but the result required significant manual review. The project contained unnecessary complexity, inconsistent structure, limited validation, and features that did not fully meet the intended requirements.

During testing, I noticed several issues. Browser validation handled the email field, but there was no proper custom validation. Some UI controls looked functional but did not actually change application behavior. Overall, the generated code worked only partially and required considerable manual inspection.

---

## Round 2 – Precise Prompt

For the second round, I started from a fresh branch and used a detailed prompt containing clear requirements, constraints, expected behavior, reusable component architecture, accessibility expectations, and a verification step.

The resulting application was significantly better. The form was divided into reusable components such as `TextField`, `ThemeSelector`, and `ToggleSwitch`. Validation logic was implemented using controlled React components, accessibility attributes were included, theme switching worked correctly, and user interactions behaved as expected.

The AI also provided an implementation plan before writing the code and explained how the solution was verified.

---

## Comparison

| Round 1              | Round 2                     |
| -------------------- | --------------------------- |
| Single vague prompt  | Detailed structured prompt  |
| Minimal planning     | Planned before coding       |
| Limited validation   | Custom validation           |
| Larger review effort | Smaller review effort       |
| Less reusable code   | Modular reusable components |
| Several manual fixes | Minor cleanup only          |

---

## AI Mistake I Caught

One issue I identified was that browser validation was being relied upon instead of implementing proper custom validation logic. During manual testing, I verified the behavior and improved it in the second implementation using controlled inputs and explicit validation functions.

---

## Lessons Learned

This exercise demonstrated that better prompts produce significantly better software. Spending additional time defining requirements, architecture, constraints, and verification steps reduced debugging time and produced cleaner, more maintainable React code. I also learned that AI-generated code should never be accepted without manual testing, accessibility checks, and code review.

Future projects will follow this structured workflow instead of relying on a single generic prompt.
