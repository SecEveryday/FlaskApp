App.AppToApp = (function (global, $, undefined) {
	var selectedUserIndex=0;
    var responseData;
    var current_WFID;
	var duplex_mode="simplex";
	var color_mode="auto";
	var paper_size="a4";
	var outputfileformat="tiff_multi";
	var filename="test";
	var previewEnabled=false;
	var omitblankpage=false;
	var imagemode="text";
	var imagequality="high";	
	var image_fileformat="jpeg";	
	var image_fileformat2="searchable_pdf_multi";
	
	var outputFileName="output1";
	var outputFileName2="scannedpostalcover";
	//var jobStatus = ""
	var outputStoragePath="";
	var inputFileName =[];
	
	var name = "Arvind";
	var division = "TTEC";
	var department ="TTEC-SL";
	var building = "Essae Vaishnavi Solitaire";
	var floor="3";
	var emailID="arvind.mohan@toshiba-tsip.com";
	var cubicle="";
	var colorCode="";
	var img="";
	var jpegQRCode="";
	var jsonCode ={
		"building":{
			"Essae Vaishnavi Solitaire": {
				"id": "B1",	
				"division": {
					"SS": {
						"id": "D1",
						"dept":{
							"Semicon":{
							"id":"DEP1",
							"floor":{
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"	
								}
							},
							"RND":{
							"id":"DEP2",
							"floor":{
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"						
								}
							},
							"Mobile":{
							"id":"DEP3",
							"floor":{						
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"	
								}
							}					
						}
					},
					"TTEC": {
						"id": "D2",
						"dept":{
							"TTEC-AL":{
							"id":"DEP1",
							"floor":{
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"						
								}
							},
							"TTEC-SL":{
							"id":"DEP2",
							"floor":{
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"									
								}
							},
							"TTEC-DL":{
							"id":"DEP3",
							"floor":{						
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"	
								}
							},					
							"TTEC-CI":{
							"id":"DEP4",
							"floor":{						
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"	
								}
							}
						}
					}
				}				
			},
			"Fortune Summit": {
				"id": "B2",	
				"division": {
					"TMSC": {
						"id": "D1",
						"dept":{
							"Medical":{
							"id":"DEP1",
							"floor":{
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"	
								}
							},
							"RND":{
							"id":"DEP2",
							"floor":{
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"						
								}
							},
							"Imaging":{
							"id":"DEP3",
							"floor":{						
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"	
								}
							}					
						}
					},
					"tmc": {
						"id": "D2",
						"dept":{
							"tmc-1":{
							"id":"DEP1",
							"floor":{
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"							
								}
							},
							"tmc-2":{
							"id":"DEP2",
							"floor":{
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"							
								}
							},
							"tmc-3":{
							"id":"DEP3",
							"floor":{						
								"1":"1",
								"2":"2",
								"3":"3",
								"4":"4",
								"5":"5",
								"6":"6"	
								}
							}
						}
					}
				}				
			}
		}
	}
    var init = function () {
        console.log("at home page");		
    };
	
	/* ---------------------------------------- Initial Display ---------------------------------------------------- */	
	var _initialDisplay = function () {    
		console.log("Initial Display")
		
		img="";
		
		$('#retresponse').val('Place postal mail on Glass Bed and press "Start Scan" button');
		
		//$('.progress-bar').css('width', 0).attr('aria-valuenow', 0); 		
		//$('#progress-bar').removeClass('w3-show').addClass('w3-hide')
		
		$('#progress-bar').css('width', 0).attr('aria-valuenow', 0); 		
		
		$('#AppToApp_startScan').prop('disabled',false);		
		$('#AppToApp_report').prop('disabled',false);		
		
		$('#userinfotable').removeClass('w3-show').addClass('w3-hide');
		
		App.jobStatus=''
		
		// Empty the output contents
		$('#output').empty()
						
		$('#progress-bar').removeClass('w3-hide').addClass('w3-show')
		//window.location="index.html"		
    }
	
	/* ---------------------------------------- Generate the ColorCode ---------------------------------------------------- */	
	var generateColorCode = function(data){
		console.log("Received data for generating color code = "+JSON.stringify(data))
		// Logic for generating color code
		
		var ilocation=1
		var today = new Date();
		var date = today.getFullYear()+':'+(today.getMonth()+1)+':'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+':'+time;
		console.log("Current Datetime - "+dateTime)
		
	//	dateTime = ""+(today.getMonth()+1)+"."+today.getDate()+"."+today.getHours()+"."+today.getMinutes()+"."+today.getSeconds();
		
		dateTime = ""+(today.getMonth()+1)+today.getDate()+today.getHours()+today.getMinutes()+today.getSeconds();
		console.log("Unique Code - "+dateTime)
		
		/*
		data ={
			'name':'arvind',
		    'division':'TTEC',
			'department':'TTEC-SL',
			'building':'Essae Vaishnavi Solitaire',
			'email':'arvind.mohan@toshiba-tsip.com',
			'floor':'3',
			'cubicle':85
		}
		
		console.log("Division:"+jsonCode["building"]["Essae Vaishnavi Solitaire"]["division"]["ss"]["id"])		
		console.log("Department:"+jsonCode["building"]["Essae Vaishnavi Solitaire"]["division"]["ss"]["dept"]["semicon"]["id"])
		console.log("Floor:"+jsonCode["building"]["Essae Vaishnavi Solitaire"]["division"]["ss"]["dept"]["semicon"]["floor"]["1"])
		console.log(jsonCode["building"][data.building]["division"][data.division]["id"])
		*/
		
		if(parseInt(data.cubicle)>25 && parseInt(data.cubicle)<=50)
			ilocation=2
		else if(parseInt(data.cubicle)>50 && parseInt(data.cubicle)<=75)
			ilocation=3
		else
			ilocation=4
		colorCode=jsonCode["building"][data.building]["id"]+':'+jsonCode["building"][data.building]["division"][data.division]["id"]+':'+jsonCode["building"][data.building]["division"][data.division]["dept"][data.department]["id"]+':'+jsonCode["building"][data.building]["division"][data.division]["dept"][data.department]["floor"][data.floor]+'F:'+ilocation+'L:'+dateTime
		console.log("ColorCode - "+colorCode)
	
	//	colorCode="A1-D4-03F1-85"
	
		console.log("generateColorCode:: ColorCode value ="+colorCode)
		return colorCode;
	}

	/* ---------------------------------------- Convert to OCR ---------------------------------------------------- */	
		
	var AppToApp_ConvertOCR = function(){
		App.Util.serverRequest(App.URL.webAPI.listAppConvFiles,"GET", true, function (response) {
			if (response) {
				console.log("AppToApp_ConvertOCR:listAppConvFiles is successful");
				
				$('#retresponse').val("Analyzing the Scanned data");
				// Changing the progress from 30-40%
				move(30,40,0)						
				
				current_WFID=response.WFID;	
				console.log("AppToApp_ConvertOCR::value=" + response.storage_path_list)
				storagePathList = response.storage_path_list;				
				storagePathList.forEach(function (item) {
					console.log("AppToApp_ConvertOCR::Item="+item);						
					inputFileName.push(item);					
				});
			
			if(inputFileName.length != 0){
				console.log("AppToApp_ConvertOCR::Selected FileNames = "+inputFileName);	
				
				appconv_jsonData = {
				  "appconv_input_parameter": {
					"input_file_name_list": inputFileName
				  },		  
				   "appconv_ocr_parameter": {
					"enabled": true,
					"ocr_settings": {
					  "autorotation_enabled": true,
					  "barcode_checkdigit_enabled": true,
					  "barcode_output_enabled": true,
					  "barcode_supplement": "auto",
					  "barcode_type_list": [
						"auto"
					  ],
					  "barcode_with_startstop_code": true,
					  "primary_language": "english",
					  "secondary_language": "none"
					},
					"zone_ocr_enabled":true,
					"zone_ocr_settings":{
						"specified_method": "all_pages",
						"zone_ocr_page_list": [
							{
								"page_number": 1,
								"zone_ocr_rectangle_list": [
									{
										"barcode_type_list": [],
										"bottom": 377,
										"left": 104,
										"ocr_type": "text",
										"rectangle_number": 1,
										"rectangle_type": "surround",
										"right": 342,
										"top": 353 									
									},
									{
										"barcode_type_list": [],
										"bottom": 1167,
										"left": 7,
										"ocr_type": "text",
										"rectangle_number": 2,
										"rectangle_type": "surround",
										"right": 1631,
										"top": 7 									
									}
								]		
							
							}
						]
					}
				  },		
					"appconv_storage_parameter": {
					"output_file_format": image_fileformat,
					"output_file_name": outputFileName,
					"storage_path": outputStoragePath
				  },				  
				  "auto_adjust": true,
				  "auto_event": false		  
				};
								
				$('#retresponse').empty();
			//	$('#retresponse').val("Success in getting the File list");															
				// Changing jobStatus to AppToApp1
				App.jobStatus = "AppToApp1"
						
				App.Util.serverRequest(App.URL.webAPI.appConv,"POST", true, function (response) {
					if (response) {
						console.log("AppToApp_ConvertOCR:appConv is successful");						
					//	$('#retresponse').val(response["value"]);
					//	$('#retresponse').val("WFID="+response.WFID+",Status="+response.status);
						$('#retresponse').val("Processing the Scanned data");
						// Changing the progress from 40-50%
						move(40,50,0)						
						
					} else {
						console.log("AppToApp_ConvertOCR:Error in appConv");
						console.log("value=" + response["value"])
					//	$('#retresponse').val(response["value"]);
					//	$('#retresponse').val("WFID="+response.WFID+",Status="+response.status);
						$('#retresponse').val("Error is processing the scanned data");
						_initialDisplay();
					}
					}, appconv_jsonData
				); 
			}
				
			} else {
				console.log("AppToApp_ConvertOCR:get file list");
				//alert("Error getting files -"+response.error[0].description);
				$('#retresponse').val("Error is processing the scanned data");
				_initialDisplay();				
			}
		});	
	};
	
	/* ---------------------------------------- Convert File Format to PDF ---------------------------------------------------- */	
	
	var AppToApp_ConvertFileFormat = function (){
		App.Util.serverRequest(App.URL.webAPI.listAppConvFiles,"GET", true, function (response) {
			if (response) {
				console.log("AppToApp_ConvertFileFormat::GET Files is successful");
				
				console.log("AppToApp_ConvertFileFormat::File List =" + response.storage_path_list)
				storagePathList = response.storage_path_list;				
				storagePathList.forEach(function (item) {
					console.log("AppToApp_ConvertFileFormat::Item="+item);						
					inputFileName.push(item);					
				});
			
				if(inputFileName.length != 0){
				
					console.log("AppToApp_ConvertFileFormat Enter");
					console.log("AppToApp_ConvertFileFormat::current_WFID = "+current_WFID);	
							
					appconv_jsonData = {
					  "appconv_input_parameter": {
						"input_file_name_list": inputFileName
					  },		  		
					  "appconv_ocr_parameter": {
						"enabled": true,		  
					  },			
					  "appconv_storage_parameter": {
						"output_file_format": image_fileformat2,
						"output_file_name": outputFileName2,
						"storage_path": outputStoragePath
					  },
					  "auto_adjust": true,
					  "auto_event": false,	
					  "parent_workflow_id": current_WFID 		
					};
							
				//	$('#retresponse').empty();
				//	$('#retresponse').val("Success in getting the File list");											
					
			
					App.Util.serverRequest(App.URL.webAPI.appConv,"POST", true, function (response) {
						if (response) {
							console.log("AppToApp_ConvertFileFormat::Job is successful");
							current_WFID=response.WFID;	
						//	console.log("value=" + response["value"])
						//	$('#retresponse').val(response["value"]);
						//	$('#retresponse').val("WFID="+response.WFID+",Status="+response.status);
							
							// Changing jobStatus to AppToApp2
							App.jobStatus = "AppToApp2"
							
							$('#retresponse').empty();
							$('#retresponse').val("Converting the Scanned data");
							// Changing the progress from 60-70%
							move(60,70,0)
							
						} else {
							console.log("AppToApp_ConvertFileFormat Error:Job Error");
						//	console.log("value=" + response["value"])
						//	$('#retresponse').val(response["value"]);
						//	$('#retresponse').val("WFID="+response.WFID+",Status="+response.status);
							$('#retresponse').val("Error in converting the scanned data");
							_initialDisplay();
						}
						}, appconv_jsonData
					); 	
				}
			}
		});
	};
	
	/* ---------------------------------------- Analyze the Zone OCR xml file ---------------------------------------------------- */		
	
	var AppToApp_AnalyzeXML = function() {		
		
		var nameListfromXML;
		// Send a reuqest to server to read the zone ocr'ed xml and get the name 
		App.Util.serverRequest('/server/' + App.appId + "/readXML", "POST", true, function (response) {
			if (response) {
				console.log("AppToApp_AnalyzeXML Response- "+JSON.stringify(response));
			//	nameListfromXML = 'arvind'
				nameListfromXML = response.value
				console.log("AppToApp_AnalyzeXML::Name from XML file is "+nameListfromXML)
				
				App.Util.serverRequest('/server/' + App.appId + "/queryFromDatabase", "POST", true, function (response) {
					if (response) {
						console.log("AppToApp_AnalyzeXML::Information received from database - "+JSON.stringify(response));

						name = response.name;
						division = response.division;
						department =response.department;
						building = response.building;
						floor=response.floor;
						emailID=response.email;
						cubicle=response.cubicle;
						console.log("AppToApp_AnalyzeXML::Cubicle - "+cubicle)
						colorCode = generateColorCode(response)			
						// Empty the output contents
						$('#output').empty()
						// Generate the QR Code
						$('#output').qrcode({width: 100,height: 100,text: colorCode});
						
						// Convert to canvas and get the image url. Get the base64 encoded jpeg file and send to the server for saving the image
						// Server needs to decode and save the image
						var canvas = $('#output canvas');				
					//	img = canvas.get(0).toDataURL("image/png");		
					//	console.log("AppToApp_AnalyzeXML::Image path - "+img)
						img = canvas.get(0).toDataURL("image/jpeg").replace('data:image/jpeg;base64', '');	
						
						App.Util.serverRequest('/server/' + App.appId + "/writeImage", "POST", true, function (response) {
							if (response) {								
								console.log("AppToApp_AnalyzeXML::Response - "+JSON.stringify(response));
								jpegQRCode = response.value;
								console.log("AppToApp_AnalyzeXML::Jpeg QR Code file path - "+jpegQRCode)
								if(emailID.length != 0){
									
									$('#retresponse').val("Match Found - User is present in the database");
									move(80,85,0);
									
									App.Util.serverRequest('/server/' + App.appId + "/addToUserMailInfo", "POST", true, function (response) {
									if (response) {	
										console.log("AppToApp_AnalyzeXML::addToUserMailInfo swuccess")	
										move(85,90,0);
										// Send Email to recipient
										AppToApp_SendEmail(emailID);
									}else{
										console.log("AppToApp_AnalyzeXML::addToUserMailInfo failed")
										$('#retresponse').val("Error in updating the database");	
										showDialog("error","Error in updating the database");
									}
									
									}, {
									"code": colorCode,												
									"name": name,
									"division": division,
									"department": department,
									"building": building,
									"emailID": emailID,
									"floor": floor,									
									"cubicle": cubicle									
									});
								}
								else{
									console.log("AppToApp_AnalyzeXML::The name present in the scanned data does not match with the database")
									$('#retresponse').val("Error in matching the name in the scanned data with the database");	
									showDialog("error","Error in matching the name in the scanned data with the database. Please try again with correct postal cover intended for this organization");
								}
							} else {
								console.log("AppToApp_AnalyzeXML::Error at writeImage");
								$('#retresponse').val("Error in matching the name in the scanned data with the database");	
								showDialog("error","Error in matching the name in the scanned data with the database. Please try again with correct postal cover intended for this organization");
							}
						}, {		
						"name": img
						});
					} else {
						console.log("AppToApp_AnalyzeXML::Error at queryFromDatabase");
						$('#retresponse').val("Error in matching the name in the scanned data with the database");	
						showDialog("error","Error in matching the name in the scanned data with the database. Please try again with correct postal cover intended for this organization");
					}
				}, {		
				"name": nameListfromXML
				});
		
				
			} else {
				console.log("Error at readXML");
				$('#retresponse').val("Error in matching the name in the scanned data with the database");	
				showDialog("error","Error in matching the name in the scanned data with the database. Please try again with correct postal cover intended for this organization");
			}
		}, {		
		"name": "output1_ZonalOCR.xml"
		});
		
	//	$('#output').qrcode("Name:Arvind, Building:Vaishnavi Solitaire, Division:TTEC, Dept:SL, Floor:3");
	//	$('#output').qrcode({width: 100,height: 100,text: "Name:Arvind, Building:Vaishnavi Solitaire, Division:TTEC, Dept:SL, Floor:3"});
		
	/*	
		var dl = document.createElement('a');
		dl.setAttribute('href', img);
		dl.setAttribute('download','qrcode.png');
		// simulate a click will start download the image, and name is qrcode.png.
		dl.click();
	*/	
	};
	
	/* ---------------------------------------- Send Email to the Recipient ---------------------------------------------------- */	
	
	var AppToApp_SendEmail = function(sender_emailID) {
		console.log("AppToApp_SendEmail::Sender EmailID="+sender_emailID)
/*		
		// Generating QR code
		$('#output').qrcode({width: 100,height: 100,text: "Name:Arvind, Building:Vaishnavi Solitaire, Division:TTEC, Dept:SL, Floor:3"});
		
		// Trying to save the QR code
		var canvas = $('#output canvas');	
		img = canvas.get(0).toDataURL("image/png");		
*/		
	/*					
		var dl = document.createElement('a');
		dl.setAttribute('href', img);
		dl.setAttribute('download','qrcode.png');
		// simulate a click will start download the image, and name is qrcode.png.
		dl.click();
		
		// draw to canvas...
		canvas.get(0).toBlob(function(blob) {
		saveAs(blob, "image.png");
		});
	*/	
	
		var emailSendEnable = false;
		var smtpclientEnable = false;
		console.log("AppToApp_SendEmail::Start Send Email entry");
		
	//	var toaddress='arvind.mohan@toshiba-tsip.com';					
		var toaddress=sender_emailID;					
		var subject='[New Mail Received][Code:'+colorCode+'] New Postal Mail reception notification';
		var body='\
Dear Sir/Madam,\n \
A new postal mail intended to you has been recieved and placed in the reception.\n \
Please show the below QR code to reception and collect the mail.\n \n \
If you want to keep the mail, then reply to this mail ID by adding [Keep] in the subject.\n \
If you do not want to keep the mail, then reply to this mail ID by adding [Trash] in the subject.\n \n \
Note: The mail will be kept in the reception for a period of 10 days.\n \n \
Regards,\n \
Admin';
		
		console.log("AppToApp_SendEmail::ToAddress="+toaddress+",Subject="+subject+",Body="+body);
				
		// Check for EmailSend enable or not
		App.Util.serverRequest(App.URL.webAPI.functionsettings,"GET", true, function (response) {
			if (response) {
				console.log("AppToApp_SendEmail::EmailSend enable is "+response.send_to_email_is_enabled);		
				emailSendEnable= response.send_to_email_is_enabled;
				if(true == emailSendEnable){
					App.Util.serverRequest(App.URL.webAPI.smtpclientsetting,"GET", true, function (response) {
						if (response) {
							console.log("AppToApp_SendEmail::SMTPClient enable is "+response.smtpclient_is_enabled);								
							smtpclientEnable=response.smtpclient_is_enabled;	

							if(true == smtpclientEnable){
							
								console.log("AppToApp_SendEmail::EmailSend and SMTP address are configured properly")
								if(toaddress.length == 0){
									// It should not come to this point since validation is done before calling this function	
									$('#retresponse').val("Email address is not valid");	
									showDialog("error","Email address is not valid");
								}
								else{
								//	$('#retresponse').val("EmailSend started");		
											
									jsonDatasemail= {
									  "app_input_parameter": {
										"input_file_name_list": [
										  outputFileName2+".pdf",
										  jpegQRCode 		
										]
									  },
									  "app_to_e_mail_parameter": {
										"e_mail_form": {
										  "bcc": {
											"address_list": [],
											"contact_group_id_list": [],
											"contact_id_list": []
										  },
										  "body": body,
										  "cc": {
											"address_list": [],
											"contact_group_id_list": [],
											"contact_id_list": []
										  },
										  "from_address": "user@ttec.com",
										  "from_name": "tsip",
										  "subject": subject,
										  "to": {
											"address_list": [
												toaddress,
											],
											"contact_group_id_list": [],
											"contact_id_list": []
										  }
										}
									  },
									  "auto_adjust": true,
									  "auto_event": true,				
									}
									
									console.log("AppToApp_SendEmail - JSONData - "+jsonDatasemail);
									// Changing jobStatus to AppToApp2
									App.jobStatus = "AppToApp3"
									App.Util.serverRequest(App.URL.webAPI.jobappemailsend,"POST", true, function (response) {
										if (response) {
											$('#retresponse').val("Gathering the user information to send Email");
											move(90,98,0)											
											console.log("AppToApp_SendEmail::EmailSend job POST is successful");
											current_WFID=response.WFID;												
										//	$('#retresponse').val(response["value"]);
										//	$('#retresponse').val("WFID="+response.WFID+",Status="+response.status);
										} else {
											console.log("AppToApp_SendEmail::Error:EmailSend");											
										//	$('#retresponse').val(response["value"]);
										//	$('#retresponse').val("WFID="+response.WFID+",Status="+response.status);
											$('#retresponse').val("Error in sending the email");	
											showDialog("error","Error in sending the email");
										}
										}, jsonDatasemail
									); 
								}
							}
							else{
								$('#retresponse').val("SMTP setting is disabled");
								$('#retresponse').val("SMTP setting is disabled");	
								showDialog("error","SMTP setting is disabled");
							}
						} 
						else {
							console.log("AppToApp_SendEmail::GET_Error:Get Function setting");		
							$('#retresponse').val("Error in getting the machine settings. Please check the machine configuration");	
							showDialog("error","Error in getting the machine settings. Please check the machine configuration");							
						}
					}); 
				}	
				else{
					console.log("Email is Disabled");
					$('#retresponse').val("EmailSend is disabled");
					showDialog("error","Email is disabled in machine. Please check the machine configuration");							
				}	
			} 
			else {
				console.log("GET_Error:Get Function setting");	
				$('#retresponse').val("Error in getting the machine settings. Please check the machine configuration");	
				showDialog("error","Error in getting the machine settings. Please check the machine configuration");							
			}
		}); 		
	}
	
	/* ---------------------------------------- Retrieve User information ---------------------------------------------------- */		
	
	var RetrieveInformation = function (inputname){
		console.log("RetrieveInformation::Input Name is "+inputname);
		
		// Query from database and retrieve the info
		
		console.log("RetrieveInformation::Arvind Image Path - "+img)

		jsonUserInfo = {
			"Name": name,
			"Division": division,
			"Department": department,
			"Building": building,
			"Floor": floor,
			"EmailID": emailID,
			"Cubicle": cubicle,
			"ColorCode": colorCode,
			"ImagePath": img
		};
		return jsonUserInfo;
	}
	
	/* ---------------------------------------- Show Dialog ---------------------------------------------------- */	
	
	var showDialog = function(statusString, statusValue){
		console.log("showDialog::Entered showDialog");
		if("error" == statusString){
			$('#dialogHeading').removeClass('alert-success').addClass('alert-error').text("Error");							
			$('#userinfotable').removeClass('w3-show').addClass('w3-hide');			
		}
		else{ 
			if(App.jobStatus == "AppReport"){
				$('#dialogHeading').removeClass('alert-error').addClass('alert-alert').text("Information");							
				$('#userinfotable').removeClass('w3-show').addClass('w3-hide');			
			}
			else{
				$('#dialogHeading').removeClass('alert-error').addClass('alert-success').text("Success");			
				$('#userinfotable').removeClass('w3-show').addClass('w3-hide');			
				if (App.jobStatus != "AppPrint"){
					var jsonUserData = RetrieveInformation()

					$("#output").attr('src',jsonUserData.ImagePath);			
					$('#Name').text(jsonUserData.Name)	
					$('#Division').text(jsonUserData.Division)	
					$('#Department').text(jsonUserData.Department)	
					$('#Building').text(jsonUserData.Building)	
					$('#EmailID').text(jsonUserData.EmailID)	
					$('#Floor').text(jsonUserData.Floor)							
					$('#Cubicle').text(jsonUserData.Cubicle)						
					$('#ColorCode').text("Color Code = "+jsonUserData.ColorCode)							
					
					$('#userinfotable').removeClass('w3-hide').addClass('w3-show');			
				}
			}
		}
		$('#dialogContent').text(statusValue);
		sleep(100);
		$('#dialog').css('display','block');
			
	//	$('#dialog').show();	
	

//			$('#output').qrcode("Name:Arvind, Building:Vaishnavi Solitaire, Division:TTEC, Dept:SL, Floor:3");
//			$('#output').qrcode({width: 100,height: 100,text: "Name:Arvind, Building:Vaishnavi Solitaire, Division:TTEC, Dept:SL, Floor:3"});
	
	/*
			$('#output').qrcode({width: 10,height: 10,text: "Name:Arvind, Building:Vaishnavi Solitaire, Division:TTEC, Dept:SL, Floor:3"});

			var canvas = $('#output canvas');				
			var img = canvas.get(0).toDataURL("image/png");								
			
			// draw to canvas...
			canvas.get(0).toBlob(function(blob) {
				saveAs(blob, "G:/01_eBX_eBN/01_eBN_Docs/WebAPI_Training/App_May2-2019/program/homeapp/client/js/prettyimage.png");
			});
	*/
		
	}
		
	/* ---------------------------------------- Dialog Close button Click Event ---------------------------------------------------- */
		
	$('#dialogCloseButton').on('click', function(){			
		console.log("Dialog header ="+$('#dialogHeading').text());
		// Check if success dialog and if so reset to initial view
	//	if("Success" == $('#dialogHeading').text()){				
			_initialDisplay();
	//	}					
		// hide the dialog
		$("#dialog").css("display", "none");
	});
	
	/* ---------------------------------------- Show PopUp for Report Print ---------------------------------------------------- */	
	
	var showPopUp = function(){
		console.log("showDialog::Entered showPopUp");
		
		$('#popUpHeading').removeClass('alert-error').addClass('alert-success').text("Generate Report");					
		$('#popUpContent').text("Please select the following \n <1> Print report for today \n <2> Print report for all days");
		
		sleep(100);
		$('#popUp').css('display','block');		
	}

	/* ---------------------------------------- PopUp Close for Report Print ---------------------------------------------------- */		
	
	$('#popUpCloseButton').on('click', function(){			
		console.log("Popup close button click");
		
		_initialDisplay();	
		// hide the dialog
		$("#popUp").css("display", "none");
	});
	
	 /* ---------------------------------------- Generate Report - Today Report button Click -------------------------------------------- */		
	 
	$("#todayreport").on("click", function () {
		console.log("todayreport click")	
		$("#popUp").css("display", "none");	
		generateReport("today")
	});
	
	/* ---------------------------------------- Generate Report - All Report button Click ----------------------------------------------- */		
	
	$("#allreport").on("click", function () {	
		console.log("allreport click")	
		$("#popUp").css("display", "none");	
		generateReport("all")
	});
	
	/* -------------------------------------------------- Generate Report button Click -------------------------------------------------- */		
	
	var generateReport = function(action){
		console.log("generateReport::Entered generateReport, action - "+action);
		// Setting jobStatus as AppPrint
		App.jobStatus = "AppReport"
		$('#retresponse').val("Querying the information from the database");		
		move(1,15,0)
		App.Util.serverRequest('/server/' + App.appId + "/generateReport", "POST", true, function (response) {
			if (response) {
				console.log("AppToApp_report Response- "+JSON.stringify(response));							
				move(15,30,0)
				if (response.status =="NoReportForToday"){
					$('#retresponse').val("No Pending Report for today");	
					showDialog("success","No Pending Report for today");
				}
				else if(response.status == "Failed" ){
					$('#retresponse').val("Error in Generate Report");	
					showDialog("error","Error in Generate Report");
				}	
				else{
					var reportName = response.value
					console.log("AppToApp_report::Name of the file is "+reportName)				
					AppToApp_appPrint(reportName)
				}
			}				
			else {
				console.log("Error at generateReport");
				$('#retresponse').val("Error in Generate Report");	
				showDialog("error","Error in Generate Report");
			}
		}, {		
		"name": action
		});				
	}	
	
	/* ---------------------------------------- Progress bar move  -------------------------------------------- */		
	
	var move = function(width, interval, error) {
	  var elem = document.getElementById("progress-bar");   
	  //var width = 1;
	  if(error)
	  {
		  console.log("move::entered error")	
		  console.log($('.progress-bar').attr.value);
		  $('.progress-bar').css('width', 0).attr('aria-valuenow', 0);   
		  
		  return true;
	  }
	  else {
		  console.log("move::entered ok")	
		  var id = setInterval(frame, 100);
		  function frame() {
			if (width >= interval) {
			  clearInterval(id);
			} else {
			  width++; 
			//  elem.style.width = width + '%'; 
			  $('.progress-bar').css('width', width+'%').attr('aria-valuenow', width);    
			  
			}
		  }				  
		  return true;
	  }
	};
	
	/* ---------------------------------------------------- Start Scan button Click ---------------------------------------------------- */		
	
	$("#AppToApp_startScan").on("click", function () {		
		console.log("Start job entry");
		$('#AppToApp_startScan').prop('disabled',true);		
		$('#AppToApp_report').prop('disabled',true);		
		$('.progress-bar').removeClass('w3-hide').addClass('w3-show');
		//$('#startjob').empty();		
		$('#retresponse').val("Scanning is in progress");		
		move(1,20,0)
		
		storedFileName = filename+'.'+outputfileformat.split('_',1);
		jsonDatas1={
					  "auto_adjust": true,
					  "auto_event": true,
					  "scan_parameter": {							
					  "duplex_type": duplex_mode,										  
					  "generate_preview": previewEnabled,
					  "mixed_original_paper_size": false,
					  "omit_blank_page": omitblankpage,
					  "scan_color_mode": color_mode,
					  "scan_paper_size": {
						"paper_size": paper_size
					  },
					  "image_adjustment_parameter": {
						"image_mode": imagemode,
						"image_quality": imagequality,
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
						"is_appconv_mode": true		
					 }
				};
						
		console.log(jsonDatas1);
		// Changing jobStatus value to StoreToApp
		App.jobStatus = "StoreToApp"	
		
		App.Util.serverRequest(App.URL.webAPI.jobsScan,"POST", true, function (response) {
			if (response) {
				console.log("AppToApp_startScan:Job is successful");			
				current_WFID=response.WFID;	
				console.log("value=" + response["value"])			
						
			} else {				
				console.log("JobScan error");								
				$('#retresponse').val("ScanToApp job Error");	
				showDialog("error","Error in Scanning");				
				_initialDisplay();
			}			
			}, jsonDatas1
		); 
		 
	});
	
	/* --------------------------------------------------- Genrate Report button Click ------------------------------------------------- */		
	
	$("#AppToApp_report").on("click", function () {	
		$('#AppToApp_startScan').prop('disabled',true);		
		$('#AppToApp_report').prop('disabled',true);		
		$('.progress-bar').removeClass('w3-hide').addClass('w3-show');	
		
		showPopUp()
	/*	
		$('#retresponse').val("Querying the information from the database");		
		move(1,25,0)
		App.Util.serverRequest('/server/' + App.appId + "/generateReport", "POST", true, function (response) {
			if (response) {
				console.log("AppToApp_report Response- "+JSON.stringify(response));							
				move(25,50,0)
				var reportName = response.value
				console.log("AppToApp_report::Name of the file is "+reportName)				
				AppToApp_appPrint(reportName)
			}				
			else {
				console.log("Error at generateReport");
				$('#retresponse').val("Error in GenerateReport");	
				showDialog("error","Error in Generate Report");
			}
		}, {		
		"name": "all"
		});		
	*/
	});
	
	/* ------------------------------------------------- App Print for Generate Report ------------------------------------------------- */		
	
	var AppToApp_appPrint = function (reportName){		
		$('#retresponse').val("Received Information from the database. Printing is started");
		console.log("AppToApp_appPrint:: Received reportName ="+reportName)
	// Setting jobStatus as AppPrint
		App.jobStatus = "AppPrint"
		
		jsonPrintParams={
		  "auto_adjust": true,
		  "auto_event": false,
		  "parent_workflow_id": 200,
		  "print_job_parameters": {
			"input_storage_parameter": {
			  "input_file_name": reportName,
			  "storage_type": "app_storage"
			},
			"print_parameter": {
			  "output_tray": "inner_tray",
			  "print_duplex_type": "simplex",
			  "print_fold_type": "none",
			  "print_hole_punch_position": "none",
			  "print_image_adjustment": {
				"document_type": "general",
				"orientation": "portrait",
				"paper_size": "a4",
				"pdf_over_print": "off",
				"print_color_mode": "full_color",				
				"print_scaling_type": "fit",
				"remove_blank_page": false,
				"toner_mode": "normal",
				"toner_save": false
			  },
			  "print_mode_type": "normal",
			  "print_sort_type": "unknown",
			  "print_staple_position": "non_staple",
			  "set": 1
			}
		  }
		}
		App.Util.serverRequest(App.URL.webAPI.directPrintURL, "POST", true, function(response) {
                if (response) {
					console.log("AppToApp_appPrint::Succcess in job submission")
                    move(40,60,0)					
                } else {
                    console.log("Print failed");
					$('#retresponse').val("Error in Printing the Report");	
					showDialog("error","Error in Printing the Report");
                }
            }, jsonPrintParams);
	};
	
	/* ---------------------------------------------------- Sleep function ---------------------------------------------------- */		
	
	function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
		  break;
		}
	  }
	}
	
	/* -------------------------------------------------- Scan patch operation ------------------------------------------------ */			
	var scanPatchOperation = function(action) {
        console.log(" start scanPatchOperation");
        console.log(current_WFID);
	//	$('#retresponse').val("JobScan Start="+action);
        App.Util.serverRequest(App.URL.webAPI.jobsScanSub + "/" + current_WFID, "PATCH", true, function (response) {
            responseData = JSON.stringify(response);
            if (response) {
                console.log("Jobs scan " + action + " : success");
			//	$('#retresponse').val("JobScan "+action+" success");
            } else {
                console.error("Jobs scan " + action + " : fail");
				$('#retresponse').val("JobScan "+action+" fail");
            }
        }, {
            "job_action": action
        });
    };

    
    return {
        init: init,
        current_WFID: current_WFID,	
		move: move,
		showDialog: showDialog,
		generateColorCode: generateColorCode,
		scanPatchOperation: scanPatchOperation,
		AppToApp_ConvertOCR: AppToApp_ConvertOCR,
		AppToApp_AnalyzeXML: AppToApp_AnalyzeXML,
		AppToApp_ConvertFileFormat: AppToApp_ConvertFileFormat,
		AppToApp_SendEmail: AppToApp_SendEmail
    }

}(window, jQuery));
