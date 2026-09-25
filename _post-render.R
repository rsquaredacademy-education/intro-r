# _post-render.R — copy root static assets into docs/ after bookdown render,
# because bookdown::render_book() recreates docs/ and wipes untracked files.
assets <- c("robots.txt", "sitemap.xml")
for (f in assets) {
  if (file.exists(f)) {
    file.copy(f, file.path("docs", f), overwrite = TRUE)
    message("Successfully copied ", f, " to docs/")
  } else {
    warning("Missing static root asset: ", f)
  }
}
