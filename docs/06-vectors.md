# Vectors in R {#vectors-in-r}

## Introduction

Vector is the most basic data structure in R. It is a sequence of elements of the same data type. If the elements are of different data types, they will be coerced to a common type that can accommodate all the elements. Vectors are generally created using `c()` (concatenate function), although depending on the data type of vector being created, other methods can be used.

## Numeric Vector

We will create a numeric vector using `c()` but you can use any function that creates a sequence of numbers. After that we will use `is.vector()` to check if it is a vector and `class` to check the data type.


``` r
# create a numeric vector
num_vect <- c(1, 2, 3)

# display the vector
num_vect
```

```
## [1] 1 2 3
```

``` r
# check if it is a vector
is.vector(num_vect)
```

```
## [1] TRUE
```

``` r
# check data type
class(num_vect)
```

```
## [1] "numeric"
```

Let us look at other ways to create a sequence of numbers. We leave it as an exercise to the reader to understand the functions using `help`.


``` r
# using colon
vect1 <- 1:10
vect1
```

```
##  [1]  1  2  3  4  5  6  7  8  9 10
```

``` r
# using rep
vect2 <- rep(1, 5)
vect2
```

```
## [1] 1 1 1 1 1
```

``` r
# using seq
vect3 <- seq(10)
vect3
```

```
##  [1]  1  2  3  4  5  6  7  8  9 10
```

## Integer Vector

Creating an integer vector is similar to numeric vector except that we need to instruct R to treat the data as `integer` and not `numeric` or `double`. We will use the same methods we used for creating numeric vectors. To specify that the data is of type `integer`, we suffix the number with `L`.


``` r
# integer vector
int_vect <- c(1L, 2L, 3L)
int_vect
```

```
## [1] 1 2 3
```

``` r
# check data type
class(int_vect)
```

```
## [1] "integer"
```

``` r
# using colon
vect1 <- 1L:10L
vect1
```

```
##  [1]  1  2  3  4  5  6  7  8  9 10
```

``` r
# using rep
vect2 <- rep(1L, 5)
vect2
```

```
## [1] 1 1 1 1 1
```

``` r
# using seq
vect3 <- seq(10L)
vect3
```

```
##  [1]  1  2  3  4  5  6  7  8  9 10
```

## Character Vector

A character vector may contain a single character, a word or a group of words. The elements must be enclosed in single or double quotations.


``` r
# character vector
greetings <- c("hello", "good morning")
greetings
```

```
## [1] "hello"        "good morning"
```

``` r
# check data type
class(greetings)
```

```
## [1] "character"
```

## Logical Vector

A vector of logical values will either contain `TRUE` or `FALSE` or both.


``` r
# logical vector
vect_logic <- c(TRUE, FALSE, TRUE, TRUE, FALSE)
vect_logic
```

```
## [1]  TRUE FALSE  TRUE  TRUE FALSE
```

``` r
# check data type
class(vect_logic)
```

```
## [1] "logical"
```

In fact, you can create an `integer` vector and coerce it to type `logical`.


``` r
# integer vector
int_vect <- rep(0L:1L, 3)
int_vect
```

```
## [1] 0 1 0 1 0 1
```

``` r
# coerce to logical vector
log_vect <- as.logical(int_vect)
log_vect
```

```
## [1] FALSE  TRUE FALSE  TRUE FALSE  TRUE
```

``` r
# check data type
class(log_vect)
```

```
## [1] "logical"
```

## Naming Vector Elements

It is possible to name the different elements of a vector. The advantage of naming vector elements is that we can later on use these names to access the elements. Use `names()` to specify the names of a vector. You can specify the names while creating the vector or add them later.

### Method 1: Create vector and add names later


``` r
# create vector and add names later
vect1 <- c(1, 2, 3)

# name the elements of the vector
names(vect1) <- c("One", "Two", "Three")

# call vect1
vect1
##   One   Two Three 
##     1     2     3
```

### Method 2: Specify names while creating vector


``` r
# specify names while creating vector
vect2 <- c(John = 1, Jack = 2, Jill = 3, Jovial = 4)

# call vect2
vect2
##   John   Jack   Jill Jovial 
##      1      2      3      4
```

## Vector Coercion

Vectors are homogeneous i.e. all the elements of the vector must be of the same type. If we try to create a vector by combining different data types, the elements will be coerced to the most flexible type. The below table shows the order in which coercion occurs. 

`character` data type is the most flexible while `logical` data type is the least flexible. If you try to combine any other data type with `character`, all the elements will be coerced to type `character`. In the absence of `character` data, all elements will be coerced to `numeric`. Finally, if the data does not include `character` or `numeric` types, all the elements will be coerced to `integer` type. 

### Case 1: Different Data Types


``` r
# vector of different data types
vect1 <- c(1, 1L, 'one', TRUE)

# call vect1
vect1
## [1] "1"    "1"    "one"  "TRUE"

# check data type
class(vect1)
## [1] "character"
```

### Case 2: Numeric, Integer and Logical


``` r
# vector of different data types
vect1 <- c(1, 1L, TRUE)

# call vect1
vect1
## [1] 1 1 1

# check data type
class(vect1)
## [1] "numeric"
```

### Case 3: Integer and Logical


``` r
# vector of different data types
vect1 <- c(1L, TRUE)

# call vect1
vect1
## [1] 1 1

# check data type
class(vect1)
## [1] "integer"
```

To summarize, below is the order in which coercion takes place:

`logical` → `integer` → `double/numeric` → `character`

R coerces toward the **most flexible** type. If a vector contains a `character`
element, everything becomes `character`. Without `character`, elements coerce
to `numeric`. Without `numeric`, elements coerce to `integer`.

## Vector Operations

In this section, we look at simple operations that can be performed on vectors in R. Remember that the nature of the operations depends upon the type of data. Below are a few examples:

### Case 1: Vectors of same length


``` r
# create two vectors
vect1 <- c(1, 3, 8, 4)
vect2 <- c(2, 7, 1, 9)

# addition
vect1 + vect2
## [1]  3 10  9 13

# subtraction
vect1 - vect2
## [1] -1 -4  7 -5

# multiplication
vect1 * vect2
## [1]  2 21  8 36

# division
vect1 / vect2
## [1] 0.5000000 0.4285714 8.0000000 0.4444444
```

### Case 2: Vectors of different length

In the previous case, the length i.e. the number of elements in the vectors were same. What happens if the length of the vectors are unequal? In such cases, the shorter vector is recycled to match the length of the longer vector. The below example should clear this concept:


``` r
# create two vectors
vect1 <- c(2, 7)
vect2 <- c(1, 8, 5, 2)

# addition
vect1 + vect2
## [1]  3 15  7  9

# subtraction
vect1 - vect2
## [1]  1 -1 -3  5

# multiplication
vect1 * vect2
## [1]  2 56 10 14

# division
vect1 / vect2
## [1] 2.000 0.875 0.400 3.500
```

## Missing Data

Missing data is a reality. No matter how careful you are in collecting data for your analysis, chances are always high that you end up with some missing data. In R missing values are represented by `NA`. In this section, we will focus on the following:

- test for missing data
- remove missing data
- exclude missing data from analysis

### Detect missing data

We first create a vector with missing values. After that, we will use `is.na()` to test whether the data contains missing values. `is.na()` returns a logical vector equal to the length of the vector being tested. Another function that can be used for detecting missing values is `complete.cases()`. Below is an example:


``` r
# vector with missing values
vect1 <- c(1, 3, NA, 5, 2)

# use is.na
is.na(vect1)
## [1] FALSE FALSE  TRUE FALSE FALSE

# use complete.cases
complete.cases(vect1)
## [1]  TRUE  TRUE FALSE  TRUE  TRUE
```

### Omit missing data

In the presence of missing data, all computations in R will return `NA`. To avoid this, we might want to remove the missing data before doing any computation. `na.omit()` will remove all missing values from the data. Let us look at an example:


``` r
# vector with missing values
vect1 <- c(1, 3, NA, 5, 2)

# call vect1
vect1
## [1]  1  3 NA  5  2

# omit missing values
na.omit(vect1)
## [1] 1 3 5 2
## attr(,"na.action")
## [1] 3
## attr(,"class")
## [1] "omit"
```

### Exclude missing data

To exclude missing values from computations, use `na.rm` and set it to `TRUE`. 


``` r
# vector with missing values
vect1 <- c(1, 3, NA, 5, 2)

# compute mean
mean(vect1)
## [1] NA

# compute mean by excluding missing value
mean(vect1, na.rm = TRUE)
## [1] 2.75
```

## Index Vectors

One of the most important steps in data analysis is selecting a subset of data from a bigger data set. Indexing helps in retrieving values individually or a set of values that meet a specific criteria. In this chapter, we look at various ways of indexing/subsetting vectors.

`[]` is the index operator in R. We can use various expressions within `[]` to subset data. In R, **index positions begin at 1 and not 0**. To begin with, let us look at values in different index positions:


``` r
# random sample of 10 values
vect1 <- sample(10)
vect1
```

```
##  [1]  8  1  4  9  3  7  2  6 10  5
```

``` r
# return third element
vect1[3]
```

```
## [1] 4
```

``` r
# return seventh element
vect1[7]	
```

```
## [1] 2
```

### Out of range index


``` r
# random sample of 10 values
vect1 <- sample(10)
vect1
```

```
##  [1]  1 10  5  6  4  8  9  3  7  2
```

``` r
# return value at index 0
vect1[0]
```

```
## integer(0)
```

``` r
# length of the vector
length(vect1)
```

```
## [1] 10
```

``` r
# out of range index
vect1[11]	
```

```
## [1] NA
```

In the first case, we specified the index as 0 and in the second case we used the index 11, which is greater than the length of the vector. R returns an empty vector in the first case and `NA` in the second case.

### Negative Index

Using a negative index will delete the value in the said index position. Unlike other languages, it will not index elements from the
end of the vector counting backwards. Let us look at an example to understand how negative index works in R:


``` r
# random sample of 10 values
vect1 <- sample(10)
vect1
```

```
##  [1]  5  4  3  8  6  1  9  7 10  2
```

``` r
# drop third element
vect1[-3]
```

```
## [1]  5  4  8  6  1  9  7 10  2
```

``` r
# drop seventh element
vect1[-7]	
```

```
## [1]  5  4  3  8  6  1  7 10  2
```

### Subset Multiple Elements

If we do not specify anything within `[]`, all the elements in the vector will be returned. We can specify the index elements using any expression that generates a sequence of integers. Let us look at a few examples:


``` r
# random sample of 10 values
vect1 <- sample(10)
vect1
```

```
##  [1]  3  7  1 10  6  4  2  9  5  8
```

``` r
# return all elements
vect1[]
```

```
##  [1]  3  7  1 10  6  4  2  9  5  8
```

``` r
# return first 5 values
vect1[1:5]
```

```
## [1]  3  7  1 10  6
```

``` r
# return all values from the 5th position
end <- length(vect1)
vect1[5:end]
```

```
## [1] 6 4 2 9 5 8
```

If you are using the colon to generate the index positions, you will have to specify both the starting and ending position, else, R will return an error.

What if we want elements that are not in a sequence as we saw in the last example? In such cases, we have to create a vector using `c()` and use it to extract elements from the original vector. Below is an example:


``` r
# random sample of 10 values
vect1 <- sample(10)
vect1
```

```
##  [1]  8  2  7 10  4  9  6  3  5  1
```

``` r
# extract 2nd, 5th and 7th element
select <- c(2, 5, 7)
vect1[select]
```

```
## [1] 2 4 6
```

``` r
# extract elements in position 1 to 4, 6 and 9
select <- c(1:4, 6, 9)
vect1[select]
```

```
## [1]  8  2  7 10  9  5
```

### Subset Named Vectors

Vectors can be subset using the name of the elements. **When using name of elements for subsetting, ensure that the names are enclosed in single or double quotations**, else R will return an error. Let us look at a few examples:


``` r
vect1 <- c(score1 = 8, score2 = 6, score3 = 9)
vect1
```

```
## score1 score2 score3 
##      8      6      9
```

``` r
# extract score2
vect1['score2']
```

```
## score2 
##      6
```

``` r
# extract score1 and score3
vect1[c('score1', 'score3')]
```

```
## score1 score3 
##      8      9
```

### Subset using logical values

Logical values can be used to subset vectors. They are not very flexible but can be used for simple indexing. In all of the below examples, the logical vectors are recycled to match the length of the vector from which we subset data:


``` r
# random sample of 10 values
vect1 <- sample(10)
vect1
```

```
##  [1]  6  2  9  7  1  3  8  4  5 10
```

``` r
# returns all values
vect1[TRUE]
```

```
##  [1]  6  2  9  7  1  3  8  4  5 10
```

``` r
# empty vector
vect1[FALSE]
```

```
## integer(0)
```

``` r
# values in odd positions
vect1[c(TRUE, FALSE)]
```

```
## [1] 6 9 1 8 5
```

``` r
# values in even positions
vect1[c(FALSE, TRUE)]
```

```
## [1]  2  7  3  4 10
```

### Subset using logical expressions

Logical expressions can be used to extract elements that meet specific criteria. This method is most flexible and useful as we can combine multiple conditions using relational and logical operators. Before we use logical expressions, let us spend some time understanding comparison and logical operators as we will be using them extensively hereafter.

#### Comparison Operators

When you create an expression using a comparison operator, the output is always a logical value i.e. `TRUE` or `FALSE`. Let us see how we can use comparison operators to subset data:


``` r
# random sample of 10 values
vect1 <- sample(10)
vect1
```

```
##  [1]  7  9  1  5  4  2 10  3  8  6
```

``` r
# return elements greater than 5
vect1 > 5
```

```
##  [1]  TRUE  TRUE FALSE FALSE FALSE FALSE  TRUE FALSE  TRUE  TRUE
```

``` r
vect1[vect1 > 5]
```

```
## [1]  7  9 10  8  6
```

``` r
# return elements greater than or equal to 5
vect1 >= 5
```

```
##  [1]  TRUE  TRUE FALSE  TRUE FALSE FALSE  TRUE FALSE  TRUE  TRUE
```

``` r
vect1[vect1 >= 5]
```

```
## [1]  7  9  5 10  8  6
```

``` r
# return elements lesser than 5
vect1 < 5
```

```
##  [1] FALSE FALSE  TRUE FALSE  TRUE  TRUE FALSE  TRUE FALSE FALSE
```

``` r
vect1[vect1 < 5]
```

```
## [1] 1 4 2 3
```

``` r
# return elements lesser than or equal to 5
vect1 <= 5
```

```
##  [1] FALSE FALSE  TRUE  TRUE  TRUE  TRUE FALSE  TRUE FALSE FALSE
```

``` r
vect1[vect1 <= 5]
```

```
## [1] 1 5 4 2 3
```

``` r
# return elements equal to 5
vect1 == 5
```

```
##  [1] FALSE FALSE FALSE  TRUE FALSE FALSE FALSE FALSE FALSE FALSE
```

``` r
vect1[vect1 == 5]
```

```
## [1] 5
```

``` r
# return elements not equal to 5
vect1 != 5
```

```
##  [1]  TRUE  TRUE  TRUE FALSE  TRUE  TRUE  TRUE  TRUE  TRUE  TRUE
```

``` r
vect1[vect1 != 5]
```

```
## [1]  7  9  1  4  2 10  3  8  6
```

### Logical Operators

Let us combine comparison and logical operators to create expressions and use them to subset vectors:


``` r
# random sample of 10 values
vect1 <- sample(10)
vect1
```

```
##  [1]  9 10  5  2  8  1  7  6  4  3
```

``` r
# return all elements less than 8 or divisible by 3
vect1[(vect1 < 8 | (vect1 %% 3 == 0))]
```

```
## [1] 9 5 2 1 7 6 4 3
```

``` r
# return all elements less than 7 or divisible by 2
vect1[(vect1 < 7 | (vect1 %% 2 == 0))]
```

```
## [1] 10  5  2  8  1  6  4  3
```
