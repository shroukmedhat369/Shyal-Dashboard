<template>
  <div>
    <hea :selectedView="selectedView"></hea>
    <div class="container1">
      <sid @view-selected="updateSelectedView"></sid>
      <div class="content">
        <div class="delete-driver">
          <h1 style="color: #436851; margin-left: 16%;">Delete User</h1>
          <div style="margin-left: 45%; width: 20%;">
            <div class="driver">
              <h2>Delete Driver</h2>
              <p>Are you sure you want to delete {{ this.$route.params.id }}?</p>
            </div>
            <div style="display: flex;">
              <button @click="confirmDelete" class="back-btn">Yes</button>
              <button @click="goBack" class="back-btn">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import hea from '../components/HeaderVue.vue';
import sid from '../components/SideVue.vue';

export default {
  components: {
    hea,
    sid,
  },
 
  data() {
    return {
      selectedView: 'Delete Driver',
      driver: null, // To store driver details
    };
  },
  computed: {
    ...mapGetters(['getToken']), // Map the getToken getter
  },
  methods: {
    async deleteDriver() {
      const driverID = this.$route.params.id; // Ensure correct ID from route params
      try {
        await axios.delete(`https://localhost:44330/api/Driver/${driverID}`, {
          headers: {
            Authorization: `Bearer ${this.getToken}`, // Ensure getToken is correctly set
          },
        });
        this.$router.push('/drivers'); // Navigate to correct route after deletion
      } catch (error) {
        console.error('Error deleting driver:', error);
        let errorMessage = 'Failed to delete driver. Please try again later.';
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          errorMessage = `Failed to delete driver: ${error.response.data.message}`;
        }
        alert(errorMessage); // Display error message to the user
      }
    },
    confirmDelete() {
      // Confirm deletion when 'Yes' is clicked
      if (confirm('Are you sure you want to delete this driver?')) {
        this.deleteDriver(); // Call deleteDriver method to delete the driver
      }
    },
    goBack() {
      window.history.back(); // Navigate back to previous page
    },
    updateSelectedView(view) {
      this.selectedView = view; // Update selected view based on sidebar selection
    },
  },
};
</script>

<style scoped>
.container1 {
  display: grid;
  grid-template-columns: auto 1fr;
  background: linear-gradient(to left, #8dd3a8, #adbca9, #fbfada);
  width: 100%;
}

.delete-driver {
  justify-items: center;
}

.driver {
  color: whitesmoke;
  background-color: #12372a;
  text-align: center;
  padding: 15px;
  border-radius: 20px;
  width: 110%;
  flex-grow: 1;
  margin-top: 20%;
}

.back-btn {
  margin-left: 20%;
  width: 80%;
  background-color: #12372a;
  color: aliceblue;
  font-size: x-large;
  margin-top: 123px;
  border-radius: 10px;
  padding: 10px;
}
</style>
