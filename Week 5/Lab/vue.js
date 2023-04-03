Vue.component("pagecomp", {
  props: ["item"],
  template: `<div id="images">
    <div class="catalog">   
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Spaghetti_aglio%2C_olio_e_peperoncino_%2816284859030%29.jpg">
        <div class="desc">{{item.desc}}</div>
        <div class="leg">{{item.leg}}</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Jacques_Lameloise%2C_escab%C3%A8che_d%27%C3%A9crevisses_sur_gaspacho_d%27asperge_et_cresson.jpg">
        <div class="desc">Red Crab</div>
        <div class="leg">Fresh from Alaska</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Breakfast_at_Irving_Street_Kitchen.jpg">
        <div class="desc">Breakfast Special</div>
        <div class="leg">Good for the Soul</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">            
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Seafood_linguine.jpg">
        <div class="desc">Sea Shells mix</div>
        <div class="leg">For the shell Lovers</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">              
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Various_kebab.jpg">
        <div class="desc">Ultimate Kebab</div>
        <div class="leg">The best from middle east</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">              
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Chicken_steak_with_pepper_sauce.jpg">
        <div class="desc">Chicken Steak</div>
        <div class="leg">Grilled to perfection</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/.Filet_mignon_et_foie_gras_au_muscat_de_Beaumes-de-Venise%2C_Pastis_Bistro%2C_Palo_Alto.jpg
        ">
        <div class="desc">Filet Migno</div>
        <div class="leg">Juicy Steak served w/</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">                    
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Dishes_at_Bistro_C%2C_Hastings_Street%2C_Noosa_Heads%2C_Queensland_02.jpg
        ">
        <div class="desc">Bistro Brunch</div>
        <div class="leg">A touch of Australia</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">                   
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/2011-04-09_17.02.43%2C_Whispers_Cafe_and_Creperie%2C_Belmont%2C_CA_%285982715933%29.jpg
        ">
        <div class="desc">Califonia Crepe</div>
         <div class="leg">Stuffed with grilled shrimp</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">                    
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Hamburguesa_de_carne.jpg">
        <div class="desc">Top Burger</div>
        <div class="leg">The tallest hamburguer</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">                    
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Round_Table_chicken_%26_garlic_pizza.JPG
        ">
        <div class="desc">Chicken Garlic Pizza</div>
        <div class="leg">Our specialitty pizza</div>
        <button class="btn" type="button">Add to Cart</button></div>
    <div class="catalog">                       
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Stir_Fry_Wok_-_Free_For_Commercial_Use_-_FFCU_%2827159057131%29.jpg">
        <div class="desc">Wok away healthy</div>
        <div class="leg">Healthy blend and vegies</div>
        <button class="btn" type="submit">Add to Cart</button></div>
  </div>`,
});
let app = new Vue({
  el: "#vue",
  data: {
    ad: {
      desc: "Pasta",
      leg: "Healthy Pasta",
    },
  },
});
