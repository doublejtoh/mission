$(function(){
	
	
	
	
	//initialize variables
	var $window = $(window);
	var $card_columns = $('.card-columns');
	var $searchInput = $('#searchInput');
	var $currentSearchInput = $searchInput.focus();
	var $button = $('#searchButton');
	var $card = $('.card');
	
	var socket = io();
	
	var page = 1; 
	var currentQuery ;
	function cleanInput(input){
		
		return $('<div/>').text(input).html();
	}
	
	function addMovieCard(movie){
		
		
		var $cardTitle = $('<h5 class="card-title"/>').text(movie.title);
		var $cardBodyDiv = $('<div class="card-body"/>').append($cardTitle);
		var $cardImg = $('<img class="card-img-top"/>').attr("src",movie.large_cover_image);
		var $cardDiv = $('<div class="card"/>').append($cardImg,$cardBodyDiv);
		
		addCardElement($cardDiv);
		
		
	}
	
	function addCardElement(el){
		
		var $el = $(el);
		$card_columns.append($el);
		
		
	}
	
	function cleanAllCards(){
		
		
$('div.card').remove();
		
		
		
		
	}
	
	// keyboard events
	
	$window.keydown(function(event){
		
		console.log("키 눌림");
		if(!(event.ctrlkey || event.metaKey || event.altKey)){
			$currentSearchInput.focus();
			
		}
		
		
		
		if(event.which == 13){ // 엔터키를 눌렀을 때
			page = 1 ;			
			cleanAllCards();
			title = cleanInput($searchInput.val().trim()); 
			currentQuery = title;
			socket.emit('send query',{title: title,page: page});

		}
		
	});
	
	// scroll events
	
	$window.scroll(function(){
		
		
		var scrollHeight = $window.scrollTop() + $(window).height();
		var documentHeight = $(document).height();
		
		if(scrollHeight==documentHeight)
			{
				++page;
				console.log("스크롤 끝");
				console.log(currentQuery);
				console.log(page);
				socket.emit('send query',{title: currentQuery,page: page});	
				
			}
		
	});
	
	
	$button.click(function(){
		page  = 1;
		cleanAllCards();
		title = cleanInput($searchInput.val().trim()); 
		currentQuery = title;		
		socket.emit('send query',{title: title,page: page});
		
		
	});
	
	socket.on('query result',function(movies){
		
		if(movies === null){
			return ;
		}
		movies.forEach(function(movie){
			addMovieCard(movie);
		});
	});
	
	
	
});