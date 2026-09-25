--- 
title: "Introduction to R"
author: "Aravind Hebbali"
date: "2026-09-25"
site: bookdown::bookdown_site
lang: en
documentclass: book
link-citations: yes
description: "A beginner-friendly introduction to the R programming language."
---

# Preface {-}

<img src="img/intro-r.png" width="60%" style="display: block; margin: auto;" />

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

## Structure of the book {-}

Chapter \@ref(introduction-to-r) gives a quick overview of R and its evolution over the last 
2 decades. Chapter \@ref(install-r-and-rstudio) acts as a guide for installing R and 
RStudio. Chapters \@ref(variables-in-r) and \@ref(data-types-in-r) introduce the reader to 
variables and data types in R. Chapter \@ref(getting-help-in-r) shows the right place and right
way to ask for help. Chapters \@ref(vectors-in-r) to \@ref(lists-in-r) introduce the basic 
data structures in R. Chapter \@ref(install-update-r-packages) explores the R package system.

## Software information {-}

The R session information when compiling this book is shown below:


``` r
sessionInfo()
```

```
## R version 4.5.2 (2025-10-31 ucrt)
## Platform: x86_64-w64-mingw32/x64
## Running under: Windows 10 x64 (build 19045)
## 
## Matrix products: default
##   LAPACK version 3.12.1
## 
## locale:
## [1] LC_COLLATE=English_India.utf8  LC_CTYPE=English_India.utf8   
## [3] LC_MONETARY=English_India.utf8 LC_NUMERIC=C                  
## [5] LC_TIME=English_India.utf8    
## 
## time zone: Asia/Calcutta
## tzcode source: internal
## 
## attached base packages:
## [1] stats     graphics  grDevices utils     datasets  methods   base     
## 
## loaded via a namespace (and not attached):
##  [1] digest_0.6.39   R6_2.6.1        bookdown_0.48   fastmap_1.2.0  
##  [5] xfun_0.61       cachem_1.1.0    knitr_1.50      htmltools_0.5.9
##  [9] rmarkdown_2.30  lifecycle_1.0.5 cli_3.6.5       sass_0.4.10    
## [13] jquerylib_0.1.4 compiler_4.5.2  tools_4.5.2     evaluate_1.0.5 
## [17] bslib_0.9.0     yaml_2.3.12     rlang_1.2.0     jsonlite_2.0.0
```

We do not add prompts (`>` and `+`) to R source code in this book, and we comment out the text output with two hashes `##` by default, as you can see from the R session information above. This is for your convenience when you want to copy and run the code (the text output will be ignored since it is commented out). Package names are in bold text (e.g., **rmarkdown**), and function names are followed by parentheses (e.g., `bookdown::render_book()`). The double-colon operator `::` means accessing an object from a package. 
