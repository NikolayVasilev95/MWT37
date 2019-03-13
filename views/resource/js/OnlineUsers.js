(function($){
  $('#Online').hover(function(){
    $(this).addClass("text-right");
    $('#OnlineUsers').show();
  }, function() {
    $(this).removeClass("text-center");
    $('#OnlineUsers').hide();
  });
})(jQuery);
