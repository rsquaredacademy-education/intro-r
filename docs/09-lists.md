# Lists in R {#lists-in-r}

## Introduction

Lists are very useful as they are heterogeneous i.e. they can contain different data types. If you remember, vectors and matrices are homogeneous i.e. they can contain only one type of data. If you include different data types, they will all be coerced to the same type. With lists, it is different. In this chapter, we will delve deeper into lists.

- how to create lists
- access list elements
- name list elements
- coerce other R objects to list
- coerce list to other R objects

## Creating Lists

To create a list, we use the `list()` function. Let us create a simple list to demonstrate how they can contain different data types.


``` r
# numeric vector
vect1 <- 1:10

# character vector 
vect2 <- c('Jack', 'John', 'Jill')

# logical vector
vect3 <- c(TRUE, FALSE)

# matrix
mat <- matrix(data = 1:9, nrow = 3)

# list
l <- list(vect1, vect2, vect3, mat)
l
```

```
## [[1]]
##  [1]  1  2  3  4  5  6  7  8  9 10
## 
## [[2]]
## [1] "Jack" "John" "Jill"
## 
## [[3]]
## [1]  TRUE FALSE
## 
## [[4]]
##      [,1] [,2] [,3]
## [1,]    1    4    7
## [2,]    2    5    8
## [3,]    3    6    9
```

If you observe the output, all the elements of the list retain their data types. Now let us learn how to access the elements of the list.

## Access List Elements

You can access the elements of a list using the following operators:

- `[[`
- `[`
- `$`

Let us try them one by one.


``` r
# using [[
l[[1]]
```

```
##  [1]  1  2  3  4  5  6  7  8  9 10
```

``` r
# using [
l[1]
```

```
## [[1]]
##  [1]  1  2  3  4  5  6  7  8  9 10
```

`[[` extracts the element itself (which may be a vector, matrix, data frame, or nested list), while `[` returns a new list containing the selected element(s). The `$` operator can be used only when we have named elements in the list. Let us add names to the elements. Use the `names()` function to add names to the list.


``` r
# named elements
names(l) <- c('vect1', 'vect2', 'vect3', 'mat')
l
```

```
## $vect1
##  [1]  1  2  3  4  5  6  7  8  9 10
## 
## $vect2
## [1] "Jack" "John" "Jill"
## 
## $vect3
## [1]  TRUE FALSE
## 
## $mat
##      [,1] [,2] [,3]
## [1,]    1    4    7
## [2,]    2    5    8
## [3,]    3    6    9
```

``` r
# use $
l$vect1
```

```
##  [1]  1  2  3  4  5  6  7  8  9 10
```

``` r
# use [[
l[['vect1']]
```

```
##  [1]  1  2  3  4  5  6  7  8  9 10
```

``` r
# use [
l['vect1']
```

```
## $vect1
##  [1]  1  2  3  4  5  6  7  8  9 10
```

## Coerce other objects

You can coerce other objects to list using `as.list()`.


``` r
# vector
vect1 <- 1:10
as.list(vect1)
```

```
## [[1]]
## [1] 1
## 
## [[2]]
## [1] 2
## 
## [[3]]
## [1] 3
## 
## [[4]]
## [1] 4
## 
## [[5]]
## [1] 5
## 
## [[6]]
## [1] 6
## 
## [[7]]
## [1] 7
## 
## [[8]]
## [1] 8
## 
## [[9]]
## [1] 9
## 
## [[10]]
## [1] 10
```

``` r
# matrix
mat <- matrix(data = 1:9, nrow = 3)
as.list(mat)
```

```
## [[1]]
## [1] 1
## 
## [[2]]
## [1] 2
## 
## [[3]]
## [1] 3
## 
## [[4]]
## [1] 4
## 
## [[5]]
## [1] 5
## 
## [[6]]
## [1] 6
## 
## [[7]]
## [1] 7
## 
## [[8]]
## [1] 8
## 
## [[9]]
## [1] 9
```

## Coerce list to other objects

Use `unlist()` to coerce a list to a vector.


``` r
# unlist
unlist(l)
```

```
##  vect11  vect12  vect13  vect14  vect15  vect16  vect17  vect18  vect19 vect110 
##     "1"     "2"     "3"     "4"     "5"     "6"     "7"     "8"     "9"    "10" 
##  vect21  vect22  vect23  vect31  vect32    mat1    mat2    mat3    mat4    mat5 
##  "Jack"  "John"  "Jill"  "TRUE" "FALSE"     "1"     "2"     "3"     "4"     "5" 
##    mat6    mat7    mat8    mat9 
##     "6"     "7"     "8"     "9"
```

``` r
# remove names
unlist(l, use.names = FALSE)
```

```
##  [1] "1"     "2"     "3"     "4"     "5"     "6"     "7"     "8"     "9"    
## [10] "10"    "Jack"  "John"  "Jill"  "TRUE"  "FALSE" "1"     "2"     "3"    
## [19] "4"     "5"     "6"     "7"     "8"     "9"
```
