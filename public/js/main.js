var k = {
	vars: {
		w_height: 0,
		w_width: 0
	},
	ui: {
		$w: $(window),
		$all_sections: $('.section'),
		$intro_section: $('.intro-section'),
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

			if (k.vars.w_width >= 728) {
				$work_item.height(img_height);
			} else {
				$this.height(img_height + desc_height);
				$work_item.height(img_height + desc_height);
				$work_desc.css('top', img_height + 'px');
			}
		});
	},
	init_bg_media: function() {
		var bg_media = new $.BigVideo();
		bg_media.init();
		bg_media.show('/video/mountain.m4v', {
			ambient: true,
			altSource: '/video/mountain.ogv'
		});
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
		$(document).on('click', '.nav-trigger', function(e){
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

		k.ui.$w.on('resize', function(){
			k.set_intro_height();
			k.set_work_height();
		});
	}
};

$(function(){
	k.init();
});