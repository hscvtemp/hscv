//
// Global JS file.
//

$(document).ready(function(){
  $(".timeline-list > li > div").addClass("hidden");

  $( ".timeline-list > li" ).click(function() {
    $( this ).toggleClass( "active" );
    $( this ).children("div").toggleClass( "hidden" );
  });
});

