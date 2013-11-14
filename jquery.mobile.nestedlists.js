(function( $, window, undefined ) {
	$.mobile.document.on("pagecreate", "div", function(){
		$("ul>li>ul").css("display","none");
		$("ul>li>ul").parent().addClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
	});
	$.mobile.document.on( "click", ".ui-listview>li", function(){
		if( $(this).children( "ul" ).length == 0 ) {
			return;
		}
		var newPage = $.mobile.nestedlists.page.clone().uniqueId(),
			nestedList  = $( this ).children("ul").clone().attr( "data-" + $.mobile.ns + "role", "listview" ).css("display","block"),
			pageName = ( $( this.childNodes[0] ).text().replace(/^\s+|\s+$/g, '').length > 0 )? $( this.childNodes[0] ).text() : $( this.childNodes[1] ).text(),
			pageID = newPage.attr( "id" );

		// Build new page
		newPage.append($.mobile.nestedlists.header.clone().find("h1").text(pageName).end())
			.append($.mobile.nestedlists.content.clone())
			.find("div.ui-content").append(nestedList);

		$.mobile.pageContainer.append(newPage);

		$.mobile.changePage( "#" + pageID );

		// Remove Nested Page
		$.mobile.document.one( "pagechange", function(){
			$.mobile.document.one( "pagechange", function(){
				$.mobile.document.one( "pagechange", function(){
					$(".nested-list-page").remove();
				});
			});
		});
	});

	$.extend( $.mobile, {
		nestedlists: {
			page: $("<div data-role='page'></div>"),
			header: $("<div data-role='header'><a href='#' data-rel='back'>Back</a><h1></h1></div>"),
			content: $("<div class='ui-content'></div>")
		}
	});
})( jQuery, this );