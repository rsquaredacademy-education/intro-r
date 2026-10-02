# scripts/webr-smoke.R
# Static smoke test for {webr-r} live cells: every cell must parse as R,
# reference only deployed data files, and load packages from the live set.
# (Full browser execution is covered by manual QA; this runs in CI < 30 s.)

live_pkgs <- c("dplyr", "readr", "ggplot2")

qmds <- list.files(pattern = "\\.qmd$")
stopifnot(length(qmds) > 0)

cells <- 0L
for (f in qmds) {
  lines <- readLines(f, warn = FALSE)
  starts <- grep("^```\\{webr-r\\}$", lines)
  ends <- grep("^```$", lines)
  for (s in starts) {
    e <- ends[ends > s][1]
    stopifnot(!is.na(e))
    code <- paste(lines[(s + 1):(e - 1)], collapse = "\n")
    invisible(parse(text = code))
    cells <- cells + 1L
    # every deployed URL must resolve to a file that exists under data-webr/
    for (u in regmatches(code, gregexpr(
      "https://intro-r\\.rsquaredacademy\\.com/data-webr/[A-Za-z0-9_.-]+", code))[[1]]) {
      local <- file.path("data-webr", basename(u))
      if (!file.exists(local)) stop("missing live data file: ", local, " (from ", f, ")")
    }
    # reading a bare sample requires a download.file() guard in the same cell
    if (grepl("read_csv\\(\"[A-Za-z0-9_.-]+\\.csv\"", code) &&
        !grepl("download\\.file\\(", code)) {
      stop("bare read_csv() without download.file() guard in ", f)
    }
    # every library() call must be in the live set
    for (p in regmatches(code, gregexpr(
      "(?<=library\\()[A-Za-z0-9.]+(?=\\))", code, perl = TRUE))[[1]]) {
      if (!p %in% live_pkgs) stop("package not in live set: ", p, " (from ", f, ")")
    }
  }
}

# roadmap budget: interactive cells are capped to keep the WASM payload off
# most pages and protect the mobile performance budget
if (cells > 5) stop("too many live cells: ", cells, " (max 5)")

message("webr smoke OK: ", cells, " cells across ", length(qmds), " files")