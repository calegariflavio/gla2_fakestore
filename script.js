$(document).ready(function() {
    let allProducts = [];

    //Function that fetch all products from the API
    function fetchAllProducts() {
      let apiUrl = 'https://fakestoreapi.com/products';
      $.get(apiUrl, function(data) {
        allProducts = data;
        displayProducts(allProducts);
      });
    }

    //Function to display products by creating a div and putting all needed information there
    function displayProducts(products) {
      let productsContainer = $('#products');
      productsContainer.empty();
      products.forEach(function(product) {
        let productHTML = `
          <div class="product">
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}">
            <p>Price: ${product.price}</p>
            <p>Category: ${product.category}</p>
            <p>Description: ${product.description}</p>
          </div>
        `;
        productsContainer.append(productHTML);
      });
    }

    //Applying filters and sorting
    function applyFiltersAndSort(sortBy, category) {
      let filteredProducts = allProducts;

      //Filter by category
      if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
      }

      //Filter by price
      if (sortBy === 'asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      displayProducts(filteredProducts);
    }

    //Event for changes when the user selects a category or a sort value(asc or desc)
    $('#sortBy, #category').change(function() {
      let sortBy = $('#sortBy').val();
      let category = $('#category').val();
      applyFiltersAndSort(sortBy, category);
    });

    //Fetch all products initially
    fetchAllProducts();
});
