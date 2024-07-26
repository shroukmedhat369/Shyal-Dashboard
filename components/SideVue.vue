<template>
  <div class="sidebar">
    <ul>
      <router-link class="router" to="/HomeVue" exact>
        <li @click="selectView('Home')" :class="{ active: $route.path === '/HomeVue' }">
          <span v-if="$route.path === '/HomeVue'"></span>
          <img src="../assets/home.png" alt="Home Icon"> Home
        </li>
      </router-link>
      <router-link class="router" to="/drivers">
        <li @click="selectView('Drivers')" :class="{ active: $route.path === '/drivers' }">
          <span v-if="$route.path === '/drivers'"></span>
          <img src="../assets/card.png" alt="Driver Icon"> Drivers
        </li>
      </router-link>
      <router-link class="router" to="/NewDrivers">
        <li @click="selectView('New Drivers')" :class="{ active: $route.path === '/NewDrivers' }">
          <span v-if="$route.path === '/NewDrivers'"></span>
          <img src="../assets/card.png" alt="New Driver Icon"> New Drivers
        </li>
      </router-link>
      <router-link class="router" to="/Customers">
        <li @click="selectView('Customers')" :class="{ active: $route.path === '/Customers' }">
          <span v-if="$route.path === '/Customers'"></span>
          <img src="../assets/cust.png" alt="Customer Icon"> Customers
        </li>
      </router-link>
      <router-link class="router" to="/orders">
        <li @click="selectView('Orders')" :class="{ active: $route.path === '/orders' }">
          <span v-if="$route.path === '/orders'"></span>
          <img src="../assets/orders.png" alt="Order Icon"> Orders
        </li>
      </router-link>
      <router-link class="router" to="/CurrentOrders">
        <li @click="selectView('Current Orders')" :class="{ active: $route.path === '/CurrentOrders' }">
          <span v-if="$route.path === '/CurrentOrders'"></span>
          <img src="../assets/current-orders.png" alt="Current Order Icon"> Current Orders
        </li>
      </router-link>
      <router-link class="router" to="/Stores">
        <li @click="selectView('Stores')" :class="{ active: $route.path === '/Stores' }">
          <span v-if="$route.path === '/Stores'"></span>
          <img src="../assets/inv.png" alt="Inventory Icon"> Stores
        </li>
      </router-link>
      <router-link class="router" to="/OrderInventory">
        <li @click="selectView('OrderInventory')" :class="{ active: $route.path === '/OrderInventory' }">
          <span v-if="$route.path === '/OrderInventory'"></span>
          <img src="../assets/items.png" alt="OrderInventory"> Inventory Orders
        </li>
      </router-link>
      <router-link class="router" to="/finance">
        <li @click="selectView('Finance')" :class="{ active: $route.path === '/finance' }">
          <span v-if="$route.path === '/finance'"></span>
          <img src="../assets/finance.png" alt="Finance Icon"> Finance
        </li>
      </router-link>
      <router-link class="router" to="/setting">
        <li @click="selectView('Setting')" :class="{ active: $route.path === '/setting' }">
          <span v-if="$route.path === '/setting'"></span>
          <img src="../assets/settings.png" alt="Setting Icon"> Setting
        </li>
      </router-link>
      <router-link class="router" to="/AddAdmin">
        <li @click="selectView('AddAdmin')" :class="{ active: $route.path === '/AddAdmin' }">
          <span v-if="$route.path === '/AddAdmin'"></span>
          <img src="../assets/cust.png" alt="Setting Icon"> Add Admin
        </li>
      </router-link>
      
      <li @click="logout" class="router" :class="{ active: isLogoutActive }">
        <span v-if="isLogoutActive"></span>
        <img src="../assets/logout.png" alt="Logout Icon"> Logout
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogoutActive: false
    };
  },
  watch: {
    '$route.path'(newPath) {
      this.isLogoutActive = newPath === '/logout';
    }
  },
  methods: {
    selectView(view) {
      this.$emit('view-selected', view);
    },
    logout() {
      if (confirm('Are you sure you want to log out?')) {
        this.isLogoutActive = true;
        this.$store.dispatch('logout'); // Assuming you have a logout action in your Vuex store
        this.$router.push('/');
      }
    }
  }
}
</script>

<style>
.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 10px;
  cursor: pointer;
  margin-top: 40px;
  text-align: start;
  margin-left: 30px;
  font-size: x-large;
  display: flex;
  align-items: center;
}

.sidebar li.active {
  font-weight: bold;
  margin-left: 15px;
}

.sidebar li img {
  width: 47.28px;
  height: 47.550px;
  margin-right: 10px;
  box-shadow: 0px 4px 8px rgb(253, 209, 127);
}

.sidebar li span {
  position: relative;
  right: 7px;
  border-top: 9px solid #000000bf;
  border-left: 7px solid #000000bf;
  top: 50%;
  margin-right: 7px;
  border-top-right-radius: 10px;
  height: 50px;
}

.sidebar {
  width: 450PX;
  background-color: #007C4F;
  border: none;
  border-radius: 20px 20px 0 0;
}

.router {
  text-decoration: none;
  color: #ffffff;
}

@media only screen and (max-width: 768px) {
  .sidebar {
    width: 100%; /* Make sidebar full width for smaller screens */
  }

  .sidebar li {
    margin-top: 10px; /* Further decreased margin for smaller screens */
    margin-left: 5px; /* Further decreased margin for smaller screens */
    font-size: small; /* Further decreased font size for smaller screens */
  }

  .sidebar li.active {
    margin-left: 5px; /* Further decreased margin for smaller screens */
  }

  .sidebar li img {
    width: 25px; /* Further decreased image width for smaller screens */
    height: 25px; /* Further decreased image height for smaller screens */
  }

  .sidebar li span {
    display: inline-block; /* Show span for active items on smaller screens */
    width: 10px; /* Adjusted width for span on smaller screens */
    height: 10px; /* Adjusted height for span on smaller screens */
    margin-right: 5px; /* Adjusted margin for span on smaller screens */
    border-top: 5px solid #000000bf; /* Adjusted border size for span on smaller screens */
    border-left: 5px solid #000000bf; /* Adjusted border size for span on smaller screens */
  }
}

/* Media query for medium screens */
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .sidebar li {
    font-size: medium; /* Revert font size to medium for medium screens */
  }

  .sidebar li img {
    width: 35px; /* Increased image width for medium screens */
    height: 35px; /* Increased image height for medium screens */
  }
}

/* Media query for large screens */
@media only screen and (min-width: 1025px) {
  .sidebar li {
    font-size: x-large; /* Increased font size for large screens */
  }

  .sidebar li img {
    width: 40px; /* Further increased image width for large screens */
    height: 40px; /* Further increased image height for large screens */
  }
}
</style>
