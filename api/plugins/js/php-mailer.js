/* PHP MAILER JS FILE */
/*
$(document).on('click', '#PHPMAILER-settings-button', function() {
	var post = {
        plugin:'PHPMailer/settings/get', // used for switch case in your API call
        api:'api/?v1/plugin', // API Endpoint will always be this for custom plugin API calls
        name:$(this).attr('data-plugin-name'),
        configName:$(this).attr('data-config-name'),
        messageTitle:'', // Send succees message title (top line)
        messageBody:'Disabled '+$(this).attr('data-plugin-name'), // Send succees message body (bottom line)
        error:'Organizr Function: API Connection Failed' // conole error message
    };
	var callbacks = $.Callbacks(); // init callbacks var
    //callbacks.add(  ); // add function to callback to be fired after API call
    //settingsAPI(post,callbacks); // exec API call
    //ajaxloader(".content-wrap","in");
    //setTimeout(function(){ buildPlugins();ajaxloader(); }, 3000);
});
*/

// FUNCTIONS
function phpmBuildSettingsItems(array){
    if (Array.isArray(array)) {
        var preRow = `
            <!-- FORM GROUP -->
            <h3 class="box-title" lang="en">Mail Settings</h3>
            <hr class="m-t-0 m-b-40">
            <div class="row">
        `;
        var mailItems = preRow;
        $.each(array, function(i,v) {
            mailItems += `
                <!-- INPUT BOX -->
                <div class="col-md-6 p-b-10">
                    <div class="form-group">
                        <label class="control-label col-md-3" lang="en">`+v.label+`</label>
                        <div class="col-md-9">
                            `+buildFormItem(v)+`
                        </div>
                    </div>
                </div>
                <!--/ INPUT BOX -->
            `;
        });
        mailItems += '</div>';
    }

    return mailItems;
}

// EVENTS and LISTENERS
// CHANGE CUSTOMIZE Options
$(document).on('change asColorPicker::close', '#PHPMAILER-settings-page :input', function(e) {
    switch ($(this).attr('type')) {
        case 'switch':
        case 'checkbox':
            var value = $(this).prop("checked") ? true : false;
            break;
        default:
            var value = $(this).val();
    }
	var post = {
        api:'api/?v1/update/config',
        name:$(this).attr("name"),
        type:$(this).attr("data-type"),
        value:value,
        messageTitle:'',
        messageBody:'Updated Value for '+$(this).parent().parent().find('label').text(),
        error:'Organizr Function: API Connection Failed'
    };
    //console.log(post);
    //$('#customize-appearance-reload').removeClass('hidden');
	var callbacks = $.Callbacks();
    //callbacks.add( buildCustomizeAppearance );
    settingsAPI(post,callbacks);

});
$(document).on('click', '#PHPMAILER-settings-button', function() {
    var post = {
        plugin:'PHPMailer/settings/get', // used for switch case in your API call
    };
    ajaxloader(".content-wrap","in");
    organizrAPI('POST','api/?v1/plugin',post).success(function(data) {
        var response = JSON.parse(data);
        $('#PHPMAILER-settings-items').html(phpmBuildSettingsItems(response.data));
    }).fail(function(xhr) {
        console.error("Organizr Function: API Connection Failed");
    });
    ajaxloader();
});
// SEND TEST EMAIL
$(document).on('click', '.phpmSendTestEmail', function() {
    var post = {
        plugin:'PHPMailer/send/test', // used for switch case in your API call
    };
    ajaxloader(".content-wrap","in");
    organizrAPI('POST','api/?v1/plugin',post).success(function(data) {
        var response = JSON.parse(data);
        if(response.data == true){
            messageSingle('',window.lang.translate('Email Test Successful'),'bottom-right','#FFF','success','5000');
        }else{
            messageSingle('',response.data,'bottom-right','#FFF','error','5000');
            console.error(response.data);
        }

    }).fail(function(xhr) {
        console.error("Organizr Function: API Connection Failed");
    });
    ajaxloader();
});