Vue.component('product-list', {
    props: ['products'],
    template: `
      <div class="product-list">
		<div class="product-list-header row">
			<div class="col-sm-4">
				<p> Position </p>
			</div>
			<div class="col-sm-3">
				<p> Artikel </p>				
			</div>
			<div class="col-sm-3">
				<p>Preis </p>				
			</div>
			<div class="col-sm-3">			
			</div>
		</div>
        <div class="product" v-for="product in products" :key="product.id">
			<div class="product-item row">			
				<div class="col-sm-3">
					<b>{{ product.id }}</b>
				</div>						
				<div class="col-sm-3">
					<b>{{ product.name }}</b>
				</div>			  
				<div class="col-sm-3">
					<p>Preis: {{ product.price }}€</p>
				</div>
				<div class="col-sm-3">
					<button @click="$emit('add-to-cart', product)" class="btn">+</button>
				</div>
			</div>
        </div>
      </div>
    `
  });
  
  Vue.component('cart', {
    props: ['cart', 'totalPrice'],
    template: `
      <div class="cart">
		<div class="cart-list-header row">
			<div class="col-sm-2">
				<p> Position </p>
			</div>
			<div class="col-sm-2">
				<p> Artikel </p>				
			</div>
			<div class="col-sm-2">
				<p>Preis </p>				
			</div>
			<div class="col-sm-2">
				<p>Anzahl </p>				
			</div>
			<div class="col-sm-2">
				<p>Summe </p>				
			</div>
		</div>
        <div v-for="item in cart" :key="item.id" class="cart-item">
			<div class="row">
				<div class="col-sm-2">
				  <b>{{ item.id }}</b>
				</div>
				<div class="col-sm-2">
				  <b>{{ item.name }}</b>
				</div>
				<div class="col-sm-2">
				  <p>{{ item.price }}€</p>
				</div>
				<div class="col-sm-2">
						<p>
							<button @click="$emit('decrease', item)" >-</button> 
								{{ item.quantity }} 
							<button @click="$emit('increase', item)" >+</button>
						</p>					
				</div>
				<div class="col-sm-2">
				  <p> {{ item.total }}</p>
				</div>
				<div class="col-sm-2">
				  <button @click="$emit('remove-from-cart', item)" class="btn">X</button>
				</div>
			</div>
        </div>
		<div class="row">
			<div class="col-sm-12">
				<p><b>Gesamt: {{ totalPrice }}€</p>
			</div>
		</div>
      </div>
    `
  });
  
  new Vue({
    el: '#app',
    data: {
      products: [
        { id: 1, name: 'Tomaten', price: 1.95 },
        { id: 2, name: 'Kaese', price: 2.95 },
        { id: 3, name: 'Gurken', price: 0.95 },
        { id: 4, name: 'Brot', price: 3.95 },
        { id: 5, name: 'Schinken', price: 5.95 },
      ],
      cart: []
    },
    computed: {
      totalPrice() {
        return this.cart.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2);
      }
    },
    methods: {
      addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
  
        if (existingItem) {
          existingItem.quantity++;
          existingItem.total = (existingItem.quantity * existingItem.price).toFixed(2);
        } else {
          this.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            total: product.price.toFixed(2)
          });
        }
      },
      removeFromCart(item) {
        const index = this.cart.indexOf(item);
        if (index !== -1) {
          if (item.quantity > 1) {
            item.quantity--;
            item.total = (item.quantity * item.price).toFixed(2);
          } else {
            this.cart.splice(index, 1);
          }
        }
      },
      decrease(item) {
        const index = this.cart.indexOf(item);
        if (index !== -1) {
          if (item.quantity > 1) {
            item.quantity--;
            item.total = (item.quantity * item.price).toFixed(2);
          } else {
            this.cart.splice(index, 1);
          }
        }
      },
      increase(item) {
			item.quantity++;
			item.total = (item.quantity * item.price);
      }
    }
  });
  