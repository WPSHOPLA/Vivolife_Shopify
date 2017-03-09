jQuery( document ).ready(function() {
  var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
  jQuery("body *").each(function() {
    var str = jQuery(this).html();
    if(!isHTML(str)) {
      jQuery(this).html(str.replace('(', '&rlm; ('));
    }
  });
});