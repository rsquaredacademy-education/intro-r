# Introduction to R

*A beginner-friendly introduction to the R programming language — zero-friction base R through your first ggplot2 and dplyr wins.*

Read the live book: https://intro-r.rsquaredacademy.com

## Syllabus

| Chapter | Topic |
|---|---|
| Introduction to R | R's history, RStudio/Positron |
| Install R & RStudio | Setup with video + text fallback |
| Variables in R | Naming rules, assignment |
| Data Types in R | Logical, numeric, character, Date |
| Getting Help in R | Built-in help + online resources |
| Vectors in R | Coercion, operations, indexing |
| Data Frames in R | Creation, `stringsAsFactors`, inspection |
| Factors in R | Levels, labels, ordering, forcats |
| Lists in R | Creation, extraction, coercion |
| Install & Update R Packages | CRAN, Bioconductor, pak |
| RStudio Projects & Data Import | `.Rproj`, here, readr, readxl |
| Your First Visualization | Base R vs ggplot2 on `mpg` |
| Your First Data Wrangling | Five dplyr verbs with `\|>` |

Chapters 11–13 include interactive webR cells — edit the code and press **Run**; it executes in your browser, no R installation needed.

## Build

Requires R >= 4.4, Quarto >= 1.6:

```bash
quarto preview   # live preview
quarto render    # HTML + Typst PDF + ePub into docs/
```

Dependencies are pinned via `renv.lock` (see `renv::snapshot()`).
Record your exact runtime with `R.version.string` when reporting build issues.

## License

[CC-BY-NC-SA-4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)

## Contact

- Author: [Aravind Hebbali](https://www.aravindhebbali.com)
- Maintainer: books@rsquaredacademy.com
- Issues: https://github.com/rsquaredacademy-education/intro-r/issues
