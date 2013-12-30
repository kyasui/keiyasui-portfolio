var k = {
	vars: {
		w_height: 0,
		w_width: 0
	},
	ui: {
		$doc: $(document),
		$w: $(window),
		$body: $('body'),
		$all_sections: $('.section'),
		$intro_section: $('.intro-section'),
		$projects_section: $('#projects-section'),
		$work_rows: $('.work-row')
	},
	init: function() {
		this.set_intro_height();
		this.set_work_height();
		this.init_bg_media();
		this.init_waypoints();
		this.bind_events();
	},
	set_intro_height: function() {
		k.vars.w_height = k.ui.$w.height();
		k.vars.w_width = k.ui.$w.width();

		k.ui.$intro_section.height(k.vars.w_height);
	},
	set_work_height: function() {
		k.ui.$work_rows.each(function(){
			var $this = $(this),
				$work_item = $this.find('.work-item'),
				$work_desc = $this.find('.work-description'),
				desc_height = $work_desc.height();
				img_height = $this.find('.work-img').height();

			if (k.vars.w_width >= 960) {
				$this.height('auto');
				$work_item.height(img_height);
				$work_desc.css('top', '');
			} else {
				$this.height(img_height + desc_height);
				$work_item.height(img_height + desc_height);
				$work_desc.css('top', img_height + 'px');
			}
		});
	},
	init_bg_media: function() {
		if (k.vars.w_width >= 960) {
			var bg_media = new $.BigVideo();
			bg_media.init();
			bg_media.show('/video/city.mp4', {	
				ambient: true,
				altSource: '/video/city.ogv'
			});
		} else {
			k.ui.$body.addClass('mobile');
		}
	},
	init_waypoints: function() {
		k.ui.$all_sections.each(function(){
			var $this = $(this);

			$this.waypoint(function(direction) {
  				if ($this.find('.animate')) {
  					$this.find('.animate').each(function(index){
  						var $that = $(this);

  						setTimeout(function(){
  							$that.addClass('activate');
  						}, 250*index);
  					});  					  					
  				}
			}, { offset: '50%' });
		});
	},
	bind_events: function() {
		k.ui.$doc.on('click', '.nav-trigger', function(e){
			e.preventDefault();

			var $this = $(this),
				$nav_items = $('.nav-item');

			if ($this.hasClass('active')) {
				$this.removeClass('active');
				$nav_items.each(function(index){
					var $that = $(this);

					setTimeout(function(){
						$that.removeClass('active');
					}, 100*index);					
				});
			} else {
				$this.addClass('active');
				$nav_items.each(function(index){
					var $that = $(this);

					setTimeout(function(){
						$that.addClass('active');
					}, 100*index);					
				});
			}
		});

		k.ui.$projects_section.imagesLoaded().always( function( instance ) {
		    k.ui.$w.trigger('resize');
		}).done( function( instance ) {
		    // console.log('all images successfully loaded');
		}).fail( function() {
		    // console.log('all images loaded, at least one is broken');
		}).progress( function( instance, image ) {
		    $(image.img).parents('.work-image').addClass('loaded');
		});

		k.ui.$doc.on('click', '.nav-item', function(e){
			e.preventDefault();

            var $this = $(this),
            	$nav_items = $('.nav-item'),
                target = $this.attr('href'),
                target_offset = $(target).offset().top;

            $nav_items.removeClass('selected');

            $this.addClass('selected');

            $('html, body').animate({
                scrollTop:target_offset
            }, 500);
		});

		k.ui.$w.on('resize', function(){
			k.set_intro_height();
			k.set_work_height();
		});
	}
};

$(function(){
	k.init();
});