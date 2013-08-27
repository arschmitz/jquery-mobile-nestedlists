(function( $, window, undefined ) {
	var link;

	$.mobile.document.on( "click", ".ui-listview>a", function(){
		link = $( this );
	});

	$.extend( $.mobile, {
		nestedlists: {
			keys: {
				"data": "ui-data-list",
				"hidden": "ui-list"
			},
			//default callback assumes page is stored on 
			//$.mobile.nestlists and is just an array or strings
			callback: function( pageName ) {
				var nestedList = list.clone();
				$.each( $.mobile.nestedlists.pages[pageName], function ( index, value ) {
					nestedList.append("<li>"+value+"</ul>");
				});
				return nestedList;
			},
			pages: {},
			page: $("<div data-role='page' class='nested-list-page'></div>"),
			header: $("<div data-role='header'><a href='#' data-rel='back'>Back</a><h1></h1></div>"),
			content: $("<div class='ui-content'></div>"),
			list: $("<ul data-role='listview'></ul>")
		}
	});

	$.mobile.document.on("pagebeforechange", function(e, data){

		if( typeof data.toPage  === "string"){ 
			var newPage, nestedList, pageName, pageID,
				key = data.toPage.split("&")[1];      
		}

		if( key === $.mobile.nestedlists.keys.data ||  key === $.mobile.nestedlists.keys.hidden ){
			pageID = data.toPage.split("&")[0].split("#")[1].replace("#","");
			pageName = pageID.replace( key,"");
			newPage = $.mobile.nestedlists.page.clone().attr("id",pageID);

			//get list contents
			if( key === $.mobile.nestedlists.keys.hidden ){
				nestedList = link.children("ul").clone().removeClass("hidden-list");
			} else if( key === $.mobile.nestedlists.keys.data ) {
				nestedList = $.mobile.nestedlists.callback( pageName );
			}
			// Build new page  
			newPage.append($.mobile.nestedlists.header.clone().find("h1").text(pageName).end())
				.append($.mobile.nestedlists.content.clone())
				.find("div.ui-content").append(nestedList);

			// Remove Nested Page
			$.mobile.pageContainer.append(newPage);
			$.mobile.document.one("pagechange", function(){
				$.mobile.document.one("pagechange", function(){
					$(".nested-list-page").remove();
				});
			});
			//update data object
			if( typeof data.toPage === "string" ) {
				data.toPage = data.toPage.replace( "&" + key).replace( "undefined", "");
				data.options.hash = "#" + pageID;
			}
		}
	});
})( jQuery, this );