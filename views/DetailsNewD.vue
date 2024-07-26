<template>
  <div>
    <hea :selectedView="selectedView"></hea>
    <div class="container1">
      <sid @view-selected="updateSelectedView"></sid>
      <div class="content">
        <div class="nw-driver-details">
          <div style="margin-left: 100%;width: 150%;">
            <div v-if="driver" class="driver">
              <img class="imgg" src="../assets/profile.png" alt="Driver Photo">
              <p><strong>Name:</strong> {{ driver.firstName }} {{ driver.lastName }}</p>
              <p style="text-align: left;"><strong>Email:</strong> {{ driver.email }}</p>
              <p style="text-align: left;"><strong>Phone:</strong> {{ driver.phoneNumber }}</p>
              <p style="text-align: left;"><strong>Vehicle Type:</strong> {{ driver.vehicleType }}</p>
              <p style="text-align: left;"><strong>Vehicle Capacity:</strong> {{ driver.vehicleCapacity }}</p>
              
              <p style="text-align: left;"><strong>Driver Due File:</strong> <br>
                <a v-if="driver && driver.downloadUrl" :href="driver.downloadUrl" download="driver_file.bin" style="margin-left: 50%;">
                  <img src="../assets/vector-documents-icon.jpg">
                </a>
              </p>
            </div>
            <button @click="goBack" class="back-btn">Back</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import hea from '../components/HeaderVue.vue';
import sid from '../components/SideVue.vue';

export default {
  components: {
    hea,
    sid,
  },
  data() {
    return {
      selectedView: 'New Driver Details',
      driver: null,
      driverid: this.$route.params.id,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/NewDrivers");
    },
    async fetchDriverDetails() {
      try {
        const response = await axios.get(`https://localhost:44330/api/Driver/${this.driverid}/driver-info`);
        const { driverInfoResponse, downloadUrl } = response.data;
        this.driver = {
          ...driverInfoResponse,
          photo: downloadUrl,  // Assuming you have a different URL for the driver's photo
          downloadUrl: downloadUrl  // This is the URL for the driver due file
        };
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    }
  },
  mounted() {
    this.fetchDriverDetails();
  }
};
</script>

<style scoped>
.container1 {
  display: grid;
  grid-template-columns: auto 1fr; 
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);
  display: flex;
  width: 100%;
}
/* Add styles for the driver details component */
.driver {
  color: whitesmoke;
  background-color: #12372A;
  text-align: center;
  padding: 15px;
  border-radius: 20px;
  width: 110%;
  flex-grow: 1;
  margin-top: 20%;
}

.nw-driver-details {
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
  margin-left: 20%;
  width: 200px;
  background-color: #12372A;
  color: aliceblue;
  font-size: x-large;
  margin-top: 123px;
  border-radius: 10px;
  padding: 10px;
}

.upgrade-btn {
  margin-left: 100%;
  width: 70%;
  background-color: #12372A;
  color: aliceblue;
  font-size: x-large;
  margin-top: 167px;
  border-radius: 10px;
  padding: 10px;
}

img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}
</style>
