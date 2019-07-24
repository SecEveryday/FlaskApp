App.URL = (function (global, $, undefined) {

    var _webapiContextRoot = "http://embapp-local.toshibatec.co.jp:50187/v1.0";	
    var _servletBaseURL = "/server/5bf02dbc-0eeb-11e7-a579-008091ae40df";

    var languageURL = _webapiContextRoot + "/session/current";
    var eventSubscriptionJobsURL = _webapiContextRoot + "/subscription/eventstream/jobs";
    var webhooksJobs = _webapiContextRoot + "/subscription/webhooks/jobs";
    
	var jobsCopy = _webapiContextRoot + "/jobs/copy";
    var jobsScan = _webapiContextRoot + "/jobs/scan/scan_to_app";
	var jobappemailsend = _webapiContextRoot + "/jobs/appsend/email";
	var jobappSambasend = _webapiContextRoot + "/jobs/appsend/samba";
	var jobsScanSub = _webapiContextRoot + "/jobs/scan";
	var directPrintURL = _webapiContextRoot + "/jobs/print/direct_print";
    
    var deviceStatusEventSubscriptionURL = _webapiContextRoot + "/subscription/eventstream/mfpdevice/status";
    var jobEventSubscriptionURL = _webapiContextRoot + "/subscription/eventstream/jobs";
    var ADFStatusURL = _webapiContextRoot + "/mfpdevice/scanner/adf";
    var appStorageFiles = _webapiContextRoot + '/app/storage/self/files';
   
	var smtpclientsetting = _webapiContextRoot + '/setting/controllers/network';
	var functionsettings = _webapiContextRoot + '/setting/controllers/function';
	
    var getSettingURL = _webapiContextRoot + "/app/config";
	
	var getUsers = _webapiContextRoot + "/account/users";	
	var roleManagement = _webapiContextRoot + "/account/roles";
	
	var listAppConvFiles = _webapiContextRoot + "/jobs/appconv/files";
	var appConv = _webapiContextRoot + "/jobs/appconv";
	
	

    return {
        _webapiContextRoot: _webapiContextRoot,
        webAPI: {
            
            languageURL: languageURL,
            eventSubscriptionJobsURL: eventSubscriptionJobsURL,
            webhooksJobs: webhooksJobs,
            jobsCopy: jobsCopy,
            jobsScan: jobsScan,
			jobappemailsend: jobappemailsend,
			jobappSambasend: jobappSambasend,
            jobsScanSub: jobsScanSub,
            deviceStatusEventSubscriptionURL: deviceStatusEventSubscriptionURL,
            jobEventSubscriptionURL: jobEventSubscriptionURL,
            ADFStatusURL: ADFStatusURL,
            appStorageFiles: appStorageFiles,
            directPrintURL: directPrintURL,
            smtpclientsetting: smtpclientsetting,
			functionsettings: functionsettings,
            getSettingURL : getSettingURL,
			getUsers: getUsers,
			roleManagement: roleManagement,
			listAppConvFiles: listAppConvFiles,
			appConv: appConv
        }
    };

})(window, jQuery);