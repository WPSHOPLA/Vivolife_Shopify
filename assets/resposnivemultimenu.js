var $j = jQuery.noConflict();

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    return false;
}

function adaptMenu() {

	var windowW = window.innerWidth || $j(window).width();

	$j('.responsive-menu').each(function() {
		var maxWidth = 0;
		var width = 0;
		$j('.dl-menu').children("li").each(function() {
			if($j(this).parent().hasClass('dl-menu')){
				width = $j(this).outerWidth();//outerWidth();
				if(width>0){
					maxWidth += width;
				}
			}
		});

		var width = $j('.responsive-menu').css('max-width');
		width = width.replace('px', ''); 
		// mobile menu off width
		if ( windowW > 1025 ) {
			$j('.dl-menu').removeClass("responsive-menu-mobile");	
			$j(".dl-menu ul").removeClass("dl-subview");
			$j(".dl-menu li").removeClass("dl-subover-hidden");
			$j(".dl-menu li").removeClass("dl-subover-visible");
			$j(".dl-menu a").removeClass("dl-subover-header");

			$j(".responsive-menu-toggled").removeClass("responsive-menu-closed");
			$j('.responsive-menu-toggled').hide();
			$j('body').removeClass("stop-scrolling");
			
		} else {
			$j('.dl-menu').addClass("responsive-menu-mobile");
			$j('.responsive-menu-toggled').show();
			$j('.responsive-menu-toggled').addClass("responsive-menu-closed");
			
		}
	});
}

function resposniveMultiMenu() {	
	$j('.responsive-menu').each(function() {
		$j(this).find("ul").addClass("dl-submenu");
		$j(this).find("ul:first").addClass("dl-menu");
		$j(this).find("ul:first").removeClass("dl-submenu");

	
		if(detectIE()){
			$j(".dl-menu").children("li").find("a:first").addClass("fixie");
			//$j(this).find("ul").prev().addClass("responsive-menu-dropdown");
		}else{
			//$j(this).find("ul").prev().addClass("responsive-menu-dropdown");
		}
	
		var maxWidth = 0;
		var width = 0;

		
		$j('.dl-menu').children("li").each(function() {
			if($j(this).parent().hasClass('dl-menu')){
				width = $j(this).outerWidth();
				if(width>0){
					maxWidth += width;
				}
			}
		});
		
		// var str=''
		// str+='<div class="responsive-menu-toggled responsive-menu-view">'
			// str+='<div class="responsive-menu-toggled-controls">'
			// str+='<button type="button" class="navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>';
			// str+='</div>';
		// str+='</div>';
		
		// $j(this).prepend(str);
	});
	
	$j('.responsive-menu-dropdown').click(function (e) {
		if($j('.dl-menu').hasClass('responsive-menu-mobile')){
			//e.preventDefault();
			//e.stopProgragation();
			$j(this).next().addClass("dl-subview");
		
			var index=$j(this).parent().index();
			
			var i=0;
			$j(this).parent().parent().children("li").each(function() {
				if(index==$j(this).index()){
					$j(this).removeClass("dl-subover-hidden");
					$j(this).addClass("dl-subover-visible");
				} else{
					$j(this).removeClass("dl-subover-visible");
					$j(this).addClass("dl-subover-hidden");
				}
			});
			
			$j(this).addClass("dl-subover-header");
		}
	});
	
	$j('.dl-back a').click(function () {
		$j(this).parent().parent().prev().removeClass("dl-subover-header");
		$j(this).parent().parent().removeClass("dl-subview");
		$j(this).parent().parent().parent().parent().find("li").removeClass("dl-subover-hidden");
	});
	$j('.dl-close a').click(function () {
			console.log('fdsdf')
			$j('.responsive-menu-toggled').find('ul').stop().hide(300);
			$j('.responsive-menu-toggled').removeClass("responsive-menu-open");
			$j('body').removeClass("stop-scrolling");
	});
	$j('.responsive-menu-toggled, .responsive-menu-toggled .responsive-menu-button').click(function(){
		if ( !$j(this).is(".responsive-menu-open")) {
			$j(this).find('ul').stop().show(300);
			$j(this).addClass("responsive-menu-open");
			$j('body').addClass("stop-scrolling");
		} else {
			$j(this).find('ul').stop().hide(300);
			$j(this).removeClass("responsive-menu-open");
			$j('body').removeClass("stop-scrolling");
		}
	});	
}

jQuery(window).load(function() {
    resposniveMultiMenu();
	adaptMenu();
});

$j(window).resize(function() {
 	adaptMenu();
});



$(document).ready(function () {
  $(".main_menus_mobile").click(function(){
    $(this).children(".sub_menus").toggle();
  });
  
  $(".navbar-toggle").click(function(){
	if($('.mobileNav').hasClass("responsive-menu-dropdown")) {
		$('.mobileNav').removeClass("responsive-menu-dropdown");
    	$(".mobileNav").show();
	}
    else
    {
    	$(".mobileNav").toggle();
    }
  });

});