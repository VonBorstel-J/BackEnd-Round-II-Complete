new Vue({
    el: "#app",
    data: {
      products: []
    },
    mounted() {
      // Fetch products from API endpoint
      axios.get("/api/products")
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
  