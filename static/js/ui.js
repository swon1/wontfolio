
function loadFunction(brCheck) {

     const a = document;

     const ease = {
          s500 : 500,
          s650 : 650,
          s750 : 750,
          outQuad : 'easeOutQuad',
          outQuart : 'easeOutQuart',
     };
     let { s500, s650, s750, outQuad, outQuart } = ease;

     // Reload Btn
     const pReload = {
          btn : a.querySelector('#header .logo a'),

          active : () => {
               loading.f();
               setTimeout( () => {
                    gsap.to("body", .65, { opacity : 0, ease : outQuart, onComplete : () => { location.reload(); } });
               },2500);

          },
     };
     pReload.btn.addEventListener('click',pReload.active);

     // Footer Page Nav
     const pTextNav = {
          btn : a.querySelectorAll('#main .content-menu-place li a, #nav .nav-menu a'),
          text : a.querySelector('#footer .page-check p'),
          target : null,

          active : ( thisEl ) => {
               $(pTextNav.target).addClass('active').siblings('section').removeClass('active');
               pTextNav.box = a.querySelectorAll('section.active'),
               pTextNav.name = $(pTextNav.box).attr('data-name');
               pTextNav.change(pTextNav.name);
               sidePageBar.active(pTextNav.name, 1750);

               let navC = thisEl.target.parentNode;
               if ( $(navC).hasClass('nav-menu') ) {
                    setTimeout( () => {
                         $(pTextNav.target).stop(true).animate({'opacity':'1'},s500, outQuad, function () {
                              $(pTextNav.target).css({'z-index':'2'}).siblings('section').css({'opacity':'0','z-index':'1'});
                         });
                    }, 1500);
               } else {
                    $(pTextNav.target).stop(true).animate({'opacity':'1'},s500, outQuad, function () {
                         $(pTextNav.target).css({'z-index':'2'}).siblings('section').css({'opacity':'0','z-index':'1'});
                    });
               }
          },
          change : function (submit) {
               $(pTextNav.text).stop().animate({'opacity':'0'},s750, outQuad, () => {
                    $(pTextNav.text).text(submit + " PAGE");
                    $(pTextNav.text).stop().animate({'opacity':'1'},s750, outQuad);
               });
          },
     };
     $(pTextNav.btn).on('click', function (e) {
          e.preventDefault();
          
          if ( !( $(this).hasClass('popBtn') ) ) {
               pTextNav.target = $(this).attr('data-target');
               pTextNav.active(e);
               if ( $('.nav').hasClass('view') ) {
                    return;
               } else {
                    loading.f();
               }
          } else {
               return;
          }
     });

     // Side pageBar
     const sidePageBar = {
          active : ( w,s ) => {
               setTimeout( () => {
                    $('#page-bar .bar' + w).addClass('active').siblings('li').removeClass('active');
                    if ( w == 'PORTFOLIO' ) {
                         $('.pageBar').addClass('white');
                    } else { $('.pageBar').removeClass('white'); }
               }, s);
          }
     };

     // Mouse Wheel
     function mouseEvent () {
          let $section = a.querySelectorAll('#section > section');
          $($section).on( 'mousewheel', ( event ) => {
               let evtT = event.currentTarget;
               let evtD = event.originalEvent.deltaY;
               let nextNode = evtT.nextElementSibling;
               let prevNode = evtT.previousElementSibling;
               if ( $($section).is(":animated") || $($section).siblings('section').is(":animated") ) {
                    return;
               } else {
                    if ( evtD > 0 && !(nextNode == null) ) {
                         $(evtT).removeClass('active');
                         $(evtT).next().addClass('active').css({'z-index':'2'}).stop(true).animate({'opacity':'1'},s500, outQuad, () => {
                              $(evtT).css({'opacity':'0','z-index':'1'});
                         });
                         pTextNav.change($(evtT).next().attr('data-name'));
                         sidePageBar.active($(evtT).next().attr('data-name'), 200);
                    } else if ( evtD < 0 && !(prevNode == null) ) {
                         $(evtT).removeClass('active').css({'z-index':'1'});
                         $(evtT).prev().addClass('active').css({'z-index':'2'}).stop(true).animate({'opacity':'1'},s500, outQuad, () => {
                              $(evtT).css({'opacity':'0'});
                         });
                         pTextNav.change($(evtT).prev().attr('data-name'));
                         sidePageBar.active($(evtT).prev().attr('data-name'), 200);
                    }
               }
          });

          /*
          let touchS, touchE;
          $($section).on( 'touchstart', ( evt ) => {
               evt.preventDefault();
               touchS = evt.touches[0].pageY;
          });
          $($section).on( 'touchend', ( evt ) => {
               evt.preventDefault();
               let touT = evt.currentTarget;
               let touNext = touT.nextElementSibling;
               let touPrev = touT.previousElementSibling;
               touchE = evt.changedTouches[0].pageY;

               if ( $($section).is(":animated") || $($section).siblings('section').is(":animated") ) {
                    return;
               } else {
                    if ( (touchS > touchE) && !(touNext == null) ) {
                         $(touT).removeClass('active');
                         $(touT).next().addClass('active').css({'z-index':'2'}).stop(true).animate({'opacity':'1'},s500, outQuad, () => {
                              $(touT).css({'opacity':'0','z-index':'1'});
                         });
                         pTextNav.change($(touT).next().attr('data-name'));
                         sidePageBar.active($(touT).next().attr('data-name'), 200);
                    } else if ( (touchS < touchE) && !(touPrev == null) ) {
                         $(touT).removeClass('active').css({'z-index':'1'});
                         $(touT).prev().addClass('active').css({'z-index':'2'}).stop(true).animate({'opacity':'1'},s500, outQuad, () => {
                              $(touT).css({'opacity':'0'});
                         });
                         pTextNav.change($(touT).prev().attr('data-name'));
                         sidePageBar.active($(touT).prev().attr('data-name'), 200);
                    }
               }

          });
          */
     }

     // Side Nav
     function navCursor() {
          let $nav_cursor = $('.nav-cursor'),
               $nav_wrap = $('.nav-wrap'),
               $nav_box = $('#header .nav-box'),
               $nav_logo = $('#nav .nav-title a'),
               $nav_btn = $('#nav .nav-menu a');

          $($nav_wrap).children().css({ 'opacity' : '0' });

          let $nav_exit = () => {
               $('.nav').removeClass('view');
               $($nav_wrap).find('.nav-menu').stop().animate({ 'opacity': '0' }, s500, outQuart, () => {
                    $($nav_wrap).find('.nav-title').stop().animate({ 'opacity': '0' }, s500, outQuart, () => {
                         $('.nav').stop().animate({ 'left': '100%' }, s500, outQuart);
                    })
               })
          };

          $($nav_box).on('click', () => {
               if ( $('.nav').hasClass('view') ) {
                    return;
               } else {
                    $('.nav').stop().animate({ 'left': '0%' }, s500, outQuart, () => {
                         $($nav_wrap).find('.nav-title').stop().animate({ 'opacity': '1' }, s500, outQuart, () => {
                              $($nav_wrap).find('.nav-menu').stop().animate({ 'opacity': '1' }, s500, outQuart);
                         })
                    });
                    $('.nav').addClass('view');
               }
          });
          $($nav_cursor).on('click', () => {
               if ( $('.nav').hasClass('view') ) {
                    $nav_exit();
               } else {
                    return;
               }
               TweenMax.to($nav_cursor, .3, { autoAlpha: 0, onComplete: () => { $nav_cursor.hide(); } });
          });
          $($nav_logo).on('click', function (e) {
               e.preventDefault();
               if ( !( $(this).hasClass('popBtn') ) ) {
                    if ( $('.nav').hasClass('view') ) {
                         $nav_exit();
                         setTimeout( () => { pReload.active(); },1450);
                    }
               } else {
                    return;
               }
          })
          $($nav_btn).on('click', function (e) {
               e.preventDefault();
               if ( !( $(this).hasClass('popBtn') ) ) {
                    if ( $('.nav').hasClass('view') ) {
                         $nav_exit();
                         setTimeout( () => { loading.f(); },1450);
                    } else {
                         return;
                    }
                    TweenMax.to($nav_cursor, .3, { autoAlpha: 0, onComplete: () => { $nav_cursor.hide(); } });
               } else {
                    return;
               }
          })

          $('.nav').on('mousemove', function (e) {
               TweenMax.to($nav_cursor, 0.45, {
                    x: e.clientX,
                    y: e.clientY,
                    ease: Power3.easeOut
               });
               if ( !$nav_cursor.is(":visible") ) {
                    TweenMax.to($nav_cursor, .3, { autoAlpha: 1, onStart: () => { $nav_cursor.show(); } });
               }
          });
          $(a).on('mouseenter', '.nav-title, .nav-menu', () => {
               TweenMax.killTweensOf($nav_cursor.find('> span'));
               TweenMax.to($nav_cursor.find('> span'), .3, { autoAlpha: 0 });
          });
          $(a).on('mouseleave', '.nav-title, .nav-menu', () => {
               TweenMax.killTweensOf($nav_cursor.find('> span'));
               TweenMax.to($nav_cursor.find('> span'), .3, { autoAlpha: 1 });
          });
     }

     // Pop
     const pop = {
          box : a.querySelector('#pop'),
          btn : a.querySelectorAll('.popBtn'),
          exit : a.querySelectorAll('.pop-exit'),

          on : function (e) {
               e.preventDefault();
               let targetC = $(this).attr('data-pop');

               $('.' + targetC).addClass('view').parents(pop.box).css({'display':'block'}).stop().animate({'opacity':'1'},s500, outQuart);
          },
          off : () => {
               $(pop.box).stop().animate({'opacity':'0'},s500, outQuart, function () {
                    $(this).css({'display':'none'}).find('.view').removeClass('view');
               })
          },
     };
     $(pop.btn).on('click', pop.on);
     $(pop.exit).on('click', pop.off);

     // Loading
     const loading = {
          box : a.getElementById('loading'),
          inner : a.querySelector('.loading-inner'),

          f : () => {
               $(loading.box).stop().animate({height:'100%'},s650, outQuart, () => {
                    $(loading.inner).addClass('motion').stop().animate({opacity:'1'},s650 , 'swing');
               });
               setTimeout( () => {
                    $(loading.inner).stop().animate({opacity:'0'},s650 , 'swing', () => {
                         $(loading.inner).removeClass('motion');
                         $(loading.box).stop().delay(150).animate({top:'100%'},s650, outQuart, () => {
                              $(loading.box).css({top:'0%',height:'0%'});
                         });
                    });
               },1500);
          },
     };

     // Content Function
     function mainFunction() {

          console.log(brCheck);

          let audio = $('.audio button').children();
          let audioPop = a.querySelector('.toAudio');

          let isDown = false;

          // setTimeout( () => {
          //      $(audioPop).addClass('view').parents(pop.box).css({'display':'block'}).stop();
          //      gsap.to(pop.box, .85, { opacity : 1, ease : outQuart });
          // }, 1750);

          $(audioPop).find('.audioRun').on('click', ( ) => {
               pop.off();
               $(audio).siblings('.play').removeClass('active').siblings('.pause').addClass('active');
               $("#player")[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
          })

          $(audio).on('click', function () {
               if ($(this).hasClass('active') && $(this).hasClass('play')) {
                    $(this).removeClass('active').siblings().addClass('active');
                    $("#player")[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
               } else if ($(this).hasClass('active') && $(this).hasClass('pause')) {
                    $(this).removeClass('active').siblings().addClass('active');
                    $("#player")[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
               }
          })

          const portPopStart = () => {
               let portPopBtn = a.querySelectorAll('#port .port-btn');
               [].forEach.call( portPopBtn, ( el ) => {
                    el.addEventListener( "click", function () {
                         if ( !(isDown) ) {
                              let popTarget = $(this).attr('data-target');
                              portPop.open(popTarget);
                         }
                    });
               });

               let portExitBtn = a.querySelectorAll('#port .section-pop-exit');
               [].forEach.call( portExitBtn, ( el ) => {
                    el.addEventListener( "click", function () {
                         let ExitTarget = $(this).parents('.sec-pop-inner').attr('id');
                         portPop.close(ExitTarget);
                    });
               });
          };
          const portPop = {
               box : a.querySelector('.section-pop'),
               open : ( target ) => {
                    console.log(target);
                    $(`#${target}`).show();
                    $(portPop.box).stop(true,false).fadeIn(s650, outQuad, () => {
                         $(`#${target}`).find('.sec-pop-box').css({'top':'50%','opacity':'1'});
                    });
               },
               close : ( target ) => {
                    $(`#${target}`).find('.sec-pop-box').css({'top':'65%','opacity':'0'});
                    setTimeout( () => {
                         $(portPop.box).stop(true,false).fadeOut(s650, outQuad, () => {
                              $(`#${target}`).hide();
                              $(`#${target}`).find('.sec-pop-box').css({'top':'35%'});
                         });
                    }, 1000);
               },
          };
          portPopStart();

          const cirStart = () => {
               let cirBox = a.querySelector('#contact .cirBox');
               for ( el = 0; el < 36; el++ ) {
                    cirBox.innerHTML += '<div class="cir"></div>';
               }
          };
          if ( brCheck === 'firefox' ) { a.querySelector('.cirBox').classList.add('off'); } else { cirStart(); }

          let portImgBox = a.querySelectorAll('#port .sec-pop-img');
          for ( bL = 0; bL < portImgBox.length; bL++ ) {
               let imgL = $(portImgBox[bL]).find('img').length;
               if ( imgL > 1 ) { portImgBox[bL].classList.add('multiple'); }
          }

          // const btnC = function () {
          //      let studySct = $('#contact').offset().top;
          //      let headerH = $('#header').outerHeight(true);
          //      setTimeout( function () {
          //           gsap.to('#section', 1.0, {
          //                scrollTop:studySct-headerH,
          //                ease: Power3.easeInOut
          //           });
          //      }, 1000 );
          // };
          // btnC();

          const moPagenation = () => {
               let pnSection = a.querySelectorAll('#section > section');
               let pnBtn = a.querySelectorAll('#page-bar');
               [].forEach.call( pnBtn, ( el ) => {
                    el.addEventListener('click', (e) => {
                         let pnT = (e.target).getAttribute('data-target');
                         if ( $(pnSection).is(":animated") || $(pnSection).siblings('section').is(":animated") ) {
                              return;
                         } else {
                              $(pnT).addClass('active').css({'z-index':'2'}).stop(true).animate({'opacity':'1'},s500, outQuad, () => {
                                   $(pnT).siblings().css({'opacity':'0','z-index':'1'});
                              });
                              pTextNav.change($(pnT).attr('data-name'));
                              sidePageBar.active($(pnT).attr('data-name'), 200);
                         }
                    });
               });
          };

          // if ( brCheck == 'mobile' ) {
          //      moPagenation();
          // }
          const pcScrollFn = () => {
               const scrollEl = document.querySelectorAll('#port .port-box');
               const mouseScroll = function ( ele ) {
                    const scrollTarget = ele;
                    let startX;
                    let scrollLeft;
                    let moved;
                    let tarEl;
        
                    const scrollStartFn = function (el,e) {
                        el.classList.add('active');
                        startX = e.pageX - el.offsetLeft;
                        scrollLeft = el.scrollLeft;
                        moved = true;
                        window.addEventListener('mousemove', (e) => { scrollMoveFn(el,e) });
                        window.addEventListener('mouseup', (e) => { scrollEndFn(el,e) });
                    };
                    const scrollMoveFn = function (el,e) {
                        if ( !moved ) { return; }
                        el = tarEl;
                        isDown = true;
                        const x = e.pageX - el.offsetLeft;
                        const walk = x - startX;
                        el.scrollLeft = scrollLeft - walk;
                    };
                    const scrollEndFn = function (el,e) {
                        tarEl.classList.remove('active');
        
                        window.removeEventListener('mousemove',scrollMoveFn);
                        window.removeEventListener('mouseup',scrollEndFn);
                        el.removeEventListener('mousedown',scrollStartFn);
        
                        moved = false;
        
                        setTimeout(function(){
                            isDown = false;
                        },50);
                    };
                    const eventFn = function () {
                        [].forEach.call( scrollTarget, ( el ) => {
                            el.addEventListener('mousedown', (e) => {
                                tarEl = el;
                                scrollStartFn(tarEl,e);
                            });
                        });
                    };
                    eventFn();
               };
               mouseScroll(scrollEl);
          };
          ( brCheck == 'mobile' ) ? moPagenation() : pcScrollFn();
     }

     mouseEvent();
     navCursor();
     mainFunction();

}