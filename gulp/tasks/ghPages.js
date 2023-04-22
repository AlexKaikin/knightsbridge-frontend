import ghPages from 'gulp-gh-pages'

export const ghDeploy = () => {
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {}).pipe(ghPages())
}
