# Your First Data Wrangling {#first-wrangle}

> **Learning Objectives:** After this chapter you will be able to:
> - Use the five core `dplyr` verbs: `filter()`, `select()`, `mutate()`,
>   `arrange()`, `summarise()`.
> - Chain steps with the native base pipe `|>`.
> - Know where to go next after this book.


``` r
library(dplyr)
```

```
## Warning: package 'dplyr' was built under R version 4.5.3
```

``` r
# ggplot2 bundles the `mpg` dataset (MIT license, same as ggplot2 itself)
data(mpg, package = "ggplot2")
```

We use the native base pipe `|>` (standard since R 4.1.0; zero external
dependencies). We do **not** use `%>%`.

## The five verbs


``` r
mpg |>
  filter(manufacturer == "audi") |>
  select(manufacturer, model, displ, hwy) |>
  mutate(km_per_litre = hwy * 0.425144) |>
  arrange(desc(hwy))
```

```
## # A tibble: 18 × 5
##    manufacturer model      displ   hwy km_per_litre
##    <chr>        <chr>      <dbl> <int>        <dbl>
##  1 audi         a4           2      31        13.2 
##  2 audi         a4           2      30        12.8 
##  3 audi         a4           1.8    29        12.3 
##  4 audi         a4           1.8    29        12.3 
##  5 audi         a4 quattro   2      28        11.9 
##  6 audi         a4           3.1    27        11.5 
##  7 audi         a4 quattro   2      27        11.5 
##  8 audi         a4           2.8    26        11.1 
##  9 audi         a4           2.8    26        11.1 
## 10 audi         a4 quattro   1.8    26        11.1 
## 11 audi         a4 quattro   1.8    25        10.6 
## 12 audi         a4 quattro   2.8    25        10.6 
## 13 audi         a4 quattro   2.8    25        10.6 
## 14 audi         a4 quattro   3.1    25        10.6 
## 15 audi         a4 quattro   3.1    25        10.6 
## 16 audi         a6 quattro   3.1    25        10.6 
## 17 audi         a6 quattro   2.8    24        10.2 
## 18 audi         a6 quattro   4.2    23         9.78
```


``` r
mpg |>
  summarise(mean_hwy = mean(hwy), n = dplyr::n())
```

```
## # A tibble: 1 × 2
##   mean_hwy     n
##      <dbl> <int>
## 1     23.4   234
```

> **Common Mistake:** `mean()` on a vector with `NA` returns `NA`.
> Add `na.rm = TRUE` when missing values are present.

## Practice Check

**Knowledge Check:** *Filter then select*
What does `mpg |> filter(manufacturer == "audi") |> select(model, hwy)` return?

<details>
<summary>Click to reveal answer</summary>

**Answer:** A data frame with two columns (`model`, `hwy`) containing only
the rows where `manufacturer` is `"audi"`.

*Explanation:* `filter()` keeps matching rows; `select()` keeps matching
columns. The `|>` pipe passes the left-hand result into the first argument
of the right-hand function.
</details>

**Knowledge Check:** *`mutate()` adds columns*
What does `mpg |> mutate(km_per_litre = hwy * 0.425144)` return, and how many
rows does the result have compared to `mpg`?

<details>
<summary>Click to reveal answer</summary>

**Answer:** The full `mpg` data with one extra column (`km_per_litre`); the
row count is unchanged.

*Explanation:* `mutate()` adds (or modifies) columns row-wise — it never
adds or removes rows. Use `filter()` to change row counts.
</details>

**Knowledge Check:** *`arrange()` ordering*
After `mpg |> arrange(desc(hwy))`, which kind of car sits in row 1?

<details>
<summary>Click to reveal answer</summary>

**Answer:** The car with the highest highway mileage (`hwy`).

*Explanation:* `arrange()` sorts ascending by default; wrapping in `desc()`
flips it to descending, so the maximum comes first.
</details>

**Knowledge Check:** *`summarise()` collapses rows*
How many rows does `mpg |> summarise(mean_hwy = mean(hwy), n = dplyr::n())`
return, and why?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Exactly one row: the mean of `hwy` across the whole dataset and
the total row count.

*Explanation:* Without `group_by()`, `summarise()` collapses the entire data
frame into a single summary row.
</details>

**Knowledge Check:** *Reading a pipeline*
Read this pipeline aloud in order: `mpg |> filter(manufacturer == "audi") |> select(model, hwy) |> arrange(desc(hwy))`. What question does it answer?

<details>
<summary>Click to reveal answer</summary>

**Answer:** "Among Audi models, which has the best (and worst) highway
mileage?" — it keeps only Audis, keeps the model and mileage columns, and
sorts best-first.

*Explanation:* Pipelines read top-to-bottom as a sequence of verbs; narrating
each step in plain words is the fastest way to check you built the right one.
</details>

## Where to go next

> **Where to go next:**
> - Book: [R for Data Science (2e)](https://r4ds.hadley.nz/) — start at Chapter 1
> - Courses: [Rsquared Academy](https://www.rsquaredacademy.com/) Data Wrangling series
> - More books: [ebooks.rsquaredacademy.com](https://ebooks.rsquaredacademy.com/)
