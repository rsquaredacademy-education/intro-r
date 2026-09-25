# Data Types in R {#data-types-in-r}

## Introduction

In this chapter, we will learn about the following data types:

- numeric/double
- integer
- character
- logical
- date/time

## Numeric

In R, numbers are represented by the data type `numeric`. We will first create a variable and assign it a value. Next we will learn a few methods of checking the type of the variable.


``` r
# create two variables
number1 <- 3.5
number2 <- 3

# check data type
class(number1)
```

```
## [1] "numeric"
```

``` r
class(number2)
```

```
## [1] "numeric"
```

``` r
# check if data type is numeric
is.numeric(number1)
```

```
## [1] TRUE
```

``` r
is.numeric(number2)
```

```
## [1] TRUE
```

If you carefully observe, `integers` are also treated as `numeric/double`. We will learn to create integers in a while. In the meanwhile, we have introduced two new functions in the above example:

- `class()`: returns the `class` or `type` 
- `is.numeric()`: tests whether the variable is of type `numeric`

## Integer

Unless specified otherwise, integers are treated as `numeric` or `double`. In this section, we will learn to create variables of the type `integer` and to convert other data types to `integer`.

- create a variable `number1` and assign it the value `3`
- check the data type of `number1` using `class`
- create a second variable `number2` using `as.integer` and assign it the value `3`
- check the data type of `number2` using `class`
- finally use `is.integer` to check the data type of both `number1` and `number2`


``` r
# create a variable and assign it an integer value
number1 <- 3

# create another variable using as.integer
number2 <- as.integer(3)

# check the data type
class(number1)
```

```
## [1] "numeric"
```

``` r
class(number2)
```

```
## [1] "integer"
```

``` r
# use is.integer to check data type
is.integer(number1)
```

```
## [1] FALSE
```

``` r
is.integer(number2)
```

```
## [1] TRUE
```

## Character

Letters, words and group of words are represented by the data type `character`. All data of type `character` must be enclosed in single or double quotation marks. In fact any value enclosed in quotes will be treated as `character`. Let us create two variables to store the first and last name of some random guy.


``` r
# first name
first_name <- "jovial"

# last name
last_name <- 'mann'

# check data type
class(first_name)
```

```
## [1] "character"
```

``` r
class(last_name)
```

```
## [1] "character"
```

``` r
# use is.character to check data type
is.character(first_name)
```

```
## [1] TRUE
```

``` r
is.character(last_name)
```

```
## [1] TRUE
```

You can coerce any data type to `character` using `as.character()`. 


``` r
# create variable of different data types
age <- as.integer(30) # integer
score <- 9.8          # numeric/double
opt_course <- TRUE    # logical
today <- Sys.time()   # date time

as.character(age) 
```

```
## [1] "30"
```

``` r
as.character(score)
```

```
## [1] "9.8"
```

``` r
as.character(opt_course)
```

```
## [1] "TRUE"
```

``` r
as.character(today)
```

```
## [1] "2026-09-25 15:02:00.322091"
```

## Logical

Logical data types take only 2 values. Either `TRUE` or `FALSE` (plus `NA` for missing values, giving three-valued logic in R). Such data types are created when we compare two objects in R using 
comparison or logical operators.

- create two variables `x` and `y`
- assign them the values `TRUE` and `FALSE` respectively
- use `is.logical` to check data type
- use `as.logical` to coerce other data types to `logical`


``` r
# create variables x and y
x <- TRUE
y <- FALSE

# check data type
class(x)
```

```
## [1] "logical"
```

``` r
is.logical(y)
```

```
## [1] TRUE
```

The outcome of comparison operators is always `logical`. In the below example, we compare two numbers to see the outcome.


``` r
# create two numeric variables
x <- 3
y <- 4

# compare x and y
x > y
```

```
## [1] FALSE
```

``` r
x < y
```

```
## [1] TRUE
```

``` r
# store the result
z <- x > y
class(z)
```

```
## [1] "logical"
```

`TRUE` is represented by all numbers except `0`. `FALSE` is represented only by `0` and no other numbers.


``` r
# TRUE and FALSE are represented by 1 and 0
as.logical(1)
```

```
## [1] TRUE
```

``` r
as.logical(0)
```

```
## [1] FALSE
```

``` r
# using numbers
as.numeric(TRUE)
```

```
## [1] 1
```

``` r
as.numeric(FALSE)
```

```
## [1] 0
```

``` r
# using different numbers
as.logical(c(-2, -1.5, -1, 0, 1, 2))
```

```
## [1]  TRUE  TRUE  TRUE FALSE  TRUE  TRUE
```

Use `as.logical()` to coerce other data types to `logical`.


``` r
# create variable of different data types
age <- as.integer(30) # integer
score <- 9.8          # numeric/double
opt_course <- TRUE    # logical
today <- Sys.time()   # date time

as.logical(age) 
```

```
## [1] TRUE
```

``` r
as.logical(score)
```

```
## [1] TRUE
```

``` r
as.logical(opt_course)
```

```
## [1] TRUE
```

``` r
as.logical(today)
```

```
## [1] TRUE
```

## Date

R has dedicated types for dates and date-times. Use `Date` for calendar dates
and `POSIXct` for date-times:


``` r
# today's date
today_date <- Sys.Date()
today_date
```

```
## [1] "2026-09-25"
```

``` r
class(today_date)
```

```
## [1] "Date"
```

``` r
# create a date from a string
independence_day <- as.Date("2026-01-15")
independence_day
```

```
## [1] "2026-01-15"
```

``` r
# pretty-print a date
format(independence_day, "%B %d, %Y")
```

```
## [1] "January 15, 2026"
```

For date-times, use `as.POSIXct()` (or the `lubridate` package, see the appendix in Phase 3).
