//temp//

var chks = document.getElementsByName("chk");
for (let i = 0; i < chks.length; i++)
	chks[i].onchange = function() {
			if (this.checked) {
				this.parentNode.parentNode.classList.add("selectedr");
				let c = document.getElementsByName("chk");
				let j = 0;
				for (; j < c.length; j++) 
					if (!c[j].checked) break;
				if (j == c.length) document.getElementById("chkall").checked = true;
				else document.getElementById("chkall").checked = false;
				
			} else {
				this.parentNode.parentNode.classList.remove("selectedr");
				document.getElementById("chkall").checked = false;
				let c = document.getElementsByName("chk");	
				let j = 0;		
				for (; j < c.length; j++)
					if (c[j].checked) break;
				
			}
	};


document.getElementById("chkall").onchange = function() {
	let c = document.getElementsByName("chk");			
	for (let i = 0; i < c.length; i++) {
		c[i].checked = this.checked;
		if (c[i].checked) c[i].parentNode.parentNode.classList.add("selectedr");
		else c[i].parentNode.parentNode.classList.remove("selectedr");		
	}
};



document.querySelector(".group-op-delete").onclick = function() {
	let c = document.getElementsByName("chk");	 		
	for (let i = c.length-1; i >= 0; i--)
		if (c[i].checked) {
			c[i].parentNode.parentNode.parentNode.removeChild(c[i].parentNode.parentNode);
		}
};

$(document).ready(() => {
    $("tr").click((event) => {
        if($(event.target).parent().prop("class") !== "header-row") {
            if($(event.target).parent().children().first().children().prop("checked")) {
                $(event.target).parent().children().first().children().prop("checked", false);
            }
            else {
                $(event.target).parent().children().first().children().prop("checked", true);
            }
        }
    });
})

$(document).ready(function() {
  $('#myInput').on('keyup', function(event) {
     event.preventDefault();
     /* Act on the event */
     var tukhoa = $(this).val().toLowerCase();
     $('#myTable tr').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(tukhoa)>-1);
     });
  });
});
//---//

//--//
(function($) {
  'use strict';
  $(function() {
    var body = $('body');
    var contentWrapper = $('.content-wrapper');
    var scroller = $('.container-scroller');
    var footer = $('.footer');
    var sidebar = $('.sidebar');

    //Add active class to nav-link based on url dynamically
    //Active class can be hard coded directly in html file also as required

    function addActiveClass(element) {
      if (current === "") {
        //for root url
        if (element.attr('href').indexOf("index.html") !== -1) {
          element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
            element.closest('.collapse').addClass('show');
            element.addClass('active');
          }
        }
      } else {
        //for other url
        if (element.attr('href').indexOf(current) !== -1) {
          element.parents('.nav-item').last().addClass('active');
          if (element.parents('.sub-menu').length) {
            element.closest('.collapse').addClass('show');
            element.addClass('active');
          }
          if (element.parents('.submenu-item').length) {
            element.addClass('active');
          }
        }
      }
    }

    var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
    $('.nav li a', sidebar).each(function() {
      var $this = $(this);
      addActiveClass($this);
    })

    $('.horizontal-menu .nav li a').each(function() {
      var $this = $(this);
      addActiveClass($this);
    })

    //Close other submenu in sidebar on opening any

    sidebar.on('show.bs.collapse', '.collapse', function() {
      sidebar.find('.collapse.show').collapse('hide');
    });


    //Change sidebar and content-wrapper height
    applyStyles();

    function applyStyles() {
      //Applying perfect scrollbar
      if (!body.hasClass("rtl")) {
        if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {
          const settingsPanelScroll = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
        }
        if ($('.chats').length) {
          const chatsScroll = new PerfectScrollbar('.chats');
        }
        if (body.hasClass("sidebar-fixed")) {
          if($('#sidebar').length) {
            var fixedSidebarScroll = new PerfectScrollbar('#sidebar .nav');
          }
        }
      }
    }

    $('[data-bs-toggle="minimize"]').on("click", function() {
      if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
        body.toggleClass('sidebar-hidden');
      } else {
        body.toggleClass('sidebar-icon-only');
      }
    });

    //checkbox and radios
    $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

    //Horizontal menu in mobile
    $('[data-toggle="horizontal-menu-toggle"]').on("click", function() {
      $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
    });
    // Horizontal menu navigation in mobile menu on click
    var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');
    navItemClicked.on("click", function(event) {
      if(window.matchMedia('(max-width: 991px)').matches) {
        if(!($(this).hasClass('show-submenu'))) {
          navItemClicked.removeClass('show-submenu');
        }
        $(this).toggleClass('show-submenu');
      }        
    })

    $(window).scroll(function() {
      if(window.matchMedia('(min-width: 992px)').matches) {
        var header = $('.horizontal-menu');
        if ($(window).scrollTop() >= 70) {
          $(header).addClass('fixed-on-scroll');
        } else {
          $(header).removeClass('fixed-on-scroll');
        }
      }
    });
  });

  // focus input when clicking on search icon
  $('#navbar-search-icon').click(function() {
    $("#navbar-search-input").focus();
  });
  
})(jQuery);