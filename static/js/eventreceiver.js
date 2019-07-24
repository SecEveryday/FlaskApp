App.EventReceiver = (function (global, $, undefined) {
var eventInfo;
    var eventReceiver = function (data) {
       
   	    console.log(JSON.stringify(data));
		console.log("JobStatus Value ="+App.jobStatus);
		
        eventInfo = JSON.stringify(data);				
		console.log("Event ="+data.event_name+",Status="+data.job_status.status+",Status Reason="+data.job_status.status_reason);		
        
	//	$('#retresponse').val(App.currentScreen+" :Event ="+data.event_name+",Status="+data.job_status.status+",Status Reason="+data.job_status.status_reason);	
		
		/* --------------------------------------------- StoreApp job suspension - WaitForNextOriginal --------------------------------------------------- */	
		if(App.jobStatus === 'StoreToApp'&& data.event_name === 'jobs_suspended' && data.job_status.status === 'suspended' && data['job_status']['status_reason'] === 'wait_next_original'){
			console.log("ScanToApp job is suspended - WaitForNextOriginal")
		//	$('#retresponse').val("Scanning is in Progress");	
		//  Changing Progress to from 20-30%
		//	App.AppToApp.move(20,30,0)
		//	App.AppToApp.scanPatchOperation("finish");
		}		
		
		/* ------------------------------------------------------- StoreApp job completion --------------------------------------------------------------- */	
		if(App.jobStatus === 'StoreToApp'&& data.event_name === 'jobs_completed' && data.job_status.status === 'completed'){
			if(data['job_status']['status_reason'] === 'success'){
				console.log("ScanToApp job is completed. Now Starting the AppToApp job")
				//	$('#retresponse').val("Scanning is Completed");	
				// Changing Progress to from 20-30%
				App.AppToApp.move(20,30,0)
				App.AppToApp.AppToApp_ConvertOCR()	
			}
			else{
				console.log("Error in Scanning")	
				$('#retresponse').val("Error in Scanning"+data['job_status']['status_reason'])	
				App.AppToApp.showDialog("error","Error in Scanning - "+data['job_status']['status_reason'])			
				
			}
		}
		
		/* ----------------------------------------------- AppToApp - ZoneOCR xml generation job completion ----------------------------------------------- */	
		if(App.jobStatus === 'AppToApp1'&& data.event_name === 'jobs_completed' && data.job_status.status === 'completed'){
			if(data['job_status']['status_reason'] === 'success'){
				console.log("AppToApp1 job is completed. Now Starting the AppToApp2 job")
			//	$('#retresponse').val("Processing the Scanned data is completed");
				App.AppToApp.move(50,60,0)
				App.AppToApp.AppToApp_ConvertFileFormat()	
			}
			else{
				console.log("Error in Processing Scan data")	
				$('#retresponse').val("Error in Processing the Scanned Data -  "+data['job_status']['status_reason'])	
				App.AppToApp.showDialog("error","Error in Processing the Scanned Data - "+data['job_status']['status_reason'])			
				
			}
		}
		
		/* ----------------------------------------------------- AppToApp - PDF generation job completion -------------------------------------------------- */	
		if(App.jobStatus === 'AppToApp2'&& data.event_name === 'jobs_completed' && data.job_status.status === 'completed'){
			if(data['job_status']['status_reason'] === 'success'){
				console.log("AppToApp2 job is completed. Now Starting the AppToApp3 job")
				$('#retresponse').val("Checking the name present in scanned data in the database");
				App.AppToApp.move(70,80,0)
				// Now Analyze the xml file which has the zone ocr information
				App.AppToApp.AppToApp_AnalyzeXML()
				// Now Send Email 
				//App.AppToApp.AppToApp_SendEmail()	
			}
			else{
				console.log("Error in Converting Scan data")	
				$('#retresponse').val("Error in Converting the Scanned Data -  "+data['job_status']['status_reason'])	
				App.AppToApp.showDialog("error","Error in Converting the Scanned Data - "+data['job_status']['status_reason'])			
				
			}
		}
		
		/* ------------------------------------------------------ AppToApp - EmailSend job completion ------------------------------------------------------ */	
		if(App.jobStatus === 'AppToApp3'&& data.event_name === 'jobs_completed' && data.job_status.status === 'completed'){
			if(data['job_status']['status_reason'] === 'success'){
				console.log("AppToApp3 job is completed")
				$('#retresponse').val("Email is sent successfully to the recipient");
				App.AppToApp.move(98,100,0)					
				App.AppToApp.showDialog("success","Email is sent successfully to the recipient")			
			}
			else{
				console.log("Error in sending mail")	
				$('#retresponse').val("Error in Sending the mail -  "+data['job_status']['status_reason'])	
				App.AppToApp.showDialog("error","Error in Sending the mail - "+data['job_status']['status_reason'])			
				
			}
		}		
		
		/* --------------------------------------------------------- AppToPrint job waiting ---------------------------------------------------------------- */	
		if(App.jobStatus === 'AppPrint'&& data.event_name === 'jobs_completed' && data.job_status.status === 'waiting'){
			console.log("AppPrint job is waiting")
			$('#retresponse').val("Printing is in progress");
			App.AppToApp.move(70,90,0)			
		}
		
		/* --------------------------------------------------------- AppToPrint job running ---------------------------------------------------------------- */	
		if(App.jobStatus === 'AppPrint'&& data.event_name === 'jobs_completed' && data.job_status.status === 'running'){
			console.log("AppPrint job is running")
		//	$('#retresponse').val("Processing the Scanned data is completed");
			App.AppToApp.move(90,99,0)			
		}		
		
		/* --------------------------------------------------------- AppToPrint job suspension ------------------------------------------------------------- */	
		if(App.jobStatus === 'AppPrint'&& data.event_name === 'jobs_suspended'){
			console.log("AppPrint job is running")
			$('#retresponse').val("Job is suspended for "+data.job_status.status_reason);			
		}

		/* ---------------------------------------------------------- AppToPrint job completion ------------------------------------------------------------ */		
		if(App.jobStatus === 'AppPrint'&& data.event_name === 'jobs_completed' && data.job_status.status === 'completed'){
			if(data['job_status']['status_reason'] === 'success'){
				console.log("AppPrint job is completed")
				$('#retresponse').val("Processing the Printing is completed");
				App.AppToApp.move(99,100,0)
				App.AppToApp.showDialog("success","Report is successfully printed")						
			}
			else{
				console.log("Error in AppPrint")	
				$('#retresponse').val("Error in Printing the Report -  "+data['job_status']['status_reason'])	
				App.AppToApp.showDialog("error","Error in Printing the Report - "+data['job_status']['status_reason'])			
				
			}
		}
		
		if (App.currentScreen === 'StoreToApp' && data.event_name === 'jobs_completed' && data.job_status.status === 'completed' /* && data['job_status']['status_reason'] !== 'success') */){

            console.log('StoreApp: Job is Completed');			
			//enable the buttons - StoreApp
			$('#StoreApp_startScan').prop('disabled',false);			
			
			// Since StoreApp job is completed, now initiate AppToApp job
			
        }
				
		
		if(App.currentScreen === 'AppToApp' && data.job_status.status.toLowerCase() == "completed")	{
			
			console.log("Job is completed");
			console.log("Job is successful and output file "+filename+'.'+outputfileformat.split('_',1)+" is stored");
			$('#retresponse').val("\nScan job is successful and output file "+filename+'.'+outputfileformat.split('_',1)+" is stored");				
			
			// enable the buttons - AppEmailSend
			$('#sendemail').prop('disabled',false);
						
			//enable the buttons - AppSaveAsFile
			$('#AppSaveAsFile_startScan').prop('disabled',false);
			// disable the buttons
			$('#AppSaveAsFile_resumeScan').prop('disabled',true);
			$('#AppSaveAsFile_finishScan').prop('disabled',true);
			$('#AppSaveAsFile_cancelScan').prop('disabled',true);
			
			//enable the buttons - AppToApp
			$('#AppToApp_startScan').prop('disabled',false);
			$('#appapp').prop('disabled',false);	
			// disable the buttons
			$('#AppToApp_resumeScan').prop('disabled',true);
			$('#AppToApp_finishScan').prop('disabled',true);
			$('#AppToApp_cancelScan').prop('disabled',true);
		}		
    };

    return {
        eventReceiver: eventReceiver
    };

})(window, jQuery);


function now() {
    var now = new Date();
    return ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);
}

