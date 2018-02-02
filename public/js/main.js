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
	//console.log($("#conversation").val());
	$.ajax({
		url: 'sendconvo',
		type: 'POST',
		//xheaders: {  'Access-Control-Allow-Origin': 'https://moodlewatson.mybluemix.net' },
		data: $("#conversation-form").serialize(),
		success: function(res, status, xhr){
			console.log('SUCCESS');
			var payload = JSON.parse(res.payload);
			//console.log(payload.length);
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
			//$("#answer").append(status);
			//$("#answer").append(xhr);
			//$("#answer").html(res + "<br/>" + status + "<br/>" + xhr);
		},
		error: function(xhr, textStatus, error) {
			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
		}
	});
	//e.preventDefault();
});