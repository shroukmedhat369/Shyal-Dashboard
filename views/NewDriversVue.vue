<template>
  <hea :selectedView="selectedView"></hea>
     <div class="container1">
       <sid @view-selected="updateSelectedView"></sid>
       <div class="content">
      <div v-if="showNewDriver" class="new-driver">
      <div class="header-buttons">
        <button @click="fetchNewDrivers" class="btn-style">
            <i class="fas fa-plus-circle"></i>&ensp; New Drivers</button>
      </div>
      <div class="drivers-table" v-if="showTable">
        <table>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
              
              <th>Num of Drivers: {{ numberOfDrivers }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(driver, index) in drivers" :key="index">
              <td><img src="../assets/profile.png" alt="Driver Photo"></td>
              <td>{{ driver.driverName }}</td>
              <td>{{ driver.driverEmail }}</td>
              <td>{{ driver.driverPhoneNumber }}</td>
              <td style="display: flex;">
                    
                    <button @click="deleteDriver(driver.driverID)" class="AD-btn">
                      <i class="fas fa-times icon-wrong"></i> <!-- Edit icon --> </button>
                    &ensp;&ensp;
                    <button @click="approveDriver(driver.driverID)" class="AD-btn">
                      <i class="fas fa-check icon-right"></i> <!-- Edit icon --></button>
                    <button  @click="viewDetails(driver)" class="view-btn" >
                        <i class="fas fa-eye"></i> <!-- View icon -->&ensp; View Details</button>
              </td>
              <td></td>
             
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
      selectedView: 'New Drivers',
      showTable: false,
      showNewDriver: true,
      drivers: [], // Store driver data
    };
  },
  computed: {
    numberOfDrivers() {
      return this.drivers.length;
    }
  },
  methods: {
    fetchNewDrivers() {
      axios.get('https://localhost:44330/api/Driver/new-Unapproved-Drivers', {
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN_HERE',
          'accept': 'text/plain'
        }
      })
      .then(response => {
        this.drivers = response.data;
        this.showTable = true;
      })
      .catch(error => {
        console.error('There was an error fetching the drivers!', error);
      });
    },
    approveDriver(driverId) {
    axios.post(`https://localhost:44330/api/Driver/approve-driver`, {}, {
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE',
        'accept': '*/*'
      },
      params: {
        id: driverId
      }
    })
    .then(response => {
      console.log('Driver approved successfully:', response.data);
      this.fetchNewDrivers(); // Refresh the drivers list
    })
    .catch(error => {
      console.error('There was an error approving the driver!', error);
    });
  },
  deleteDriver(driverID) {
      axios.delete(`https://localhost:44330/api/Driver/${driverID}`, {
        headers: {
          'Authorization': 'Bearer YOUR_TOKEN_HERE',
          'accept': 'text/plain'
        }
      })
      .then(response => {
        this.drivers = this.drivers.filter(driver => driver.driverID !== driverID);
      })
      .catch(error => {
        console.error('There was an error deleting the driver!', error);
      });
    },
    editDriver(driver) {
      // Logic to edit driver
      console.log('Editing driver:', driver);
    },
    viewDetails(driver) {
      this.$router.push({ name: 'DetailsNewD', params: { id: driver.driverID } });
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
     .content{
      padding: 20px; 
      font-size: 14px; 
     }
  .new-driver {
    /* position: absolute;
    top: 0;
    left: 220px; 
    width: 200px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    margin-left: 20%; */
    flex-grow: 1; /* Make the content area grow to fill available space */
    padding-left: 0;
    }
  
  .header-buttons {
    margin-bottom: 20px;
    background-color: #12372A;
    text-align: center;
    /* margin-left: 350px;
    margin-right: 370px; */
    width: 60%;
    border-radius: 50px;
    justify-content: center;
    margin-left: 22%;
    display: flex;
  }
  .btn-style{
    width: 31%;
    background-color:rgba(255, 255, 255, 0);
    border-radius: 50px;
    color: aliceblue;
    border-color: beige;
    margin: 5px;
  }
  .delete-btn{
    background-color:rgba(255, 255, 255, 0);
    text-align: center;
    color: red;
    text-decoration: none;
    border-color: rgba(255, 255, 255, 0);
    font-size: large;
  }
  .edit-btn{
    background-color:rgba(255, 255, 255, 0);
    text-align: center;
    color: aliceblue;
    text-decoration: none;
    border-color: rgba(255, 255, 255, 0);
    font-size: large;
  }
  .view-btn{
    background-color:rgba(255, 255, 255, 0);
    text-align: left;
    color: aliceblue;
    text-decoration: none;
    border-color: bisque;
    /* font-size: small; */
    border-radius: 50px;
    width: 300%;
    margin-right: 10px;
    display: flex;
    font-size: smaller;
  }
  .AD-btn{
    background-color:rgba(255, 255, 255, 0);
    text-align: center;
    color: aliceblue;
    text-decoration: none;
    border-color: bisque;
    /* font-size: small; */
    border-radius: 100px;
    width: 30%;
    margin-right: 10px;
    display: flex;
    padding: 15px;
  }
  
  .drivers-table {
    margin-top: 20px;
    max-height: 600px; /* Set the maximum height for the scrollable area */
    overflow-y: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  thead{
    position: sticky; /* Make the header sticky */
            top: 0; /* Stick to the top of the container */
            z-index: 1; /* Ensure the header stays above other content */
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
    text-align: center;
  }
  tr {
    border-radius: 40px;
    border: 5px;
    border-color: rgba(255, 255, 255, 0);
  }
  thead{
    border-radius: 40px;
  }
  tr:hover {
    /* background-color: #f2f2f2; */
    background-color:rgba(255, 255, 255, 0.1);
  }
  tr:nth-child(even){background-color: darkcyan;}
  tr:nth-child(odd){background-color: darkturquoise;}

    
  button {
    padding: 6px 10px;
    margin-right: 5px;
  }
  img{
    width: 40px;
    height: 40px;
  }
  /* .icon-right {
            color: green; */
            /* font-size: medium;
        }
        .icon-wrong {
            color: red; 
           font-size: medium;

        } */
  </style>