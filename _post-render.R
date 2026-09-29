# _post-render.R — copy root static assets into docs/ after bookdown render,
# because bookdown::render_book() recreates docs/ and wipes untracked files.
assets <- c("robots.txt", "sitemap.xml")
# OG preview card (1200x630) deployed alongside rendered figures
if (file.exists("img/og-card.png")) {
  dir.create(file.path("docs", "img"), showWarnings = FALSE, recursive = TRUE)
  file.copy("img/og-card.png", file.path("docs", "img", "og-card.png"),
    overwrite = TRUE)
  message("Successfully copied img/og-card.png to docs/img/")
} else {
  warning("Missing static root asset: img/og-card.png")
}
for (f in assets) {
  if (file.exists(f)) {
    file.copy(f, file.path("docs", f), overwrite = TRUE)
    message("Successfully copied ", f, " to docs/")
  } else {
    warning("Missing static root asset: ", f)
  }
}
