<template>
  <hea :selectedView="selectedView"></hea>
  <div class="container1">
    <sid @view-selected="updateSelectedView"></sid>
    <div class="content">
      <div class="edit-driver-container">
        <div class="driver">
          <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="form-group">
              <label for="firstName">First Name:</label>&ensp;&ensp;
              <input type="text" v-model="driver.driverName" id="firstName" required />
            </div>
            <p></p>
            <div class="form-group">
              <label for="lastName">Last Name:</label>&ensp;&ensp;
              <input type="text" v-model="driver.lastName" id="lastName" required />
            </div>
            <p></p>
            <div class="form-group">
              <label for="email">Email:</label>&ensp;&ensp;
              <input type="email" v-model="driver.driverEmail" id="email" required />
            </div>
            <p></p>
            <div class="form-group">
              <label for="phoneNumber">Phone Number:</label>&ensp;&ensp;
              <input type="text" v-model="driver.driverPhoneNumber" id="phoneNumber" required />
            </div>
            <p></p>
          </form>
        </div>
        <div style="display: flex;">
          <button type="submit" @click="submitForm" class="upgrade-btn">Update Driver</button>
          <button @click="goBack" class="back-btn">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import hea from '../components/HeaderVue.vue';
import sid from '../components/SideVue.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    hea,
    sid,
  },
  data() {
    return {
      selectedView: 'Edit Driver',
      driver: {
        driverName: '',
        lastName: '',
        driverEmail: '',
        driverPhoneNumber: '',
      },
      driverId: this.$route.params.id
    };
  },
     computed: {
    ...mapGetters(['getToken']), // Map the getToken getter
  },
  created() {
    this.fetchDriverDetails();
  },
  methods: {
    goBack() {
      window.history.back();
    },
    async fetchDriverDetails() {
      try {
        const response = await axios.get(`https://localhost:44330/api/Driver/${this.driverId}`);
        const driverData = response.data;
        if (driverData.length > 0) {
          this.driver = driverData[0];
          const nameParts = this.driver.driverName.split(' ');
          this.driver.driverName = nameParts[0];
          this.driver.lastName = nameParts.slice(1).join(' ');
        }
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('FirstName', this.driver.driverName);
      formData.append('LastName', this.driver.lastName);
      formData.append('Email', this.driver.driverEmail);
      formData.append('PhoneNumber', this.driver.driverPhoneNumber);

      try {
        await axios.put(`https://localhost:44330/api/Driver/update-driver/${this.driverId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.getToken()}`
          }
        });
        alert('Driver information updated successfully.');
        this.$router.push({ name: 'Drivers' });
      } catch (error) {
        console.error('Error updating driver:', error);
      }
    },
    getToken() {
      return localStorage.getItem('token'); // Adjust as needed to get the token
    }
  }
};
</script>

<style scoped>
.container1 {
  display: grid;
  grid-template-columns: auto 1fr;
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);
  width: 100%;
}
.driver {
  color: whitesmoke;
  background-color: #12372A;
  margin-left: 400px;
  text-align: center;
  width: 400px;
  padding: 15px;
  border-radius: 20px;
  margin-top: 20px;
  text-align: left;
  font-size: medium;
  font-style: bold;
}
.edit-driver {
  justify-items: center;
}
.btns {
  background-color: #12372A;
  margin-left: 40%;
  width: 40%;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0);
  margin-bottom: 5px;
}
.btn {
  width: 50%;
  padding: 25px;
  background-color: transparent;
  font-size: larger;
  color: antiquewhite;
  border-color: rgba(255, 255, 255, 0);
}
.back-btn {
  margin-left: 100px;
  width: 250px;
  background-color: #12372A;
  color: aliceblue;
  font-size: x-large;
  margin-top: 100px;
  border-radius: 10px;
  padding: 10px;
}
.upgrade-btn {
  margin-left: 330px;
  width: 250px;
  background-color: #12372A;
  color: aliceblue;
  font-size: x-large;
  margin-top: 100px;
  border-radius: 10px;
  padding: 10px;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
</style>
