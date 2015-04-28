// JS Functions
jQuery(document).ready(function($) {

  // Bootstrap Transitions
  // Popovers
  $('[data-toggle="popover"]').popover();  
  
  // Collapse Arrow Icon Toggle
    $('body').on('click', '.locader-arrowR[data-toggle="collapse"]', function(){
    $(this).attr('class', 'locader-arrowD')
  });
  $('body').on('click', '.locader-arrowD[data-toggle="collapse"]', function(){
    $(this).attr('class', 'locader-arrowR')
  });
  
  $('#globalNav > li > a').click(function(){
    setActive( '.top-menu-item', $(this), '#globalNav' );
  })
  
  // <Select> Custom module, allow entire space to be clickable
  $('.select').hover(function(){
    $(this).find('.locader-arrowD').toggleClass('hovered');
  });
  
    $('body').on('mousedown', '.checkbox', function() {
    var checkSize, checkState;
    if ( $(this).find('input').hasClass('big') === true )
            checkSize = 'Lg';
      else checkSize = 'Sm';
    if ( $(this).find('input:checked').length > 0 )
        checkState = '_off';
        else checkState = '_on';
    var output = ( 'check locader-check' + checkSize + checkState );
    $(this).find('.check').attr( 'class', output );
  });


  
})
