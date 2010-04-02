/*
description: tabAlert
	- When a user is away playing in another browser tab you
	  can still feed them with important imformation. This is
	  a great extension to AJAX calls.

authors:
  - Ricky Harrison	http://www.rickyh.co.uk

license:
  - MIT-style license

requires:
  core/1.2.1:   '*'

provides:
  - tabAlert

examples:

	1.	Updates the document.title to until the user returns to the tab.
	
				var ex1 = new tabAlert({
					text: 'You Have one new message' 
				});
	
	2. Goal Flash Ticker.
				
				var ex2 = yourInstance = new tabAlert({
					text: 'GOAL FLASH: Manchester United 0:1 LEEDS UNITED (Beckford 19)',
					ticker: true
				});
				
				
				// to update the text use
				ex2.updateText("FINAL SCORE: Manchester United 0:1 LEEDS UNITED");
	
	
	3. Goal Flash Ticker. Flashes live data but only loops once!
	
				var ex3 = yourInstance = new tabAlert({
					text: 'GOAL FLASH: Manchester United 0:1 LEEDS UNITED (Beckford 19)',
					ticker: true,
					onLoop: function(){
						this.revert();
					}
				});
	 

*/

 
var tabAlert = new Class({
	//implements
	Implements: [Events, Options],

	//options
	options: {
		//public options
		text: 'insert text here',	// the text that will be set in the browsers tab.
		delay: 300,					// the delay is used to detect if the user is inactive or in another browser window.
		inView: false,				// caution: setting this to true changes the tab text under any circumstances. 
		revert: true, 				// highly recomended and if tickering an almost must.
		onInit: $empty,				// onInit is triggered when initialized
		onUpdate: $empty,			// onUpdate is triggered when the text is changed. After the delay set.
		onRevert: $empty,			// onRevert is triggered When the text returns to its original value.
		
		// ticker options - these can be used to give your webpage animation nb. (This may ruin the web).
		ticker: false,				// if true the text will be animated
		tickerDelay: 500,			// the delay at the start before ticking and after a loop.
		speed: 100,					// this is the delay between motion. 1 = fast, 1000 = slow.
		onTick: $empty,				// onTick is triggered when one letter moves in the ticker.
		onLoop: $empty,				// onLoop is triggered after a full circle. NB. 
		
		
		//private do not edit or use
		mm: false,
		l: 0,
		original: ''
	},	
	
	//initialization
	initialize: function(options) {
			
		// set options
		this.setOptions(options);
		
		// prevents multiple casses ar one time
		if($(document.body).retrieve("Mootools_tabAlert_version1")){
			return false;
		}
		$(document.body).store("Mootools_tabAlert_version1", true);

		if(this.revert){
			this.options.original = document.title;
		}
		
		var mm;
		var de = this.update.delay(this.options.delay, this);
		
		if(!this.options.inView){
			mm = function(){ 
				clearTimeout(de);
				$(document.body).removeEvent('mousemove', mm);
			}
			this.options.mm = mm;
			
			$(document.body).addEvent(
				"mousemove", mm
			)		
		}
		
		this.fireEvent('onInit');
		
	},
	updateText: function(t){
		if(this.options.ticker){
			this.options.l = 0;
			this.options.text = t;
		}
		else{
			this.options.text = t;
			document.title = this.options.text;
		}
	},
	update: function() {	
			if(this.options.mm){
				$(document.body).removeEvent('mousemove', this.options.mm);
			}
			
			this.fireEvent('onUpdate');
			document.title = this.options.text;
			
			if(this.options.revert){
			 	var rev = this.revert.bind(this);
			 	$(document.body).addEvent("mousemove", rev);		
			}
			
			if(this.options.ticker){
				this.pushTick();
			}	
	},
	pushTick: function(){
		if(this.options.ticker){
			document.title = this.options.text.substring(this.options.l,this.options.text.length);
			this.fireEvent('onTick');
			this.options.l = this.options.l+1;
			if(this.options.l >= this.options.text.length){
				this.fireEvent('onLoop');
				this.options.l = 0;
			}
			
			if(this.options.l == 1){
				this.pushTick.delay(this.options.tickerDelay, this);
			}
			else{
				this.pushTick.delay(this.options.speed, this);
			}
			
		}
	},
	revert: function(){
		$(document.body).removeEvents("mousemove");
		this.options.ticker = false;
		this.fireEvent('onRevert');
		document.title = this.options.original;
		$(document.body).eliminate("Mootools_tabAlert_version1");
	}
	
});


 