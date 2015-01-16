$(function() {
  var poll_interval = 3;

  var relatizer = function(){
    var dt = $(this).text(), relatized = $.relatizeDate(this)
    if ($(this).parents("a").length > 0 || $(this).is("a")) {
      $(this).relatizeDate()
      if (!$(this).attr('title')) {
        $(this).attr('title', dt)
      }
    } else {
      $(this)
      .text('')
      .append( $('<a href="#" class="toggle_format" title="' + dt + '" />')
              .append('<span class="date_time">' + dt +
                      '</span><span class="relatized_time">' +
                        relatized + '</span>') )
    }
  };

  $('.time').each(relatizer);

  $('.time a.toggle_format .date_time').hide();

  var format_toggler = function(){
    $('.time a.toggle_format span').toggle();
    $(this).attr('title', $('span:hidden',this).text());
    return false;
  };

  $('.time a.toggle_format').click(format_toggler);

  $('.panel').hover(function() {
    $(this).addClass('hover');
  }, function() {
    $(this).removeClass('hover');
  })

  $('a.backtrace').click(function (e) {
    e.preventDefault();
    if($(this).prev('div.backtrace:visible').length > 0) {
      $(this).next('div.backtrace').toggleClass('hide');
      $(this).prev('div.backtrace').toggleClass('hide');
    } else {
      $(this).next('div.backtrace').toggleClass('hide');
      $(this).prev('div.backtrace').toggleClass('hide');
    }
  });
  $('a.handler').click(function (e) {
    e.preventDefault();
    if($(this).prev('div.handler:visible').length > 0) {
      $(this).next('div.handler').toggleClass('hide');
      $(this).prev('div.handler').toggleClass('hide');
    } else {
      $(this).next('div.handler').toggleClass('hide');
      $(this).prev('div.handler').toggleClass('hide');
    }
  });

  $('a[rel=poll]').click(function(e) {
    e.preventDefault();
    var href = $(this).attr('href')
    $(this).parent().text('Starting...')
    $("#main").addClass('polling')

    setInterval(function() {
      $.ajax({dataType: 'text', type: 'get', url: href, success: function(data) {
        $('#main').html(data);
      }})
    }, poll_interval * 1000)

    return false
  })

})
