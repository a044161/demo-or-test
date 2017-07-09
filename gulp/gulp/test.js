'use strict';

function html(){
	return gulp.src(path.join(_path.src,_file_type.html))
			.pipe(fileInclude({
				prefix: '@@',
				basePath: path.join(_path.src,_file_type.html)
			}))
			.pipe(cached('html'))
			.pipe(gulp.dest(_path.dist))
			.pipe(stream())
}

module.exports = html;