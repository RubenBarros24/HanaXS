function readFromSF() {

	try {
		//readDestination(package, destination_name)  
		var destination = $.net.http.readDestination("acn.sand.S0015202079.tests.sucess_factors_ec_connection", "ECHCPoData");
		var client = new $.net.http.Client();
		//	var userID = $.request.parameters.get("userID");
		var userID = '00106032';
		var request = new $.web.WebRequest($.net.http.GET, '/?userID=' + userID);

		var response = client.request(request, destination).getResponse();

		if (response.body) {

			try {

				var result = response.body.asString();
				var jsonArray = JSON.parse(result);

				$.response.contentType = "application/json";
				$.response.status = $.net.http.OK;
				$.response.setBody(JSON.stringify(jsonArray));

			} catch (e) {

				$.response.setBody(e.message);
				$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			}

		}

	} catch (e) {

		$.response.setBody(e.message);
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	}

}

function writeToSF() {

	try {
		//readDestination(package, destination_name)  
		var destination = $.net.http.readDestination("acn.sand.S0015202079.tests.sucess_factors_ec_connection", "ECHCPoData");
		var client = new $.net.http.Client();
		var target = $.request.parameters.get("target");
		var request = new $.web.WebRequest($.net.http.POST, '/?target=' + target);

		request.contentType = "application/json; charset=UTF-8";
		var message = "{" +
			'"__metadata": {' +
			'"uri": "EmpPayCompRecurring(payComponent=' + "'CanteenBonus'" +
			",seqNumber=1L,startDate=datetime'2015-01-01T00:00:00',userId='cgrant1')" + '"' +
			'},' +
			'"paycompvalue": "800"' +
			'}';
		request.setBody(message);
		var response = client.request(request, destination).getResponse();

		if (response.body) {

			try {

				var result = response.body.asString();
				$.response.contentType = "application/json";
				$.response.status = $.net.http.OK;
				$.response.setBody(result);

			} catch (e) {

				$.response.setBody(e.message);
				$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
			}

		}

	} catch (e) {

		$.response.setBody(e.message);
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	}

}

function getLogin() {

	var body = '';
    body = JSON.stringify({
        "session": [{
        
          //$.session.getUsername() - Returns the user name of the logged-on database user
          "UserName": $.session.getUsername(),
        
         //$.session.language - Contains an empty string unless a language is explicitly set by the XS session layer.
         "Language": $.session.language,
        
         //$.session.getInvocationCount() - Returns the number of requests sent to the current session
         "InvocationCount": $.session.getInvocationCount(),
        
         //$.session.hasSystemPrivilege(privilegeName) - Checks whether the logged-on user has a specified system privilege
         "HasCreateSchemaPrivilege": $.session.hasSystemPrivilege("CREATE SCHEMA"),
        
         //$.session.getSecurityToken() - Returns unique session-specific token that could be used for XSRF prevention
         "SecurityToken": $.session.getSecurityToken()
        }]
    });
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;
    
}

var cmd = $.request.parameters.get('cmd');

switch (cmd) {

	case "read":
		readFromSF();
		break;
	case "write":
		writeToSF();
		break;
	case "login":
		getLogin();
		break;	
	default:
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		$.response.setBody('Invalid Command: ', cmd);
}