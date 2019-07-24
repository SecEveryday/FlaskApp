/* Copyright 2017 TOSHIBA TEC CORPORATION All rights reserved */
App.StoreToApp = (function (global, $, undefined) {
    var responseData;
    var current_WFID;
	
	var duplex_mode="simplex";
	var outputfileformat="jpeg";
	var filename="";
	
	var jsonData={
				  "auto_adjust": true,
				  "auto_event": false,
				  "scan_parameter": {							
					  "duplex_type": duplex_mode,										  
					  "generate_preview": false,
					  "mixed_original_paper_size": false,
					  "omit_blank_page": false,				  				  
					  "image_adjustment_parameter": {
						"image_mode": "text",
						"image_quality": "middle",
						"scan_exposure": "auto",
						"scan_rotation": "angle0",
						"skew_correction": false
					  }	
				  },										
				  "scan_to_app_storage_parameter": {
					"file_output_method": {
					  "file_name": filename,
					  "output_file_format": outputfileformat     
					},
					"is_appconv_mode": false		
				 }
			};
	
    var init = function () {
        console.log("At StoreApp page");
		App.currentScreen = 'StoreToApp';
		App.Util.serverRequest(App.URL.webAPI.jobsScan,"GET", true, function (response) {
			if (response) {
				console.log("GET_StoreToApp is successful");	
			//	jsonData = response;
				console.log("Received JSON data ="+response);							
			} else {
				console.log("GET_StoreToApp error");									
			}
		});
    };
	
	$("#home").on('click',function() {
		window.location = "index.html";		
	});	
	
	$("#duplex_type").on('change',function() {
		console.log("Selected Duplex type = "+$( this ).val());		
		jsonData.scan_parameter.duplex_type=$( this ).val();
	});
	
	$("#output_file_format").on('change',function() {
		console.log("Selected FileFormat = "+$( this ).val());		
		jsonData.scan_to_app_storage_parameter.file_output_method.output_file_format=$( this ).val();		
	});
		
	$("#fileName").on('change',function() {
		console.log("Selected fileName = "+$( this ).val());
		jsonData.scan_to_app_storage_parameter.file_output_method.file_name=$( this ).val();		
	});
	
	var validate = function(){		
		var name_regex = /^[0-9a-zA-Z]+$/;
		console.log(jsonData.scan_to_app_storage_parameter.file_output_method.file_name.match(name_regex));
		if(!jsonData.scan_to_app_storage_parameter.file_output_method.file_name.match(name_regex) || jsonData.scan_to_app_storage_parameter.file_output_method.file_name.length == 0) {			
			console.log("Only Alphabets and numbers are allowed")					
			return false;
		}
	}
			
	$("#StoreApp_startScan").on("click", function () {		
		console.log("Start job entry");
		
		if(false == validate()){
			console.log("Enter Filename");
			$('#retresponse').val("Enter valid FileName. Only Alphabets and numbers are allowed");		
			return;
		}
		
		$('#StoreApp_startScan').prop('disabled',true);
		
		//$('#StoreApp_startScan').empty();
		$('#retresponse').val("StoreToApp: Scan started");		
		
		console.log(jsonData);
		
		App.Util.serverRequest(App.URL.webAPI.jobsScan,"POST", true, function (response) {
			if (response) {
				console.log("StoreToApp: Start job is success");
				current_WFID=response.WFID;					
				$('#retresponse').val("WFID="+response.WFID+",Status="+response.status);
				// Enable resume, finish and cancel buttons
				$('#StoreApp_resumeScan').prop('disabled',false);
				$('#StoreApp_finishScan').prop('disabled',false);
				$('#StoreApp_cancelScan').prop('disabled',false);
			} else {
				console.log("StoreToApp: Start job Error");					
				$('#retresponse').val("StoreToApp: Start job Error");
				$('#StoreApp_startScan').prop('disabled',false);				
			}
		}, jsonData); 		 
	});

    $("#StoreApp_resumeScan").on("click", function () {
		$('#StoreApp_resumeScan').prop('disabled',true);
        scanPatchOperation("resume");
    });

    $("#StoreApp_finishScan").on("click", function () {		
		$('#StoreApp_finishScan').prop('disabled',true);
		$('#StoreApp_cancelScan').prop('disabled',true);
        scanPatchOperation("finish");
    });
    
	$("#StoreApp_cancelScan").on("click", function () {		
		$('#StoreApp_finishScan').prop('disabled',true);
		$('#StoreApp_cancelScan').prop('disabled',true);
        scanPatchOperation("cancel");
    });
	
	function scanPatchOperation(action) {
        console.log(" start scanPatchOperation");
        console.log(current_WFID);
		$('#retresponse').val("StoreToApp: Start Action = "+action);
        App.Util.serverRequest(App.URL.webAPI.jobsScanSub + "/" + current_WFID, "PATCH", true, function (response) {
            responseData = JSON.stringify(response);
            if (response) {
                console.log("StoreToApp: Action = " + action + " : success");
				$('#retresponse').val("StoreToApp: Action = "+action+" success");
            } else {
                console.error("StoreToApp: Action = " + action + " : failed");
				$('#retresponse').val("StoreToApp: Action = "+action+" failed");
            }
        }, {
            "job_action": action
        });
		if(action == "resume"){
			$('#StoreApp_resumeScan').prop('disabled',false);				
		}
		else if(action == "finish"){
			$('#StoreApp_finishScan').prop('disabled',false);
			$('#StoreApp_cancelScan').prop('disabled',false);	
		}
		else if(action == "cancel"){
			$('#StoreApp_finishScan').prop('disabled',false);
			$('#StoreApp_cancelScan').prop('disabled',false);	
		}		
    };
	
    return {
        init: init,
        current_WFID: current_WFID
    }
}(window, jQuery));
