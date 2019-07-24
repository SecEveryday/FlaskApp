var App = (function (global, $, undefined) {

    var appId = '';
	var jobStatus = '';
    var appToken = {};
    var appLanguage = 'en_US';
	var currentScreen = '';
	
    // Initialize the application
    
    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    };
		
	 /* --------------- event subscription ------------------*/
    var subscription =  function () {
        console.log("subscribe job eventstream");
        
        App.Util.subscribeWebSSE();
        App.Util.serverRequest(App.URL.webAPI.eventSubscriptionJobsURL, "POST", true, function (response) {
            responseData = JSON.stringify(response);
            if (response) {
                console.log("GET_Success:subscribe job eventstream");
		//		$('#retresponse').val("Job subscription (URL)"+responseData);              
            } else {
                console.log("GET_Error:subscribe job eventstream");              
				$('#retresponse').val("Job subscription (URL)"+responseData);
            }
        }, {
            "event_names": []
        });

        App.Util.serverRequest(App.URL._webapiContextRoot + "/subscription/eventstream/app/scheduler/timer", "POST", true, function (response) {
            responseData = JSON.stringify(response);
            if (response) {
                console.log("GET_Success:subscribe timer eventstream");                
		//		$('#retresponse').val("Job subscription(Timer)"+responseData);
            } else {
                console.log("GET_Error:subscribe timer eventstream");                
				$('#retresponse').val("Job subscription(Timer)"+responseData);
            }
        }, {
            "event_names": []
        });
    };

    /* -------------- event Unsubscription ------------------*/
    var unSubscription = function () {
        console.log("START : unsubscribe job eventstream");
        $('#eventStatus').empty();
		unsubsribeWebSSE();
        App.Util.serverRequest(App.URL.webAPI.eventSubscriptionJobsURL, "DELETE", true, function (response) {
            responseData = JSON.stringify(response);
            if (response) {
                console.log("DELETE_Success:unsubscribe for jobs eventstream");
                $('<p>' + responseData + '</p>').appendTo('#eventStatus');
            } else {
                console.log("DELETE_Error:unsubscribe for jobs eventstream");
                $('<p>' + responseData + '</p>').appendTo('#eventStatus');
            }
        });
        App.Util.serverRequest(App.URL._webapiContextRoot + "/subscription/eventstream/app/scheduler/timer", "DELETE", true, function (response) {
            responseData = JSON.stringify(response);
            if (response) {
                console.log("DELETE_Success:unsubscribe for timer eventstream");
                $('<p>' + responseData + '</p>').appendTo('#eventStatus');
            } else {
                console.log("DELETE_Error:unsubscribe for timer eventstream");
                $('<p>' + responseData + '</p>').appendTo('#eventStatus');
            }
        });
    };

	/* ----------------- Initialization  --------------------*/
    var init = function () {
        console.log('Application initialized...');
		currentScreen = "home";
	    var location = '';
        var arr = [];
	//	App.AppToApp.generateColorCode()
	/*	
		
		var today = new Date();
		var date = today.getFullYear()+':'+(today.getMonth()+1)+':'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+':'+time;
		console.log("Current Datetime - "+dateTime)
	*/	
	//	App.AppToApp.showDialog("success","Test");		
	//	xmlDoc = $.parseXML( "ZonalOCR.xml" ),
		
        App.appToken['X-WebAPI-AccessToken'] = getCookie('accessToken');        
        console.log("X-WebAPI-AccessToken="+App.appToken['X-WebAPI-AccessToken']);
        App.appId = "5bf02dbc-0eeb-11e7-a579-008091ae40df";

       // Subscribe for SSE events.
       // App.Util.subscribeSSE();
		subscription();
/*      
	   // Server side check 
		console.log("About to send request to the server");
		App.Util.serverRequest('/server/' + App.appId + "/addToDatabase", "POST", true, function (response) {
			if (response) {
				console.log(JSON.stringify(response));
				
				App.Util.serverRequest('/server/' + App.appId + "/queryFromDatabase", "POST", true, function (response) {
					if (response) {
						console.log(JSON.stringify(response));
					} else {
						console.log("error at queryFromDatabase HomeApp");
					}
				}, {
				"X-WebAPI-AccessToken": App.appToken['X-WebAPI-AccessToken']
				});
						
				
			} else {
				console.log("error at addToDatabase HomeApp");
			}
		}, {
		"X-WebAPI-AccessToken": App.appToken['X-WebAPI-AccessToken']
		});
*/

/*
		App.Util.serverRequest('/server/' + App.appId + "/queryFromDatabase", "POST", true, function (response) {
			if (response) {
				console.log(JSON.stringify(response));
			} else {
				console.log("error at queryFromDatabase HomeApp");
			}
		}, {		
		"name": "arvind"
		});
*/	

/*
		App.Util.serverRequest('/server/' + App.appId + "/readXML", "POST", true, function (response) {
			if (response) {
				console.log(JSON.stringify(response));
			} else {
				console.log("Error at readXML");
			}
		}, {		
		"name": "output1_ZonalOCR.xml"
		});
*/

/*
		$('#output').qrcode({width: 100,height: 100,text: "Name:Arvind, Building:Vaishnavi Solitaire, Division:TTEC, Dept:SL, Floor:3"});		
		// Trying to save the QR code
		var canvas = $('#output canvas');	
		
		//img = canvas.get(0).toDataURL("image/png").replace('data:image/png;base64', '');	
		img = canvas.get(0).toDataURL("image/jpeg")
		console.log(img)
		img = canvas.get(0).toDataURL("image/jpeg").replace('data:image/jpeg;base64', '');	
		App.Util.serverRequest('/server/' + App.appId + "/writeImage", "POST", true, function (response) {
			if (response) {
				console.log(JSON.stringify(response));
			} else {
				console.log("Error at writeImage");
			}
		}, {		
		"name": img
		});
*/		
    };	
	

    return {
        init: init,
        appId: appId,
		jobStatus: jobStatus,
        appToken: appToken,
        appLanguage: appLanguage,
		subscription: subscription,
		unSubscription: unSubscription,
		currentScreen: currentScreen		
    };
	
}(window, jQuery));


 
 
