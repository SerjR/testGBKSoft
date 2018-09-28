
$(document).ready(function() {

  $('#navColumnButton, #mainColumnArrowButton').click(function () {
    if ($('.navColumn').hasClass('navColumn_close')) {
      $('.navColumn').removeClass('navColumn_close');
      $('.mainColumn__arrowButton > svg').css('transform', 'rotate(0deg)');

    } else {
      $('.navColumn').addClass('navColumn_close');
      $('.mainColumn__arrowButton > svg').css('transform', 'rotate(180deg)');

    }
  });

});

$( "#tabs" ).tabs();
