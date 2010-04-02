tabAlert
===========

	- When a user is away playing in another browser tab you
	  can still feed them with important imformation. This is
	  a great extension to AJAX calls.
	  
![Screenshot](http://www.rickyh.co.uk/resources/2010/tabAlertSS.jpg)

How to use
----------

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
