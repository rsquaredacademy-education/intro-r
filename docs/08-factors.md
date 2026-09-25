# Factors in R {#factors-in-r}

## Introduction

In this chapter, we will learn to:

- create factors
- order levels
- specify labels
- check levels
- number of levels

Categorical or qualitative data in R is treated as data type `factor`. 

## Create Factors


``` r
args(factor)
```

```
## function (x = character(), levels, labels = levels, exclude = NA, 
##     ordered = is.ordered(x), nmax = NA) 
## NULL
```


``` r
devices <- factor(c('Mobile', 'Tablet', 'Desktop'))
devices
```

```
## [1] Mobile  Tablet  Desktop
## Levels: Desktop Mobile Tablet
```

``` r
# number of levels
nlevels(devices)
```

```
## [1] 3
```

``` r
# levels
levels(devices)
```

```
## [1] "Desktop" "Mobile"  "Tablet"
```

## Order Levels

Use the `levels` argument together with `ordered = TRUE` when the categories
have a natural order:


``` r
size <- factor(c('Medium', 'Low', 'High', 'Low', 'Medium'),
  levels = c('Low', 'Medium', 'High'), ordered = TRUE)
size
```

```
## [1] Medium Low    High   Low    Medium
## Levels: Low < Medium < High
```

``` r
levels(size)
```

```
## [1] "Low"    "Medium" "High"
```

## Specify Labels

Use the `labels` argument to attach shorter or prettier display labels while
keeping the underlying level order:


``` r
size_labeled <- factor(c('Low', 'Medium', 'High'),
  levels = c('Low', 'Medium', 'High'), labels = c('L', 'M', 'H'))
size_labeled
```

```
## [1] L M H
## Levels: L M H
```

## Check Levels


``` r
# existing levels
levels(size)
```

```
## [1] "Low"    "Medium" "High"
```

``` r
# number of levels
nlevels(size)
```

```
## [1] 3
```

``` r
# is this an ordered factor?
is.ordered(size)
```

```
## [1] TRUE
```

For modern factor manipulation (reordering, recoding, lumping rare levels),
see the [forcats](https://forcats.tidyverse.org/) package.
