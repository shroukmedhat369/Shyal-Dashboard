<template>
  <hea :selectedView="selectedView"></hea>
  <div class="container1">
    <sid @view-selected="updateSelectedView"></sid>
    <div class="content">
      <div class="contentt">
        <div class="header-buttons">
          <button @click="showTotalDrivers" class="btn-style">
            <i class="fas fa-users"> </i>&ensp; Total Drivers
          </button>
          <button @click="showTopDrivers" class="btn-style">
            <i class="fas fa-star"></i>&ensp; Top Drivers
          </button>
          <button @click="showNewDrivers" class="btn-style">
            <i class="fas fa-plus-circle"></i>&ensp; New Drivers
          </button>
        </div>
        <div v-if="showTable" class="drivers-table">
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
                <th v-if="showTable">ND: {{ numberOfDrivers }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(driver, index) in drivers" :key="index">
                <td style="background-color: transparent;"><img src="../assets/profile.png" alt="Driver Photo"></td>
                <td>{{ driver.driverName }}</td>
                <td>{{ driver.driverEmail }}</td>
                <td>{{ driver.driverPhoneNumber }}</td>
                <td style="display: flex;">
                  <router-link :to="{ name: 'DeleteDriver', params: { id: driver.driverID } }" class="delete-btn">
                    <i class="fas fa-edit"></i> Delete
                  </router-link>
                  &ensp;&ensp;
                  <router-link :to="{ name: 'EditDriver', params: { id: driver.driverID } }" class="edit-btn">
                    <i class="fas fa-edit"></i> Edit
                  </router-link>
                </td>
                <td style="width: 13%;">
                  <button @click="viewDetails(driver)" class="view-btn">
                    <i class="fas fa-eye"></i>&ensp; View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
    sid
  },
  data() {
    return {
      selectedView: 'Drivers',
      showTable: false,
      drivers: [],
    };
  },
  computed: {
    numberOfDrivers() {
      return this.drivers.length;
    }
  },
  computed: {
    ...mapGetters(['getToken']), // Map the getToken getter
  },
  methods: {
    async showTotalDrivers() {
      try {
        this.showTable = true;
        const response = await axios.get('https://localhost:44330/api/Driver');
        this.drivers = response.data;
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    },
    async showTopDrivers() {
      try {
        this.showTable = true;
        const response = await axios.get('https://localhost:44330/api/Driver/top-Drivers');
        this.drivers = response.data;
      } catch (error) {
        console.error('Error fetching top drivers:', error);
      }
    },
    async showNewDrivers() {
      try {
        this.showTable = true;
        const response = await axios.get('https://localhost:44330/api/Driver/new-approved-Drivers');
        this.drivers = response.data;
      } catch (error) {
        console.error('Error fetching new drivers:', error);
      }
    },
    viewDetails(driver) {
      this.$router.push({ name: 'DetailsDriver', params: { id: driver.driverID } });
    },
    editDriver(driver) {
      this.$router.push({ name: 'EditDriver', params: { id: driver.id } });
    },
    updateSelectedView(view) {
      this.selectedView = view;
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
.contentt {
  flex-grow: 1;
  padding-left: 0;
  top: 0;
}
.header-buttons {
  margin-bottom: 20px;
  background-color: #12372A;
  text-align: center;
  width: 60%;
  border-radius: 50px;
  justify-content: center;
  margin-left: 22%;
  display: flex;
}
.btn-style {
  width: 31%;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 50px;
  color: aliceblue;
  border-color: beige;
  margin: 5px;
}
.delete-btn {
  background-color: rgba(255, 255, 255, 0);
  text-align: center;
  color: red;
  text-decoration: none;
  border-color: rgba(255, 255, 255, 0);
  font-size: large;
}
.edit-btn {
  background-color: rgba(255, 255, 255, 0);
  text-align: center;
  color: aliceblue;
  text-decoration: none;
  border-color: rgba(255, 255, 255, 0);
  font-size: large;
}
.view-btn {
  background-color: rgba(255, 255, 255, 0);
  text-align: left;
  color: aliceblue;
  text-decoration: none;
  border-color: bisque;
  border-radius: 50px;
  width: 100%;
  margin-right: 10px;
  display: flex;
}
.drivers-table {
  margin-top: 20px;
  max-height: 600px;
  overflow-y: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  position: sticky;
  top: 0;
  z-index: 1;
}
th, td {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  text-align: left;
  color: aliceblue;
}
th {
  background-color: #12372A;
  color: aliceblue;
}
tr {
  border-radius: 40px;
  border: 5px;
  border-color: rgba(255, 255, 255, 0);
}
thead {
  border-radius: 40px;
}
tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
tr:nth-child(even) {
  background-color: darkcyan;
}
tr:nth-child(odd) {
  background-color: darkturquoise;
}
button {
  padding: 6px 10px;
  margin-right: 5px;
}
img {
  width: 40px;
  height: 40px;
}
</style>
