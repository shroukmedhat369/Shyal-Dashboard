<template>
  <header>
    <div class="ss">
      <div class="header-right">
        <img src="../assets/logo.png" class="logo" alt="Dashboard Logo">
        <span class="app-name">Shyal Online</span>
      </div>
      <div class="header-middle">
        <h1 class="headers home">{{ selectedView }}</h1>
      </div>
      <div class="header-left">
        <div class="icon-box">
          <!-- Profile dropdown -->
          <div class="circletop" @click="toggleDropdown">
            <img id="img" :src="profileImageUrl" alt="Admin Picture">
          </div>
          <div v-if="dropdownOpen" class="dropdown-content">
            <!-- Settings option -->
            <router-link to="/Setting">
              <img src="../assets/settings.png" alt="Settings" class="dropdown-icon">
              Settings
            </router-link>
            <!-- Logout option -->
            <a href="#" @click="logout">
              <img src="../assets/logout.png" alt="Logout" class="dropdown-icon">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  props: ['selectedView'],
  data() {
    return {
      dropdownOpen: false, // Initially, dropdown is closed
      profileImageUrl: require('@/assets/profile.png') // Initialize profile image URL
    };
  },
  computed: {
    ...mapGetters(['getToken']) // Map the getToken getter
  },
  mounted() {
    this.fetchProfileData(); // Fetch profile data when component is mounted
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown state
    },
    fetchProfileData() {
      axios.get('https://localhost:44330/api/AdminHome/Profile', {
        headers: {
          Authorization: `Bearer ${this.getToken}` // Assuming you have a way to get the token
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data && response.data.length > 0) {
          const profile = response.data[0];
          if (profile.profileImage) {
            const base64ImageData = profile.profileImage;
            const binaryImageData = atob(base64ImageData);
            const binaryLength = binaryImageData.length;
            const bytes = new Uint8Array(binaryLength);
            for (let i = 0; i < binaryLength; i++) {
              bytes[i] = binaryImageData.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'image/jpeg' });
            this.profileImageUrl = URL.createObjectURL(blob);
          } 
        }
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        // Handle error
      });
    },
    logout() {
      if (confirm('Are you sure you want to log out?')) {
        this.$store.dispatch('logout'); // Assuming you have a 'logout' action in Vuex
        this.$router.push('/'); // Redirect to home page or login page
      }
    }
  }
};
</script>

<style scoped>
.ss {
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.logo {
  width: 92.96px;
  height: 53.06px;
}

.headers {
  font-family: 'Inter', sans-serif;
  text-align: start;
  margin-bottom: 10px;
  color: #007C4F;
  font-size: 25px;
}

.home {
  margin-top: 25px;
  font-size: 25px;
}

.circletop {
  border-radius: 50%; /* Make the container a circle */
  overflow: hidden;
  display: inline-grid;
  background-color: #007C4F;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 40px;
  height: 40px;
}

#img {
  width: 40px;
  height: 40px;
}

header {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: #007C4F;
}

.header-right, .header-left {
  display: flex;
  align-items: center;
  width: max-content;
  height: 55px;
}

.header-right {
  margin-right: 130px;
  margin-bottom: 20px;
}

.icon-box {
  display: flex;
  align-items: center;
  background: transparent;
}

.header-middle h1 {
  font-size: 32px;
  position: relative;
  right: 400px;
}

.app-name {
  font-weight: bold;
  margin-left: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'Inter', sans-serif;
  color: #007C4F;
  font-size: 25px;
}

.dropdown-content {
  position: absolute;
  top: 55px;
  right: 10px;
  background-color: #ffffffbf;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  min-width: 200px;
  border-radius: 8px;
}

.dropdown-content a {
  color: #007C4F;
  padding: 10px 13px;
  text-decoration: none;
  display: block;
  font-size: 20px;
  text-align: start;
}

.dropdown-content a:hover {
  background-color: #f9f9f9;
}

.dropdown-icon {
  width: 50px;
  margin-right: 8px;
}

.circletop:hover .dropdown-content {
  display: block;
}

@media screen and (max-width: 768px) {
  .header-right {
    margin-right: 20px; /* Adjust as needed */
  }

  .header-middle {
    margin-right: 0; /* Reset margin */
    text-align: center; /* Center align the title */
  }
}
</style>
