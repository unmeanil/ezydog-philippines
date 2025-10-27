
if (window.location.pathname.includes("/collections/")) {
  const pathSegments = window.location.pathname.split('/');
  const collectionHandle = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2]; // in case the URL ends with a '/'
  sessionStorage.setItem('lastCollection', collectionHandle);
  console.log(sessionStorage.getItem('lastCollection'));
} else {
  if (!window.location.pathname.includes("/products/")) {
    console.log("not on collection page");
    sessionStorage.removeItem('lastCollection');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var linksWithDataAttribute = document.querySelectorAll('[data-url]');
console.log("linksWithDataAttribute", linksWithDataAttribute)
  linksWithDataAttribute.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault(); // Prevent the default link behavior

      var dataFollowLink = link.getAttribute("data-url");

      if (dataFollowLink) {
        window.location.href = dataFollowLink; // Navigate to the data URL
      }
    });
  });
});

$(document).on('product:added product:removed', function() {
  $('.free-shipping-remaining-text').text('New Shipping Text');
});

// Quick add to cart
function addProductToCart(id, productId){
  const formData = {
    id: id,
    quantity: 1
  };

  $.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: JSON.stringify(formData),
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    beforeSend: function(){
      buttonLoading(productId)
    },
    success: function(cart) {
      buttonStopLoading(productId)
      
      $.getJSON('/cart.js', function(updatedCart) {
        document.dispatchEvent(new CustomEvent('cart:refresh', {
          detail: {
            cart: updatedCart
          }
        }));
      });        
        
      const cartDrawerElement = document.querySelector('#cart-drawer');
      if (cartDrawerElement) {
        cartDrawerElement.show();
      } 
        
    },
    error: function(errorThrown) {
      buttonStopLoading(productId)

        var r = jQuery.parseJSON(errorThrown.responseText);
        $(".error_" + pro_id).html("Error: " + r.description).show();
        setTimeout(function() {
            $(".error_" + pro_id).html("").hide(100);
        }, 3000);
      }
  });
  
}

function buttonLoading(productId){
  $(`.loading-${productId}`).removeClass('noopacity');
  $(`.add-text-${productId}`).addClass('noopacity');
  $(`.button-${productId}`).prop('disabled', true);
  $(`.button-${productId}`).addClass('button-disabled');
}
function buttonStopLoading(productId){
  $(`.loading-${productId}`).addClass('noopacity');
  $(`.add-text-${productId}`).removeClass('noopacity');
  $(`.button-${productId}`).prop('disabled', false);
  $(`.button-${productId}`).removeClass('button-disabled');
}

CONVERT_HARNESS_MAPPING = {
  "2XS": { patch: "100mm", d_ring: "25mm" },
  "XS": { patch: "100mm", d_ring: "25mm" },
  "S": { patch: "130mm", d_ring: "38mm" },
  "M": { patch: "130mm", d_ring: "38mm" },
  "L": { patch: "158mm", d_ring: "50mm" },
  "XL": { patch: "158mm", d_ring: "50mm" },
  "2XL": { patch: "158mm", d_ring: "50mm" }
}

EXPRESS_HARNESS_MAPPING = {
  "2XS": { patch: "100mm", d_ring: "25mm" },
  "XS": { patch: "100mm", d_ring: "25mm" },
  "S": { patch: "110mm", d_ring: "25mm" },
  "M": { patch: "130mm", d_ring: "38mm" },
  "L": { patch: "130mm", d_ring: "38mm" },
  "XL": { patch: "158mm", d_ring: "50mm" },
  "2XL": { patch: "158mm", d_ring: "50mm" }
}

SADDLE_BAGS_MAPPING = {
  "S": { patch: "110mm", d_ring: "25mm" },
  "L": { patch: "155mm", d_ring: "50mm" }
}

BACK_PACK_MAPPING = {
  "S": { patch: "110mm", d_ring: "" },
  "M": { patch: "110mm", d_ring: "" },
  "L": { patch: "110mm", d_ring: "" }
}

ORTHO_SMART_BED_MAPPING = {
  "S": { patch: "110mm", d_ring: "" },
  "M": { patch: "130mm", d_ring: "" },
  "L": { patch: "130mm", d_ring: "" },
  "XL": { patch: "130mm", d_ring: "" }
}

ORTHO_LOUNGER_MAPPING = {
  "M": { patch: "110mm", d_ring: "" },
  "L": { patch: "130mm", d_ring: "" },
  "XL": { patch: "130mm", d_ring: "" }
}

ORTHO_CALM_ELITE_BED_MAPPING = {
  "M": { patch: "110mm", d_ring: "" },
  "L": { patch: "130mm", d_ring: "" },
  "XL": { patch: "130mm", d_ring: "" }
}

FORMFIT_MAPPING = {
  "2XS": { patch: "50mm", d_ring: "" },
  "XS": { patch: "50mm", d_ring: "" },
  "S": { patch: "65mm", d_ring: "" },
  "M": { patch: "65mm", d_ring: "" },
  "L": { patch: "80mm", d_ring: "" },
  "XL": { patch: "80mm", d_ring: "" }
}

// Product IDS will be set under ids (convert harness will require getting all the convert harness ids for instance)
// Mapping from product size to patch/dring etc will be set up above

window.mapping = [
  {
    product: "Convert harness",
    ids: [8785890607400, 8785901584680, 8785899946280, 8785898176808],
    mapping: CONVERT_HARNESS_MAPPING
  },
  {
    product: "Express harness",
    ids: [8785890935080, 8785901682984, 8785900044584, 8785898307880],
    mapping: EXPRESS_HARNESS_MAPPING
  },
  {
    product: "Saddle bags",
    ids: [8785884709160],
    mapping: SADDLE_BAGS_MAPPING
  },
  {
    product: "Back pack",
    ids: [8785884578088],
    mapping: BACK_PACK_MAPPING
  },
  {
    product: "Ortho smart bed",
    ids: [8968431370536],
    mapping: ORTHO_SMART_BED_MAPPING
  },
  {
    product: "Ortho lounger",
    ids: [8968431436072],
    mapping: ORTHO_LOUNGER_MAPPING
  },
  {
    product: "Elite smart bed",
    ids: [8968431567144],
    mapping: ORTHO_CALM_ELITE_BED_MAPPING
  },
  {
    product: "Formfit",
    ids: [9018885996840],
    mapping: FORMFIT_MAPPING
  }, 
  
]

/* new label customizations mappings by sudh */
CONVERT_HARNESS_MAPPING_NEW = {
 "S": { patch: "130mm", d_ring: "38mm" },
  "M": { patch: "130mm", d_ring: "38mm" },
  "L": { patch: "158mm", d_ring: "50mm" },
  "XXL": { patch: "158mm", d_ring: "50mm" },
  "XL": { patch: "158mm", d_ring: "50mm" },
  "2XL": { patch: "158mm", d_ring: "50mm" },
   "S": { patch: "130x38 mm", d_ring: "38mm" },
  "M": { patch: "130x38 mm", d_ring: "38mm" },
  "L": { patch: "158x50 mm", d_ring: "50mm" },
  "XXL": { patch: "158x50 mm", d_ring: "50mm" },
  "XL": { patch: "158x50 mm", d_ring: "50mm" },
  "2XL": { patch: "158x50 mm", d_ring: "50mm" }
}

EXPRESS_HARNESS_MAPPING_NEW = {
  "2XS": { patch: "100mm", d_ring: "25mm" },
  "XS": { patch: "100mm", d_ring: "25mm" },
  "S": { patch: "100mm", d_ring: "25mm" },
  "M": { patch: "130mm", d_ring: "38mm" },
  "L": { patch: "130mm", d_ring: "38mm" },
  "XL": { patch: "158mm", d_ring: "50mm" },
  "2XL": { patch: "158mm", d_ring: "50mm" },
  "2XS": { patch: "100x25 mm", d_ring: "25mm" },
  "XS": { patch: "100x25 mm", d_ring: "25mm" },
  "S": { patch: "100x25 mm", d_ring: "25mm" },
  "M": { patch: "130x38 mm", d_ring: "38mm" },
  "L": { patch: "130x38 mm", d_ring: "38mm" },
  "XL": { patch: "158x50 mm", d_ring: "50mm" },
  "2XL": { patch: "158x50 mm", d_ring: "50mm" },

}

SADDLE_BAGS_MAPPING_NEW = {
  "S": { patch: "110mm", d_ring: "25mm" },
  "L": { patch: "158mm", d_ring: "50mm" },
  "S": { patch: "110x30 mm", d_ring: "25mm" },
  "L": { patch: "158x50 mm", d_ring: "50mm" }
}

BACK_PACK_MAPPING_NEW = {
  "S": { patch: "110mm", d_ring: "" },
  "M": { patch: "110mm", d_ring: "" },
  "L": { patch: "110mm", d_ring: "" },
  "S": { patch: "110x30 mm", d_ring: "" },
  "M": { patch: "110x30 mm", d_ring: "" },
  "L": { patch: "110x30 mm", d_ring: "" }
}
ORTHO_SMART_BED_MAPPING_NEW = {
  "S": { patch: "110mm", d_ring: "" },
  "M": { patch: "130mm", d_ring: "" },
  "L": { patch: "130mm", d_ring: "" },
  "XL": { patch: "130mm", d_ring: "" },
  "S": { patch: "110x30 mm", d_ring: "" },
  "M": { patch: "130x38 mm", d_ring: "" },
  "L": { patch: "130x38 mm", d_ring: "" },
  "XL": { patch: "130x38 mm", d_ring: "" }
}

ORTHO_LOUNGER_MAPPING_NEW = {
  "M": { patch: "110mm", d_ring: "" },
  "L": { patch: "130mm", d_ring: "" },
  "XL": { patch: "130mm", d_ring: "" },
  "M": { patch: "110x30 mm", d_ring: "" },
  "L": { patch: "130x38 mm", d_ring: "" },
  "XL": { patch: "130x38 mm", d_ring: "" }
}

ORTHO_CALM_ELITE_BED_MAPPING_NEW = {
  "M": { patch: "110mm", d_ring: "" },
  "L": { patch: "130mm", d_ring: "" },
  "XL": { patch: "130mm", d_ring: "" },
  "M": { patch: "110x30 mm", d_ring: "" },
  "L": { patch: "130x38 mm", d_ring: "" },
  "XL": { patch: "130x38 mm", d_ring: "" }
}

FORMFIT_MAPPING_NEW = {
  "2XS": { patch: "60mm", d_ring: "" },
  "XS": { patch: "60mm", d_ring: "" },
  "S": { patch: "75mm", d_ring: "" },
  "M": { patch: "75mm", d_ring: "" },
  "L": { patch: "95mm", d_ring: "" },
  "XXL": { patch: "95mm", d_ring: "" },
  "2XL": { patch: "95mm", d_ring: "" },
  "XL": { patch: "95mm", d_ring: "" },
  "2XS": { patch: "60 mm", d_ring: "" },
  "XS": { patch: "60 mm", d_ring: "" },
  "S": { patch: "75 mm", d_ring: "" },
  "M": { patch: "75 mm", d_ring: "" },
  "L": { patch: "95 mm", d_ring: "" },
  "XXL": { patch: "95 mm", d_ring: "" },
  "2XL": { patch: "95 mm", d_ring: "" },
  "XL": { patch: "95 mm", d_ring: "" }, 
}

FORMFIT_MAPPING_NEW_1 = {
  "2XS": { patch: "2XS/XS", d_ring: "" },
  "XS": { patch: "2XS/XS", d_ring: "" },
  "S": { patch: "S/M", d_ring: "" },
  "M": { patch: "S/M", d_ring: "" },
  "L": { patch: "L/XL", d_ring: "" },
  "XL": { patch: "L/XL", d_ring: "" },
    "XXL": { patch: "L/XL", d_ring: "" },
  "2XL": { patch: "L/XL", d_ring: "" },
}

window.mappingnew = [
  {
    product: "Convert harness",
    ids: [8785890607400, 8785901584680, 8785899946280, 8785898176808],
    mappingnew: CONVERT_HARNESS_MAPPING_NEW
  },
  {
    product: "Express harness",
    ids: [8785890935080, 8785901682984, 8785900044584, 8785898307880],
    mappingnew: EXPRESS_HARNESS_MAPPING_NEW
  },
  {
    product: "Saddle bags",
    ids: [8785884709160],
    mappingnew: SADDLE_BAGS_MAPPING_NEW
  },
  {
    product: "Back pack",
    ids: [8785884578088],
    mappingnew: BACK_PACK_MAPPING_NEW
  },
  {
    product: "Ortho smart bed",
    ids: [8968431370536],
    mappingnew: ORTHO_SMART_BED_MAPPING_NEW
  },
  {
    product: "Ortho lounger",
    ids: [8968431436072],
    mappingnew: ORTHO_LOUNGER_MAPPING_NEW
  },
  {
    product: "Elite smart bed",
    ids: [8968431567144],
    mappingnew: ORTHO_CALM_ELITE_BED_MAPPING_NEW
  },
  {
    product: "Formfit",
    ids: [9018885996840],
    mappingnew: FORMFIT_MAPPING_NEW
  }, 
  
]

window.mappingnew1 = [
{
    product: "Formfit",
    ids: [9018885996840],
    mappingnew: FORMFIT_MAPPING_NEW_1
  }, 
]

let bedding_labels = ["Ortho smart bed", "Ortho lounger", "Elite smart bed"];
let formfit_labels = ["Formfit"];

window.bedding_mapping = window.mapping.filter(item => 
  bedding_labels.includes(item.product)
).map(item => item.ids).flat();

window.formfit_mapping = window.mapping.filter(item => 
  formfit_labels.includes(item.product)
).map(item => item.ids).flat();

function removeIcon(event) {
    const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FAFF}\u{1FB00}-\u{1FBFF}]/gu;
    
    const inputElement = $(event.target); // Access the input element
    const inputVal = inputElement.val();

    if (emojiRegex.test(inputVal)) {
        inputElement.val(inputVal.replace(emojiRegex, ''));
    }
}

$(document).on('input', '#cl-custom-text', removeIcon);
$(document).on('input', '#cl-custom-text_order', removeIcon);