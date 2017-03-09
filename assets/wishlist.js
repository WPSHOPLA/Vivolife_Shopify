(function(e) {
    var obj = {
      init: function() {
        this.initWishlist();
      },
      initWishlist: function() {
        obj.buttonAddEvent();
        obj.buttonRemoveEvent();
      },

      // wishlist
      buttonAddEvent: function() {
        if (e(".add-in-wishlist").length > 0) {
          e('.add-in-wishlist').unbind();
          e('.add-in-wishlist').each(function() {
            e(this).click(function(event) {
              event.preventDefault();
              var variant_id = e(this).attr('id');//remove after success, and get object not a link
              var _parent = e(this).parent().parent().parent().parent();
              var form = e(_parent).find('.wishlist-form form');
              var btn = e(_parent).find('.wishlist-form-after');
              var _this = this;
              e.ajax({
                type: "POST",
                url: "/contact",
                data: form.serialize(),
                success: function(data) {
                  obj.showMessage();
                  setTimeout(obj.hideMessage, 2000);
                  btn.show();
                  form.parent().remove();
                },
                error: function(XMLHttpRequest, textStatus) {
                  alert("error");
                }
              });
            });
          });
        }
      },
      //remove from wishlist page
      buttonRemoveEvent: function() {
        if (e(".product-remove").length > 0) {
          e('.product-remove a').each(function() {
            e(this).click(function(event) {
              event.preventDefault();
              var form = e("#wishlist-remove .contact-form");
              var item = e(this).parent().parent().parent().parent();
              var tagID = e(this).attr('id');
              e('#remove-value').val(tagID);
              e.ajax({
                type: "POST",
                url: "/contact",
                data: form.serialize(),
                success: function(data) {
                  item.fadeOut(500);
                  setTimeout(obj.removeItem, 500, data, item);
                },
                error: function(XMLHttpRequest, textStatus) {
                  alert("error");
                }
              });
            });
          });
        }
      },
      removeItem: function(data, item) {
        item.remove();
        if(e('.wishlist-table tbody tr').length < 1 )
        {
          var content = e(data).find('.wishlist-page');
          e('.wishlist-page').replaceWith(content);
        }
      },
      // Utils
      showMessage: function() {
        jQuery('#modalAddToWishlist').modal("toggle");
      },
      hideMessage: function() {
        jQuery('#modalAddToWishlist').modal('hide');
      }
  	}

    e(document).ready(function() {
      	obj.init();
        e('#centerCol').on( "initWishlist", function(event) {
          if (e(".add-in-wishlist").length > 0) {
          	obj.init();
          }
        });
    });

})(jQuery)