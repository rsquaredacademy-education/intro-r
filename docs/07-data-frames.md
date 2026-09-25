# Dataframes in R {#data-frames-in-r}

## Introduction

In this chapter, we will learn to:

- create dataframe
- select columns 
- select rows
- utility functions

## Create dataframes

Use `data.frame` to create dataframes. Below is the function syntax:


``` r
args(data.frame)
```

```
## function (..., row.names = NULL, check.rows = FALSE, check.names = TRUE, 
##     fix.empty.names = TRUE, stringsAsFactors = FALSE) 
## NULL
```

Data frames are basically lists with elements of equal length and as such, they are heterogeneous. Let us create a dataframe:


``` r
name <- c('John', 'Jack', 'Jill')
age <- c(29, 25, 27)
graduate <- c(TRUE, TRUE, FALSE)
students <- data.frame(name, age, graduate)
students
```

```
##   name age graduate
## 1 John  29     TRUE
## 2 Jack  25     TRUE
## 3 Jill  27    FALSE
```

## Basic Information


``` r
class(students)
## [1] "data.frame"
names(students)
## [1] "name"     "age"      "graduate"
colnames(students)
## [1] "name"     "age"      "graduate"
str(students)
## 'data.frame':	3 obs. of  3 variables:
##  $ name    : chr  "John" "Jack" "Jill"
##  $ age     : num  29 25 27
##  $ graduate: logi  TRUE TRUE FALSE
dim(students)
## [1] 3 3
nrow(students)
## [1] 3
ncol(students)
## [1] 3
```

## Select Columns

### Single Column

- `[]`
- `[[]]`
- `$`


``` r
# using [
students[1]
##   name
## 1 John
## 2 Jack
## 3 Jill

# using [[
students[[1]]
## [1] "John" "Jack" "Jill"

# using $
students$name
## [1] "John" "Jack" "Jill"
```

### Multiple Columns


``` r
students[, 1:3]
##   name age graduate
## 1 John  29     TRUE
## 2 Jack  25     TRUE
## 3 Jill  27    FALSE

students[, c(1, 3)]
##   name graduate
## 1 John     TRUE
## 2 Jack     TRUE
## 3 Jill    FALSE
```

## Select Rows


``` r
# single row
students[1, ]
##   name age graduate
## 1 John  29     TRUE

# multiple row
students[c(1, 3), ]
##   name age graduate
## 1 John  29     TRUE
## 3 Jill  27    FALSE
```

Starting with R 4.0.0 (April 2020), the default value of `stringsAsFactors`
in `data.frame()` is `FALSE`, meaning character columns remain as character
type. In older versions of R (< 4.0.0), the default was `TRUE`, which
automatically converted character vectors to factors.


``` r
students <- data.frame(name, age, graduate, stringsAsFactors = FALSE)
```



