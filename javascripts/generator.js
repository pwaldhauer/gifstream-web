var GifStreamGenerator = function GifStreamGenerator() {

}

GifStreamGenerator.prototype = Object.create(Object.prototype);

GifStreamGenerator.prototype.createStream = function createStream(title, identifier, license) {
	var stream = {};

	stream.version = 1;
	stream.title = title;
	stream.identifier = identifier;

	if (license) {
		stream.license = license;
	}

	stream.files = [];
	return stream;
}

GifStreamGenerator.prototype.prepareFiles = function prepareFiles(stream, file_string) {
	var files = file_string.split('\n');

	var regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i; //lol

	$.each(files, function() {
		if (this.match(regexp)) {
			var file = {};
			file.src = this;
			stream.files.push(file);
		}
	});
}

$(document).ready(function() {
	$('#submit').click(function() {
		// Validation
		$('.errormessage').hide();
		$('input, textarea').removeClass('error');


		var error = false;
		if (!$('#title').val()) {
			$('#title').addClass('error').next('.errormessage').show();
			error = true;
		}

		if (!$('#identifier').val()) {
			$('#identifier').addClass('error').next('.errormessage').show();
			error = true;
		}

		if (!$('#files').val()) {
			$('#files').addClass('error').next('.errormessage').show();
			error = true;
		}

		if (error) {
			$('.js-result').hide();
			return;
		}

		var generator = new GifStreamGenerator();

		var stream = generator.createStream($('#title').val(), $('#identifier').val(), $('#license').val());
		generator.prepareFiles(stream, $('#files').val());

		// Cancel if #files doesn't contain any links
		if (stream.files.length === 0) {
			$('#files').addClass('error').nextAll('.errormessage-links').show();
			$('.js-result').hide();
			return;
		}

		$('#result').val(JSON.stringify(stream));
		$('.js-result').show();
		location.hash = 'result';
	});
});
