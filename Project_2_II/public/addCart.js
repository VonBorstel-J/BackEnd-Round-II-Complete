$(function () {
  // Handle cart dropdown in navigation bar
  var cartDropdown = $("#cart-dropdown");
  var cartItemCount = $("#cart-item-count");
  var cartTotal = $("#cart-total");

  function updateCartDropdown() {
    $.get("/cart", function (data) {
      cartItemCount.text(data.items.length);
      cartTotal.text("$" + data.total.toFixed(2));

      var itemsList = $("#cart-items");
      itemsList.empty();

      if (data.items.length === 0) {
        itemsList.append('<p class="dropdown-item">Your cart is empty</p>');
      } else {
        data.items.forEach(function (item) {
          var itemHtml =
            '<a class="dropdown-item" href="/products/' +
            item.product._id +
            '">' +
            item.product.name +
            " ($" +
            item.product.price.toFixed(2) +
            ")</a>";
          itemsList.append(itemHtml);
        });
      }
    });
  }

  updateCartDropdown();

  // Handle add to cart button clicks
  $(".add-to-cart").click(function (e) {
    e.preventDefault();
    var productId = $(this).data("product-id");
    $.post("/cart/items", { productId: productId }, function (data) {
      updateCartDropdown();
      alert("Item added to cart");
    });
  });

  // Handle remove from cart button clicks
  $("#cart-items").on("click", ".remove-from-cart", function (e) {
    e.preventDefault();
    var itemId = $(this).data("item-id");
    $.ajax({
      url: "/cart/items/" + itemId,
      type: "DELETE",
      success: function (data) {
        updateCartDropdown();
        alert("Item removed from cart");
      },
    });
  });
});
