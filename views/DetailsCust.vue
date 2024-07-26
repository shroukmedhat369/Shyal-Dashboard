<template>
  <hea :selectedView="selectedView"></hea>
  <div class="container1">
    <sid @view-selected="updateSelectedView"></sid>
    <div class="content">
      <div class="customer-details">
        <div class="btns">
          <button @click="showPageContent" class="btn">Orders</button>
        </div>
        <div style="display: flex;" class="customer-details-container">
          <div style="margin-left: 15px;">
            <div class="customer" v-if="customer">
              <div class="driver-info">
                <img src="../assets/profile.png" alt="Driver Photo">
                <p><strong>Name:</strong> {{ customer.customerName }}</p>
                <p><strong>Email:</strong> {{ customer.customerEmail }}</p>
                <p><strong>Phone Number:</strong> {{ customer.customerPhoneNumber }}</p>
              </div>
              <router-link :to="{ name: 'EditCust', params: { id: customer.customerId } }" class="edit-btn">
                <i class="fas fa-edit"></i> Edit
              </router-link>
            </div>
            <div v-else>
              <p>Loading customer details...</p>
            </div>
            <div v-if="driver" class="order-dd">
              <h1><strong>Insights</strong></h1>
              <p>Last order: {{ lastOrderTime }}</p>
              <p>Open orders: {{ pendingOrdersNumber }} Orders</p>
              <p>Order Complete: {{ completedOrders }} order</p>
              <!-- Add more details as needed -->
            </div>
            <button @click="goBack" class="back-btn">Back</button>
          </div>
          <div>
            <div >
              <div v-if="showContent" class="orders-table">
                <h1 style="text-align: left; padding-left: 3px; position: sticky; top: 0; z-index: 1;">
                  <strong>Total Orders: {{ numberOfOrders }}</strong>
                </h1>
                <table style="border-collapse: collapse; height: 44px; flex-grow: 1;">
                  <thead>
                    <tr>
                      <th>Sender Phone</th>
                      <th>Receiver Phone</th>
                      <th>Sender Name</th>
                      <th>Receiver Name</th>
                      <th>Origin Address</th>
                      <th>Destination Address</th>
                      <th>Weight</th>
                      <th>Total Cost</th>
                      <th>Order Date</th>
                      <th>Order Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(order, index) in Orders" :key="index">
                      <td>{{ order.senderPhone }}</td>
                      <td>{{ order.receiverPhone }}</td>
                      <td>{{ order.senderName }}</td>
                      <td>{{ order.receiverName }}</td>
                      <td>{{ order.originAddress }}</td>
                      <td>{{ order.destinationAddress }}</td>
                      <td>{{ order.weight }} KG</td>
                      <td>{{ order.totalCost }}$</td>
                      <td>{{ order.orderDate }}</td>
                      <td>{{ order.ordertime }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import EditOrder from './EditOrder.vue';
import axios from 'axios';
import hea from '../components/HeaderVue.vue';
import sid from '../components/SideVue.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    EditOrder,
    hea,
    sid,
  },
  data() {
  return {
    selectedView: 'Customer Details',
    showContent: false,
    showEditOrder: false,
    Orders: [],
    currentOrder: null,
    customer: null,
    customerId: this.$route.params.id,
    lastOrderTime: '', // Placeholder for last order time
    pendingOrdersNumber: 0, // Placeholder for pending orders number
  };
},
  computed: {
    numberOfOrders() {
      return this.Orders.length;
    },
  },
     computed: {
    ...mapGetters(['getToken']), // Map the getToken getter
  },
  created() {
    this.fetchDriverDetails();
  this.fetchDriverOrders();
  this.fetchLastOrderTime(); // Call to fetch last order time
  this.fetchPendingOrdersNumber(); 
  },
  methods: {
    async fetchDriverDetails() {
      try {
        const response = await axios.get(`https://localhost:44330/api/Customer/customer-${this.customerId}`);
        console.log(response.data); // Log the response data
        this.customer = response.data[0]; // Assuming the API returns an array with a single object
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    },
    async fetchDriverOrders() {
      try {
        const response = await axios.get(`https://localhost:44330/api/Customer/${this.customerId}/orders`);
        console.log(response.data); // Log the response data
        this.Orders = response.data;
      } catch (error) {
        console.error('Error fetching driver orders:', error);
      }
    },
    async fetchPendingOrdersNumber() {
  try {
    const response = await axios.get(`https://localhost:44330/api/Driver/${this.customerId}/pending-orders-Number`);
    console.log(response.data); // Log the response data
    this.pendingOrdersNumber = response.data;
  } catch (error) {
    console.error('Error fetching pending orders number:', error);
  }
},
async fetchLastOrderTime() {
  try {
    const response = await axios.get(`https://localhost:44330/api/Driver/last-order-time/${this.customerId}`);
    console.log(response.data); // Log the response data
    this.lastOrderTime = response.data;
  } catch (error) {
    console.error('Error fetching last order time:', error);
  }
},
    async fetchCompletedOrders() {
      try {
        const response = await axios.get(`https://localhost:44330/api/Driver/${this.driverId}/completed-orders-Number`);
        console.log(response.data); // Log the response data
        this.completedOrders = response.data; // Assuming the response is a single number
      } catch (error) {
        console.error('Error fetching completed orders number:', error);
      }
    },
    goBack() {
      this.$router.push('/Customers');
    },
    showPageContent() {
      this.showContent = true;
      this.showDrag = false;
    },
    cancelEdit() {
      this.showEditOrder = false;
      this.showContent = true;
    },
    deleteOrder(orderId) {
      const userConfirmed = confirm(`Do you want to delete this order ${orderId}?`);
      if (userConfirmed) {
        alert('You pressed Yes!');
      } else {
        alert('You pressed No!');
      }
    },
    editOrder(orderId) {
      this.$router.push({ name: 'EditOrder', params: { id: orderId } });
    },
  },
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
  .customer{
    color:whitesmoke;
    background-color: #12372A;
    /* margin-left: 16%; */
    text-align: left;
    /* width: 18%; */
    padding: 15px;
    border-radius: 20px;
    /* margin-right: 0; */
    width: 200px;
    flex-grow: 1;
  }

  .btns
  {
    background-color: #12372A;
    margin-left: 500px;
    width: 300px;
    border-radius: 20px;
    border-color: rgba(255, 255, 255, 0);
    margin-bottom: 5px;
    display: flex;
  }
  .btn{
    width: 100%;
    padding: 25px;
    text-align: center;

    background-color: transparent;
    font-size: larger;
    color: antiquewhite;
    border-color: rgba(255, 255, 255, 0);


  }
  .btn:active{
    text-decoration: underline yellow;
  }
  .orders-table{
    align-content: left;
    background-color:#12372A ;
    color: aliceblue;
    /* margin-left: 38%;
    margin-top: 0%;   */
    display: inline-block;  
    margin-left: 19px;
    width: 90%;
    text-align: center;
    border-radius: 20px;
    margin-top: 10px;
    padding-left: 3px;
    padding-top: 5px;
    padding-right: 3px;
    height: min-content;
    flex-grow: 1;
    overflow-y: auto;
    max-height: 450px;
  }
  thead{
    position: sticky; /* Make the header sticky */
    top: 0; /* Stick to the top of the container */
    z-index: 1; /* Ensure the header stays above other content */
  }
  .customer, .orders-table {
  
  vertical-align: top; /* Align divs vertically */
}

.order-dd{
    color:whitesmoke;
    background-color: gray;
    /* margin-left: 16%; */
    text-align: left;
    /* width: 18%; */
    padding: 15px;
    border-radius: 20px;
    /* margin-right: 0; */
    margin-top: 15px;
    width: 200px;
    
}
.delete-btn{
    background-color:rgba(255, 255, 255, 0);
    text-align: center;
    color: red;
    text-decoration: none;
    border-color: rgba(255, 255, 255, 0);
    font-size: medium;
    display: flex;
  }
  .edit-btn{
    background-color:rgba(255, 255, 255, 0);
    text-align: center;
    color: aliceblue;
    text-decoration: none;
    border-color: rgba(255, 255, 255, 0);
    font-size: medium;
    
  }
  th, td{
  padding: 8px;
  /* text-align: left; */
  border-bottom: 1px solid #ddd;
  }
  th{
    font-size: small;
    text-align: left;
    position: sticky; /* Make the header sticky */
    top: 0; /* Stick to the top of the container */
    z-index: 1; /* Ensure the header stays above other content */
  }
  td{
    text-align: center;
  }

  .back-btn{
   
   
    width: 150px;
    background-color: #12372A;
    color: aliceblue;
    font-size: x-large;
    /* margin-top: 123px; */
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;

  }



  .drag-drop-area {
  border: 2px solid transparent;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 80px;
  text-align: center;
  cursor: pointer;
  margin-left: 6%;
  margin-bottom: 10px;
  background-color: rgb(150, 180, 150);
   
  width: 50%;
  }

.drag-over {
  border-color: #00bcd4;
}

/* button {
  padding: 10px 20px;
  background-color: #00bcd4;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
} */

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}



img{
    width: 40px;
    height: 40px;
    margin-left: 37%;
  }

  </style>