<template>
  <div class="sidebar">
    <ul>
      <router-link class="router" to="/FinanceManager">
        <li @click="selectView('Finance')" :class="{ active: $route.path === '/FinanceManager' }">
          <span v-if="$route.path === '/FinanceManager'"></span>
          <img src="../assets/finance.png" alt="Finance Icon"> Finance
        </li>
      </router-link>
      <router-link class="router" to="/SettingFinance">
        <li @click="selectView('Setting')" :class="{ active: $route.path === '/SettingFinance' }">
          <span v-if="$route.path === '/SettingFinance'"></span>
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


<style scoped>
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
  height: 900px;
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
    margin-right: 5px;
    border-top: 5px solid #000000bf;
    border-left: 5px solid #000000bf;
  }
}

@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .sidebar li {
    font-size: medium;
  }

  .sidebar li img {
    width: 35px;
    height: 35px;
  }
}

@media only screen and (min-width: 1025px) {
  .sidebar li {
    font-size: x-large;
  }

  .sidebar li img {
    width: 40px;
    height: 40px;
  }
}
</style>
