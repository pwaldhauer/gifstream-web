function showResult() {
	$('h2').show();
	$('#result').show();
	$('#explain').show();
}

function hideResult() {
	$('h2').hide();
	$('#result').hide();
	$('#explain').hide();
}

$(document).ready(function() {

	$('#submit').click(function() {
		// Validation
		var error = false;
		if (!$('#title').val()) {
			$('#title').addClass('error');
			$('#title-errormessage').show();
			error = true;
		} else {
			$('#title').removeClass('error');
			$('#title-errormessage').hide();
		}
		if (!$('#identifier').val()) {
			$('#identifier').addClass('error');
			$('#identifier-errormessage').show();
			error = true;
		} else {
			$('#identifier').removeClass('error');
			$('#identifier-errormessage').hide();
		}
		if (!$('#files').val()) {
			$('#files').addClass('error');
			$('#files-errormessage-empty').show();
			error = true;
		} else {
			$('#files').removeClass('error');
			$('#files-errormessage-empty').hide();
			$('#files-errormessage-links').hide();
		}
	
		if (error) {
			hideResult();
		} else {
			var stream = {};
			stream.version = 1;
			stream.title = $('#title').val();
			stream.identifier = $('#identifier').val();
			if ($('#license').val()) {
				stream.license = $('#license').val();
			}
			stream.files = [];
	
			var files = $('#files').val().split('\n');

			var regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i; //lol
	
			$.each(files, function() {
				if (this.match(regexp)) {
					var file = {};
					file.src = this;
					stream.files.push(file);
				}
			});
		
			// Cancel if #files doesn't contain any links
			if (stream.files.length === 0) {
				$('#files').addClass('error');
				$('#files-errormessage-links').show();
				hideResult();
			} else {
				var json = JSON.stringify(stream);
				$('#result').val(json);
				showResult();
			}
		}
	});
});
