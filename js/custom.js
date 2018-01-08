/*jslint browser: true*/
/*global $, jQuery, alert*/
var idleTime = 0;
var hasCookie = false;
$(document).ajaxComplete(function () {
    pageLoad();
});
$(document).ready(function () {
    pageLoad();
    /* ===========================================================
        Loads the correct sidebar on window load.
        collapses the sidebar on window resize.
        Sets the min-height of #page-wrapper to window size.
    =========================================================== */
    "use strict";
    var body = $("body");
    $(function () {
        var set = function () {
                var topOffset = 60,
                    width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width,
                    height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
                if (width < 768) {
                    $('div.navbar-collapse').addClass('collapse');
                    topOffset = 100; /* 2-row-menu */
                } else {
                    $('div.navbar-collapse').removeClass('collapse');
                }

                /* ===== This is for resizing window ===== */

                if (width < 1170) {
                    body.addClass('content-wrapper');
                    $(".sidebar-nav, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
                } else {
                    body.removeClass('content-wrapper');
                }

                height = height - topOffset;
                if (height < 1) {
                    height = 1;
                }
                if (height > topOffset) {
                    $("#page-wrapper").css("min-height", (height) + "px");
                }
            },
            url = window.location,
            element = $('ul.nav a').filter(function () {
                return this.href === url || url.href.indexOf(this.href) === 0;
            }).addClass('activez').parent().parent().addClass('ok').parent();
        if (element.is('li')) {
            element.addClass('activezo');
        }
        $(window).ready(set);
        $(window).bind("resize", set);
    });
    body.trigger("resize");
    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
    hasCookie = (getCookie('organizrToken')) ? true : false;
    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
});
function pageLoad(){
    "use strict";
    //Start Organizr
    $(function () {
        $("#preloader").fadeOut();
        $('#side-menu').metisMenu();
    });


    /* ===== Theme Settings ===== */





    /* ===== Collapsible Panels JS ===== */

    (function ($, window, document) {
        var panelSelector = '[data-perform="panel-collapse"]',
            panelRemover = '[data-perform="panel-dismiss"]';
        $(panelSelector).each(function () {
            var collapseOpts = {
                    toggle: false
                },
                parent = $(this).closest('.panel'),
                wrapper = parent.find('.panel-wrapper'),
                child = $(this).children('i');
            if (!wrapper.length) {
                wrapper = parent.children('.panel-heading').nextAll().wrapAll('<div/>').parent().addClass('panel-wrapper');
                collapseOpts = {};
            }
            wrapper.collapse(collapseOpts).on('hide.bs.collapse', function () {
                child.removeClass('ti-minus').addClass('ti-plus');
            }).on('show.bs.collapse', function () {
                child.removeClass('ti-plus').addClass('ti-minus');
            });
        });

        /* ===== Collapse Panels ===== */

        $(document).on('click', panelSelector, function (e) {
            e.preventDefault();
            var parent = $(this).closest('.panel'),
                wrapper = parent.find('.panel-wrapper');
                $(this).children('i').toggleClass('ti-plus').toggleClass('ti-minus');
            wrapper.collapse('toggle');
        });

        /* ===== Remove Panels ===== */

        $(document).on('click', panelRemover, function (e) {
            e.preventDefault();
            var removeParent = $(this).closest('.panel');

            function removeElement() {
                var col = removeParent.parent();
                removeParent.remove();
                col.filter(function () {
                    return ($(this).is('[class*="col-"]') && $(this).children('*').length === 0);
                }).remove();
            }
            removeElement();
        });
    }(jQuery, window, document));

    /* ===== Tooltip Initialization ===== */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
        /*$('body').tooltip({
            selector: '[data-toggle="tooltip"]'
        });*/
    });

    /* ===== Popover Initialization ===== */

    $(function () {
        $('[data-toggle="popover"]').popover();
    });

    $(function () {
        // Switchery
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        $('.js-switch').each(function() {
            if ($(this).attr('data-switchery') !== 'true'){
                new Switchery($(this)[0], $(this).data());
            }
        });
    });

    /* ===== Task Initialization ===== */

    $(".list-task li label").on("click", function () {
        $(this).toggleClass("task-done");
    });
    $(".settings_box a").on("click", function () {
        $("ul.theme_color").toggleClass("theme_block");
    });

    /* ===== Collepsible Toggle ===== */

    $(".collapseble").on("click", function () {
        $(".collapseblebox").fadeToggle(350);
    });

    /* ===== Sidebar ===== */

    $('.slimscrollright').slimScroll({
        height: '100%',
        position: 'right',
        size: "5px",
        color: '#dcdcdc'
    });
    $('.slimscrollsidebar').slimScroll({
        height: '100%',
        position: 'left',
        size: "6px",
        color: 'rgba(0,0,0,0.5)'
    });
    $('.chat-list').slimScroll({
        height: '100%',
        position: 'right',
        size: "0px",
        color: '#dcdcdc'
    });

    /* ===== Resize all elements ===== */



    /* ===== Visited ul li ===== */

    /*$('.visited li a').on("click", function (e) {
        $('.visited li').removeClass('active');
        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
    });*/

    /* =================================================================
        Update 1.5
        this is for close icon when navigation open in mobile view
    ================================================================= */

    $(".navbar-toggle").on("click", function () {
        $(".navbar-toggle i").toggleClass("ti-menu").addClass("ti-close");
    });

    /* magnific stuff */
    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }

    });

    $('.image-popup-fit-width').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        image: {
            verticalFit: false
        }
    });

    $('.image-popup-no-margins').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        }
    });

    $('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });

    $('#image-popups').magnificPopup({
          delegate: 'a',
          type: 'image',
          removalDelay: 500, //delay removal by X to allow out-animation
          callbacks: {
            beforeOpen: function() {
              // just a hack that adds mfp-anim class to markup
               this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
               this.st.mainClass = this.st.el.attr('data-effect');
            }
          },
          closeOnContentClick: true,
          midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
        });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({

        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: true,
        removalDelay: 500,
        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        }
    });

    $('.simple-ajax-popup-align-top').magnificPopup({
        type: 'ajax',
        alignTop: true,
        overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
    });

    $('.simple-ajax-popup').magnificPopup({
        type: 'ajax'
    });
}

/* ===== Login and Recover Password ===== */
$(document).on("click", "#to-recover", function(e) {
    $("#loginform").slideUp();
    $("#recoverform").fadeIn();
});
$(document).on("click", ".to-register", function(e) {
    $("#loginform").slideUp();
    $("#registerForm").removeClass('hidden');
    $("#registerform").fadeIn();
});
$(document).on("click", "#leave-recover", function(e) {
    $("#loginform").slideDown();
    $("#recoverform").fadeOut();
});
$(document).on("click", "#leave-registration", function(e) {
    $("#registerform").fadeOut();
    $("#registerForm").addClass('hidden');
    $("#loginform").slideDown();

});
$(document).on("click", ".updateNow", function(e) {
    updateNow();
});
$(document).on("click", ".show-login", function(e) {
    buildLogin();
});
$(document).on("click", ".depenency-item", function(e) {
    alert($(this).attr('data-name'));
});
$(document).on("click", ".login-button", function(e) {
    e.preventDefault;
    $('div.login-box').block({
        message: '<h4><img src="plugins/images/busy.gif" /> Just a moment...</h4>',
        css: {
            border: '1px solid #000'
        }
    });
    var post = $( '#loginform' ).serializeArray();
    organizrAPI('POST','api/?v1/login',post).success(function(data) {
        var html = JSON.parse(data);
        if(html.data == true){
            location.reload();
        }else if(html.data == 'mismatch'){
            $('div.login-box').unblock({});
            $.toast().reset('all');
            message('Login Error',' Wrong username/email/password combo','bottom-right','#FFF','warning','10000');
            console.error('Organizr Function: Login failed - wrong username/email/password');
        }
    }).fail(function(xhr) {
        console.error("Organizr Function: Login Failed");
    });
});
$(document).on("click", ".register-button", function(e) {
    e.preventDefault;
    var post = $( '#registerForm' ).serializeArray();
    organizrAPI('POST','api/?v1/register',post).success(function(data) {
        var html = JSON.parse(data);
        console.log(html);
        if(html.data == true){
            location.reload();
        }else if(html.data == 'mismatch'){
            $.toast().reset('all');
            message('Registration Error',' Wrong Registration Password','bottom-right','#FFF','warning','10000');
            console.error('Organizr Function: Registration failed - Wrong Registration Password');
        }else if(html.data == 'username taken'){
            $.toast().reset('all');
            message('Registration Error',' Registration Error - Username/Email Taken','bottom-right','#FFF','warning','10000');
            console.error('Organizr Function: Registration Failed - Username/Email Taken');
        }
    }).fail(function(xhr) {
        console.error("Organizr Function: Login Failed");
    });
});

$(document).on("click", ".open-close", function () {
    $("body").toggleClass("show-sidebar");
});
//EDIT GROUP GET ID
$(document).on("click", ".editGroupButton", function () {
    $('#edit-group-form [name=groupName]').val($(this).parent().parent().attr("data-group"));
    $('#edit-group-form [name=id]').val($(this).parent().parent().attr("data-id"));
    $('#edit-group-form [name=groupImage]').val($(this).parent().parent().attr("data-image"));
    $('#edit-group-form [name=oldGroupName]').val($(this).parent().parent().attr("data-group"));
});
//EDIT GROUP
$(document).on("click", ".editGroup", function () {
    //Create POST Array
    var post = {
        action:'editUserGroup',
        api:'api/?v1/settings/user/manage/groups',
        id:$('#edit-group-form [name=id]').val(),
        groupName:$('#edit-group-form [name=groupName]').val(),
        groupImage:$('#edit-group-form [name=groupImage]').val(),
        oldGroupName:$('#edit-group-form [name=oldGroupName]').val(),
        messageTitle:'',
        messageBody:'Edited User Group '+$('#edit-group-form [name=groupName]').val(),
        error:'Organizr Function: User Group API Connection Failed'
    };
    if (typeof post.id == 'undefined' || post.id == '') {
        message('New Group Error',' Could not get Group ID','bottom-right','#FFF','error','5000');
    }
    if (typeof post.groupName == 'undefined' || post.groupName == '') {
        message('New Group Error',' Please set a Group Name','bottom-right','#FFF','warning','5000');
    }
    if (typeof post.groupImage == 'undefined' || post.groupImage == '') {
        message('New Group Error',' Please set a Group Image','bottom-right','#FFF','warning','5000');
    }
    if(post.id !== '' && post.groupName !== '' && post.groupImage !== '' ){
        var callbacks = $.Callbacks();
        callbacks.add( buildGroupManagement );
        settingsAPI(post,callbacks);
        clearForm('#edit-group-form');
        $.magnificPopup.close();
    }
});
//CHANGE DEFAULT GROUP
$(document).on("click", ".changeDefaultGroup", function () {
    //Create POST Array
    var post = {
        action:'changeDefaultGroup',
        api:'api/?v1/settings/user/manage/groups',
        id:$(this).parent().parent().attr("data-id"),
        oldGroupID:$('#manageGroupTable').find('tr[data-default=true]').attr("data-group-id"),
        oldGroupName:$('#manageGroupTable').find('tr[data-default=true]').attr("data-group"),
        newGroupID:$(this).parent().parent().attr("data-group-id"),
        newGroupName:$(this).parent().parent().attr("data-group"),
        messageTitle:'',
        messageBody:'Changed Default Group to '+$(this).parent().parent().attr("data-group"),
        error:'Organizr Function: User Group API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildGroupManagement );
    settingsAPI(post,callbacks);
});
//DELETE GROUP
$(document).on("click", ".deleteUserGroup", function () {
    //Create POST Array
    var post = {
        action:'deleteUserGroup',
        api:'api/?v1/settings/user/manage/groups',
        id:$(this).parent().parent().attr("data-id"),
        groupID:$(this).parent().parent().attr("data-group-id"),
        groupName:$(this).parent().parent().attr("data-group"),
        messageTitle:'',
        messageBody:'Deleted User Group '+$(this).parent().parent().attr("data-group"),
        error:'Organizr Function: User Group API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildGroupManagement );
    settingsAPI(post,callbacks);
});
//ADD GROUP
$(document).on("click", ".addNewGroup", function () {
    //Create POST Array
    var post = {
        action:'addUserGroup',
        api:'api/?v1/settings/user/manage/groups',
        newGroupID:parseInt($('#manageGroupTable').find('tr[data-group-id]:nth-last-child(2)').attr('data-group-id')) + 1,
        newGroupName:$('#new-group-form [name=groupName]').val(),
        newGroupImage:$('#new-group-form [name=groupImage]').val(),
        messageTitle:'',
        messageBody:'Created User Group '+$('#new-group-form [name=groupName]').val(),
        error:'Organizr Function: User Group API Connection Failed'
    };
    if (typeof post.newGroupID == 'undefined' || post.newGroupID == '') {
        message('New Group Error',' Could not get next Group ID','bottom-right','#FFF','error','5000');
    }
    if (typeof post.newGroupName == 'undefined' || post.newGroupName == '') {
        message('New Group Error',' Please set a Group Name','bottom-right','#FFF','warning','5000');
    }
    if (typeof post.newGroupImage == 'undefined' || post.newGroupImage == '') {
        message('New Group Error',' Please set a Group Image','bottom-right','#FFF','warning','5000');
    }
    if(post.newGroupID !== '' && post.newGroupName !== '' && post.newGroupImage !== '' ){
        var callbacks = $.Callbacks();
        callbacks.add( buildGroupManagement );
        settingsAPI(post,callbacks);
        clearForm('#new-group-form');
        $.magnificPopup.close();
    }
});
// ADD USER
$(document).on("click", ".addNewUser", function () {
    //Create POST Array
    var post = {
        action:'addNewUser',
        api:'api/?v1/settings/user/manage/users',
        username:$('#new-user-form [name=username]').val(),
        email:$('#new-user-form [name=email]').val(),
        password:$('#new-user-form [name=password]').val(),
        messageTitle:'',
        messageBody:'Added New User: '+$('#new-user-form [name=username]').val(),
        error:'Organizr Function: User API Connection Failed'
    };
    if (typeof post.username == 'undefined' || post.username == '') {
        message('New User Error',' Please set a Username','bottom-right','#FFF','error','5000');
    }
    if (typeof post.email == 'undefined' || post.email == '') {
        message('New User Error',' Please set an Email','bottom-right','#FFF','warning','5000');
    }
    if (typeof post.password == 'undefined' || post.password == '') {
        message('New User Error',' Please set a Password','bottom-right','#FFF','warning','5000');
    }
    if(post.username !== '' && post.email !== '' && post.password !== '' ){
        var callbacks = $.Callbacks();
        callbacks.add( buildUserManagement );
        settingsAPI(post,callbacks);
        clearForm('#new-user-form');
        $.magnificPopup.close();
    }
});
// CHANGE USER GROUP
$(document).on("change", ".userGroupSelect", function () {
    //Create POST Array
    var post = {
        action:'changeGroup',
        api:'api/?v1/settings/user/manage/users',
        id:$(this).parent().parent().attr("data-id"),
        username:$(this).parent().parent().attr("data-username"),
        oldGroup:$(this).parent().parent().attr("data-group"),
        newGroupID:$(this).find("option:selected").val(),
        newGroupName:$(this).find("option:selected").text(),
        messageTitle:'',
        messageBody:'User Info updated for '+$(this).parent().parent().attr("data-username"),
        error:'Organizr Function: User API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildUserManagement );
    settingsAPI(post,callbacks);
});
// DELETE USER
//DELETE GROUP
$(document).on("click", ".deleteUser", function () {
    var user = $(this);
    swal({
        title: window.lang.translate('Delete ')+user.parent().parent().attr("data-username")+'?',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: window.lang.translate('Yes'),
        cancelButtonText: window.lang.translate('No'),
        closeOnConfirm: true,
        closeOnCancel: true
    }, function(isConfirm){
        if (isConfirm) {
            //Create POST Array
            var post = {
                action:'deleteUser',
                api:'api/?v1/settings/user/manage/users',
                id:user.parent().parent().attr("data-id"),
                username:user.parent().parent().attr("data-username"),
                messageTitle:'',
                messageBody:window.lang.translate('Deleted User')+': '+user.parent().parent().attr("data-username"),
                error:'Organizr Function: User API Connection Failed'
            };
            var callbacks = $.Callbacks();
            callbacks.add( buildUserManagement );
            settingsAPI(post,callbacks);
        }
    });

});
// CHANGE TAB GROUP
$(document).on("change", ".tabGroupSelect", function () {
    //Create POST Array
    var post = {
        action:'changeGroup',
        api:'api/?v1/settings/tab/editor/tabs',
        id:$(this).parent().parent().attr("data-id"),
        tab:$(this).parent().parent().attr("data-name"),
        oldGroupID:$(this).parent().parent().attr("data-group-id"),
        newGroupID:$(this).find("option:selected").val(),
        newGroupName:$(this).find("option:selected").text(),
        messageTitle:'',
        messageBody:'Tab Info updated for '+$(this).parent().parent().attr("data-name"),
        error:'Organizr Function: Tab API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildTabEditor );
    settingsAPI(post,callbacks);
});
// CHANGE TAB CATEGORY
$(document).on("change", ".tabCategorySelect", function () {
    //Create POST Array
    var post = {
        action:'changeCategory',
        api:'api/?v1/settings/tab/editor/tabs',
        id:$(this).parent().parent().attr("data-id"),
        tab:$(this).parent().parent().attr("data-name"),
        newCategoryID:$(this).find("option:selected").val(),
        newCategoryName:$(this).find("option:selected").text(),
        messageTitle:'',
        messageBody:'Tab Info updated for '+$(this).parent().parent().attr("data-name"),
        error:'Organizr Function: Tab API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildTabEditor );
    settingsAPI(post,callbacks);
});
// CHANGE TAB TYPE
$(document).on("change", ".tabTypeSelect", function () {
    //Create POST Array
    var post = {
        action:'changeType',
        api:'api/?v1/settings/tab/editor/tabs',
        id:$(this).parent().parent().attr("data-id"),
        tab:$(this).parent().parent().attr("data-name"),
        newTypeID:$(this).find("option:selected").val(),
        newTypeName:$(this).find("option:selected").text(),
        messageTitle:'',
        messageBody:'Tab Info updated for '+$(this).parent().parent().attr("data-name"),
        error:'Organizr Function: Tab API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildTabEditor );
    settingsAPI(post,callbacks);
});
// CHANGE ENABLED TAB
$(document).on("change", ".enabledSwitch", function () {
    //Create POST Array
    var post = {
        action:'changeEnabled',
        api:'api/?v1/settings/tab/editor/tabs',
        id:$(this).parent().parent().attr("data-id"),
        tab:$(this).parent().parent().attr("data-name"),
        tabEnabled:$(this).prop("checked") ? 1 : 0,
        tabEnabledWord:$(this).prop("checked") ? "On" : "Off",
        messageTitle:'',
        messageBody:'Tab Info updated for '+$(this).parent().parent().attr("data-name"),
        error:'Organizr Function: Tab API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildTabEditor );
    settingsAPI(post,callbacks);
});
// CHANGE SPLASH TAB
$(document).on("change", ".splashSwitch", function () {
    //Create POST Array
    var post = {
        action:'changeSplash',
        api:'api/?v1/settings/tab/editor/tabs',
        id:$(this).parent().parent().attr("data-id"),
        tab:$(this).parent().parent().attr("data-name"),
        tabSplash:$(this).prop("checked") ? 1 : 0,
        tabSplashWord:$(this).prop("checked") ? "On" : "Off",
        messageTitle:'',
        messageBody:'Tab Info updated for '+$(this).parent().parent().attr("data-name"),
        error:'Organizr Function: Tab API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildTabEditor );
    settingsAPI(post,callbacks);
});
// CHANGE DEFAULT TAB
$(document).on("change", ".defaultSwitch", function () {
    //Create POST Array
    var post = {
        action:'changeDefault',
        api:'api/?v1/settings/tab/editor/tabs',
        id:$(this).parent().parent().parent().attr("data-id"),
        tab:$(this).parent().parent().parent().attr("data-name"),
        messageTitle:'',
        messageBody:'Changed Default Tab to: '+$(this).parent().parent().parent().attr("data-name"),
        error:'Organizr Function: Tab API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildTabEditor );
    settingsAPI(post,callbacks);
});
//DELETE TAB
$(document).on("click", ".deleteTab", function () {
    var user = $(this);
    swal({
        title: window.lang.translate('Delete ')+user.parent().parent().attr("data-name")+'?',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: window.lang.translate('Yes'),
        cancelButtonText: window.lang.translate('No'),
        closeOnConfirm: true,
        closeOnCancel: true
    }, function(isConfirm){
        if (isConfirm) {
            //Create POST Array
            var post = {
                action:'deleteTab',
                api:'api/?v1/settings/tab/editor/tabs',
                id:user.parent().parent().attr("data-id"),
                tab:user.parent().parent().attr("data-name"),
                messageTitle:'',
                messageBody:window.lang.translate('Deleted Tab')+': '+user.parent().parent().attr("data-name"),
                error:'Organizr Function: Tab Editor API Connection Failed'
            };
            var callbacks = $.Callbacks();
            callbacks.add( buildTabEditor );
            settingsAPI(post,callbacks);
        }
    });
});
//EDIT TAB GET ID
$(document).on("click", ".editTabButton", function () {
    $('#edit-tab-form [name=tabName]').val($(this).parent().parent().attr("data-name"));
    $('#edit-tab-form [name=tabURL]').val($(this).parent().parent().attr("data-url"));
    $('#edit-tab-form [name=tabImage]').val($(this).parent().parent().attr("data-image"));
    $('#edit-tab-form [name=id]').val($(this).parent().parent().attr("data-id"));
    if( $(this).parent().parent().attr("data-url").indexOf('/?v') > 0){
        $('#edit-tab-form [name=tabURL]').prop('disabled', 'true');
    }else{
        $('#edit-tab-form [name=tabURL]').prop('disabled', null);
    }
});
//EDIT TAB
$(document).on("click", ".editTab", function () {
    //Create POST Array
    var post = {
        action:'editTab',
        api:'api/?v1/settings/tab/editor/tabs',
        id:$('#edit-tab-form [name=id]').val(),
        tabName:$('#edit-tab-form [name=tabName]').val(),
        tabImage:$('#edit-tab-form [name=tabImage]').val(),
        tabURL:$('#edit-tab-form [name=tabURL]').val(),
        messageTitle:'',
        messageBody:'Edited Tab '+$('#edit-tab-form [name=tabName]').val(),
        error:'Organizr Function: Tab Editor API Connection Failed'
    };
    if (typeof post.id == 'undefined' || post.id == '') {
        message('Edit Tab Error',' Could not get Tab ID','bottom-right','#FFF','error','5000');
    }
    if (typeof post.tabName == 'undefined' || post.tabName == '') {
        message('Edit Tab Error',' Please set a Tab Name','bottom-right','#FFF','warning','5000');
    }
    if (typeof post.tabImage == 'undefined' || post.tabImage == '') {
        message('Edit Tab Error',' Please set a Tab Image','bottom-right','#FFF','warning','5000');
    }
    if (typeof post.tabURL == 'undefined' || post.tabURL == '') {
        message('Edit Tab Error',' Please set a Tab URL','bottom-right','#FFF','warning','5000');
    }
    if(post.id !== '' && post.tabName !== '' && post.tabImage !== '' && post.tabURL !== '' ){
        var callbacks = $.Callbacks();
        callbacks.add( buildTabEditor );
        settingsAPI(post,callbacks);
        clearForm('#edit-tab-form');
        $.magnificPopup.close();
    }
});
//ADD NEW TAB
$(document).on("click", ".addNewTab", function () {
    //Create POST Array
    var post = {
        action:'addNewTab',
        api:'api/?v1/settings/tab/editor/tabs',
        tabOrder:parseInt($('#tabEditorTable').find('tr[data-order]').last().attr('data-order')) + 1,
        tabName:$('#new-tab-form [name=tabName]').val(),
        tabImage:$('#new-tab-form [name=tabImage]').val(),
        tabURL:$('#new-tab-form [name=tabURL]').val(),
        tabGroupID:1,
        tabEnabled:0,
        tabDefault:0,
        tabType:1,
        messageTitle:'',
        messageBody:'Created Tab '+$('#new-tab-form [name=tabName]').val(),
        error:'Organizr Function: Tab API Connection Failed'
    };
    if (typeof post.tabOrder == 'undefined' || post.tabOrder == '') {
        message('New Tab Error',' Could not get next Group ID','bottom-right','#FFF','error','5000');
    }
    if (typeof post.tabName == 'undefined' || post.tabName == '') {
        message('New Tab Error',' Please set a Tab Name','bottom-right','#FFF','error','5000');
    }
    if (typeof post.tabURL == 'undefined' || post.tabURL == '') {
        message('New Tab Error',' Please set a Tab URL','bottom-right','#FFF','warning','5000');
    }
    if (typeof post.tabImage == 'undefined' || post.tabImage == '') {
        message('New Tab Error',' Please set a Tab Image','bottom-right','#FFF','warning','5000');
    }
    if(post.tabOrder !== '' && post.tabName !== '' && post.tabURL !== '' && post.tabImage !== '' ){
        var callbacks = $.Callbacks();
        callbacks.add( buildTabEditor );
        settingsAPI(post,callbacks);
        clearForm('#new-tab-form');
        $.magnificPopup.close();
    }
});
//ADD NEW CATEGORY
$(document).on("click", ".addNewCategory", function () {
    //Create POST
    var nextID = [];
    $($('#categoryEditorTable').find('tr[data-category-id]')).each(function () {
        nextID.push($(this).attr('data-category-id'));
    });
    var post = {
        action:'addNewCategory',
        api:'api/?v1/settings/tab/editor/categories',
        categoryOrder:parseInt($('#categoryEditorTable').find('tr[data-order]').last().attr('data-order')) + 1,
        categoryName:$('#new-category-form [name=name]').val(),
        categoryImage:$('#new-category-form [name=image]').val(),
        categoryID:Math.max.apply( null, nextID ) + 1,
        categoryDefault:0,
        messageTitle:'',
        messageBody:'Created Category '+$('#new-category-form [name=name]').val(),
        error:'Organizr Function: API Connection Failed'
    };
    console.log(post);
    if (typeof post.categoryID == 'undefined' || post.categoryID == '') {
        message('New Category Error',' Could not get next Category ID','bottom-right','#FFF','error','5000');
    }
    if (typeof post.categoryName == 'undefined' || post.categoryName == '') {
        message('New Category Error',' Please set a Category Name','bottom-right','#FFF','error','5000');
    }
    if (typeof post.categoryOrder == 'undefined' || post.categoryOrder == '') {
        message('New Category Error',' Could not get Category Order','bottom-right','#FFF','warning','5000');
    }
    if (typeof post.categoryImage == 'undefined' || post.categoryImage == '') {
        message('New Category Error',' Please set a Category Image','bottom-right','#FFF','warning','5000');
    }
    if(post.categoryID !== '' && post.categoryName !== '' && post.categoryOrder !== '' && post.categoryImage !== '' ){
        var callbacks = $.Callbacks();
        callbacks.add( buildCategoryEditor );
        settingsAPI(post,callbacks);
        clearForm('#new-category-form');
        $.magnificPopup.close();
    }
});
//DELETE CATEGORY
$(document).on("click", ".deleteCategory", function () {
    var category = $(this);
    swal({
        title: window.lang.translate('Delete ')+category.parent().parent().attr("data-name")+'?',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: window.lang.translate('Yes'),
        cancelButtonText: window.lang.translate('No'),
        closeOnConfirm: true,
        closeOnCancel: true
    }, function(isConfirm){
        if (isConfirm) {
            //Create POST Array
            var post = {
                action:'deleteCategory',
                api:'api/?v1/settings/tab/editor/categories',
                id:category.parent().parent().attr("data-id"),
                category:category.parent().parent().attr("data-name"),
                messageTitle:'',
                messageBody:window.lang.translate('Deleted Category')+': '+category.parent().parent().attr("data-name"),
                error:'Organizr Function: API Connection Failed'
            };
            var callbacks = $.Callbacks();
            callbacks.add( buildCategoryEditor );
            settingsAPI(post,callbacks);
        }
    });
});
//EDIT CATEGORY GET ID
$(document).on("click", ".editCategoryButton", function () {
    $('#edit-category-form [name=name]').val($(this).parent().parent().attr("data-name"));
    $('#edit-category-form [name=image]').val($(this).parent().parent().attr("data-image"));
    $('#edit-category-form [name=id]').val($(this).parent().parent().attr("data-id"));
});
//EDIT CATEGORY
$(document).on("click", ".editCategory", function () {
    //Create POST Array
    var post = {
        action:'editCategory',
        api:'api/?v1/settings/tab/editor/categories',
        id:$('#edit-category-form [name=id]').val(),
        name:$('#edit-category-form [name=name]').val(),
        image:$('#edit-category-form [name=image]').val(),
        messageTitle:'',
        messageBody:'Edited Category '+$('#edit-category-form [name=name]').val(),
        error:'Organizr Function: API Connection Failed'
    };
    console.log(post)
    if (typeof post.id == 'undefined' || post.id == '') {
        message('Edit Tab Error',' Could not get Tab ID','bottom-right','#FFF','error','5000');
    }
    if (typeof post.name == 'undefined' || post.name == '') {
        message('Edit Tab Error',' Please set a Tab Name','bottom-right','#FFF','warning','5000');
    }
    if (typeof post.image == 'undefined' || post.image == '') {
        message('Edit Tab Error',' Please set a Tab Image','bottom-right','#FFF','warning','5000');
    }
    if(post.id !== '' && post.name !== '' && post.image !== ''){
        var callbacks = $.Callbacks();
        callbacks.add( buildCategoryEditor );
        settingsAPI(post,callbacks);
        clearForm('#edit-category-form');
        $.magnificPopup.close();
    }
});
//CHANGE DEFAULT CATEGORY
$(document).on("click", ".changeDefaultCategory", function () {
    //Create POST Array
    var post = {
        action:'changeDefault',
        api:'api/?v1/settings/tab/editor/categories',
        id:$(this).parent().parent().attr("data-id"),
        oldCategoryName:$('#categoryEditorTable').find('tr[data-default=true]').attr("data-name"),
        newCategoryName:$(this).parent().parent().attr("data-name"),
        messageTitle:'',
        messageBody:'Changed Default Category to '+$(this).parent().parent().attr("data-name"),
        error:'Organizr Function: API Connection Failed'
    };
    var callbacks = $.Callbacks();
    callbacks.add( buildCategoryEditor );
    settingsAPI(post,callbacks);
});
/* ===== Open-Close Right Sidebar ===== */

$(document).on("click", ".right-side-toggle", function () {
    $(".right-sidebar").slideDown(50).toggleClass("shw-rside");
    $(".fxhdr").on("click", function () {
        $("body").toggleClass("fix-header"); /* Fix Header JS */
    });
    $(".fxsdr").on("click", function () {
        $("body").toggleClass("fix-sidebar"); /* Fix Sidebar JS */
    });

    /* ===== Service Panel JS ===== */

    var fxhdr = $('.fxhdr');
    if ($("body").hasClass("fix-header")) {
        fxhdr.attr('checked', true);
    } else {
        fxhdr.attr('checked', false);
    }
});