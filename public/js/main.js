// $("#conversation").on('keyup', function(e) {
// 	if (e.keyCode == 13) {
// 		//if typing enter
// 	}
// });


$("#clear").on('click', function() {
	$("#answer").html("");
});

let i = 0;
$("#start").on('click', function(e) {
	//Making ajax call to call in your app.js
	$.ajax({
		url: 'sendconvo',
		type: 'POST',
		data: $("#conversation-form").serialize(),
		success: function(res, status, xhr){
			console.log('SUCCESS');
			// Parsing back a string into JSON in order to access its elements
			var payload = JSON.parse(res.payload);
			if (payload.length > 1) {
				if (payload[0] === "") {
					$("#answer").append(payload[1] + "<br/>");
				} else {
					$("#answer").append(payload[0] + "<br/>").append(payload[1] +"<br/>");
				}
			} else {
				$("#answer").append(payload+"<br/>");
			}
			$("#conversation").val("");
		},
		error: function(xhr, textStatus, error) {
			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	});
	//e.preventDefault();
});