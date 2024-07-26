<template>
  <div class="sidebar">
    <ul>
      <router-link class="router" to="/StoreManager">
        <li @click="selectView('Inventory')" :class="{ active: $route.path === '/StoreManager' }">
          <span v-if="$route.path === '/StoreManager'"></span>
          <img src="../assets/inv.png" alt="Inventory Icon"> Stores
        </li>
      </router-link>
      <router-link class="router" to="/OrderInventoryman">
        <li @click="selectView('Order Inventory')" :class="{ active: $route.path === '/OrderInventoryman' }">
          <span v-if="$route.path === '/OrderInventoryman'"></span>
          <img src="../assets/items.png" alt="INV Items Icon"> Inventory Order
        </li>
      </router-link>
      <router-link class="router" to="/SettingStore">
        <li @click="selectView('Setting')" :class="{ active: $route.path === '/SettingStore' }">
          <span v-if="$route.path === '/SettingStore'"></span>
          <img src="../assets/settings.png" alt="Setting Icon"> Setting
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
  methods: {
    selectView(view) {
      this.$emit('view-selected', view);
    },
    logout() {
      if (confirm('Are you sure you want to log out?')) {
        // End the session and redirect to login page
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
  width: 270px;
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
    width: 100%;
  }

  .sidebar li {
    margin-top: 10px;
    margin-left: 5px;
    font-size: small;
  }

  .sidebar li.active {
    margin-left: 5px;
  }

  .sidebar li img {
    width: 25px;
    height: 25px;
  }

  .sidebar li span {
    display: inline-block;
    width: 10px;
    height: 10px;
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