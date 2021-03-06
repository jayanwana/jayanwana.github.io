/* Theme Name: Zoovara - Personal Template
   Author: Mannat-themes
   Version: 1.0.0
   File Description:App JS file of the template
*/

!function ($) {
    "use strict";
    var MainApp = function () {};

        //===== ripples =====

        MainApp.prototype.initprofileRipple = function () {

           $('#profile_ripple').ripples({
                resolution: 512,
                dropRadius: 20, //px
                perturbance: 0.04,
            });
        },

        //=====counter =====

        MainApp.prototype.initCounter = function () {
            var a = 0;
            $(window).scroll(function() {
                var oTop = $('#counter').offset().top - window.innerHeight;
                if (a == 0 && $(window).scrollTop() > oTop) {
                    $('.counter-value').each(function() {
                        var $this = $(this),
                            countTo = $this.attr('data-count');
                        $({
                            countNum: $this.text()
                        }).animate({
                                countNum: countTo
                            },

                            {
                                duration: 2000,
                                easing: 'swing',
                                step: function() {
                                    $this.text(Math.floor(this.countNum));
                                },
                                complete: function() {
                                    $this.text(this.countNum);
                                    //alert('finished');
                                }

                            });
                    });
                    a = 1;
                }
            });
        },

        //=====Filter=====

        MainApp.prototype.initFilter = function () {
            $(window).on('load', function() {
            //PORTFOLIO FILTER
            var $container = $('.projects-wrapper');
            var $filter = $('#filter');
            // Initialize isotope
            $container.isotope({
                filter: '*',
                layoutMode: 'masonry',
                animationOptions: {
                    duration: 750,
                    easing: 'linear'
                }
            });
            // Filter items when filter link is clicked
            $filter.find('a').click(function() {
                var selector = $(this).attr('data-filter');
                $filter.find('a').removeClass('active');
                $(this).addClass('active');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        animationDuration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
            /*END*/
          });
        },

        //===== magnific Popup =====

        MainApp.prototype.initmagnificPopup = function () {
            $('.mfp-image').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                mainClass: 'mfp-fade',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                        // Will preload 0 - before current, and 1 after the current image
                }
            });
        },

         //===== magnific Popup =====
        MainApp.prototype.initPrint = function () {
            $('#lnkPrint').click(function(){

                 window.print();
            });
        },

        //===== contact =====
        MainApp.prototype.initContact = function () {
            $('#contact-form').submit(function(event) {
                event.preventDefault()
                let name = $('#name').val();
                let email = $('#email').val();
                let comments = $('#comments').val();
                var action = $(this).attr('action');
                var res = "<fieldset>" + "<div id='success_page'>"+"<h3>Email Sent Successfully.</h3>"+"<p class='text-muted'>Thank you <strong>" + name +"</strong>, your message has been submitted to us.</p>"+"</div>"+"</fieldset>";
                $("#message").slideUp(750, function() {
                    $('#message').hide();

                    $('#submit')
                        .before('')
                        .attr('disabled', 'disabled');

                    function sendEmail() {
                        emailjs.send("service_kl846fc","template_9a1vyth",{
                          name: name,
                          comment: comments,
                          reply_to: email,
                        }).then(
                          function(data) {
                              if (data.status === 200) {
                                document.getElementById('message').innerHTML = res;
                              } else if (data.text) {
                                document.getElementById('message').innerHTML = data.text;
                              } else {
                                document.getElementById('message').innerHTML = "An error occurred.";
                              }
                              $('#message').slideDown('slow');
                              $('#cform img.contact-loader').fadeOut('slow', function() {
                                  $(this).remove()
                              });
                              $('#submit').removeAttr('disabled');
                              if (data.status === 200) $('#cform').slideUp('slow');
                          }
                      	).catch( error => console.log(error))
                      }
                      sendEmail()
                    // $.post(action, {
                    //         name: $('#name').val(),
                    //         email: $('#email').val(),
                    //         comments: $('#comments').val(),
                    //     },
                    //     function(data) {
                    //         document.getElementById('message').innerHTML = res;
                    //         $('#message').slideDown('slow');
                    //         $('#cform img.contact-loader').fadeOut('slow', function() {
                    //             $(this).remove()
                    //         });
                    //         $('#submit').removeAttr('disabled');
                    //         if (data.match('success') != null) $('#cform').slideUp('slow');
                    //     }
                    // );
                });
                return false;
            });
        },

        MainApp.prototype.init = function () {
            this.initprofileRipple();
            this.initCounter();
            this.initFilter();
            this.initmagnificPopup();
            this.initPrint();
            this.initContact();
        },
        //init
        $.MainApp = new MainApp, $.MainApp.Constructor = MainApp
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.MainApp.init();
    }(window.jQuery);
