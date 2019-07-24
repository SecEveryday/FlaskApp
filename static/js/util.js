App.Util = (function (global, $, undefined) {

    /* ------------------------------------------------- */
    /* LOCALIZATION */
    /* ------------------------------------------------- */

    /* Get the message for a code in a particular language. */
    var getMessage = function (code) {
        return App.Locale["messages"][App.appLanguage][code];
    };

    //------------------------------------------------------------------------
    /* Set the text of all elements in index.html having attribute data-message-id with the proper localized message. */

    var updateMessages = function () {
        console.log("Language: " + App.appLanguage)
        $.each($(".js-localize"), function () {
            $(this).text(App.Locale["messages"][App.appLanguage][$(this).attr("data-message-id")]);
        });
    };
    /* ------------------------------------------------- */
    /* SSE SUBSCRIPTION */
    /* ------------------------------------------------- */

    var subscribeSSE = function () {
        console.log('Subscribing for SSE (AppEvents):Enter');
        global.EventManager2 = new cAppEventManager(App.appId, App.appToken['X-WebAPI-AccessToken']);
        global.EventManager2.addEventListener(App.EventReceiver2.eventReceiver2);
        global.EventManager2.startAppEvents();
		console.log('Subscribing for SSE (AppEvents):exit');
    };
	
	var subscribeWebSSE = function () {
        console.log('Subscribing for SSE (WebApi):Enter');
        global.EventManager = new cAPIEventManager(App.appId, App.appToken['X-WebAPI-AccessToken']);
        global.EventManager.addEventListener(App.EventReceiver.eventReceiver);
        global.EventManager.startAPIEvents();
        console.log('Subscribing for SSE (WebApi):Exit');
    };
    
    var unsubsribeSSE = function () {
        console.log("At SSE unsubscription");
        /*global.EventManager.removeAllEventListener();
        global.EventManager.stopAPIEvents();*/
        global.EventManager2.stopAppEvents();
        
    }
	
	
	var unsubsribeWebSSE = function () {
        console.log("At SSE unsubscription:Enter");
        global.EventManager.removeAllEventListener();
        global.EventManager.stopAPIEvents();
		console.log("At SSE unsubscription:Exit");
        
        
    }

    /* ------------------------------------------------- */
    /* AJAX REQUEST */
    /* ------------------------------------------------- */

    var serverRequest = function (URL, method, asyncStatus, callback, jsonData) {
        console.log("Request URL: " + URL + ", Method: " + method);
        if (jsonData) {
            jsonData = JSON.stringify(jsonData);
            console.log("POST Data : " + jsonData);
        }

        $.ajax({
            url: URL,
            type: method,
            async: asyncStatus,
            headers: App.appToken,
            data: jsonData,
            contentType: "application/json",
            dataType: "json",
            cache: true,
            success: function (response) {
                console.log("Response Data: " + JSON.stringify(response));
                callback(response);
            },
            error: function (xhr, status, error) {
                console.error(xhr.status + ', ' + status + ', ' + error);
                console.error(xhr.responseText);
                callback(null);
            }
        });
    };

    return {
        serverRequest: serverRequest,
        subscribeSSE: subscribeSSE,
        getMessage: getMessage,
        updateMessages: updateMessages,
        unsubsribeSSE: unsubsribeSSE,
		subscribeWebSSE:subscribeWebSSE,
		unsubsribeWebSSE:unsubsribeWebSSE

    };

})(window, jQuery);