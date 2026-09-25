# Introduction to R

This repository contains the source of [Introduction to R](https://intro-r.rsquaredacademy.com),
a beginner-friendly introduction to the R programming language by Aravind Hebbali.
The book is built with [bookdown](https://github.com/rstudio/bookdown).

## Prerequisites

- R >= 4.4.0 (tested on R 4.5.x)
- Pandoc >= 3.1.x
- R packages: `bookdown` (>= 0.39), `rmarkdown` (>= 2.26), `knitr` (>= 1.45)

Record your exact runtime with `R.version.string` when reporting build issues.

## Build

```r
bookdown::render_book("index.Rmd", "bookdown::gitbook")
```

Then deploy root static assets into `docs/`:

```r
source("_post-render.R")
```

Or from the shell:

```bash
Rscript -e 'bookdown::render_book("index.Rmd", "bookdown::gitbook")'
Rscript _post-render.R
```

Dependencies are pinned via `renv.lock` (see `renv::snapshot()`).

## License

[CC-BY-NC-SA-4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)

## Contact

- Author: [Aravind Hebbali](https://www.aravindhebbali.com)
- Maintainer: books@rsquaredacademy.com
- Issues: https://github.com/rsquaredacademy-education/intro-r/issues
