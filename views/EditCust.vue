<template>
  <hea :selectedView="selectedView"></hea>
  <div class="container1" v-if="isDataLoaded">
    <sid @view-selected="updateSelectedView"></sid>
    <div class="content">
      <div class="edit-customer-container">
        <div class="customer">
          <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="form-group">
              <label for="customerName">Customer Name:</label>&ensp;&ensp;
              <input type="text" v-model="customer.customerName" id="customerName" required />
            </div><p></p>
            <div class="form-group">
              <label for="customerEmail">Customer Email:</label>&ensp;&ensp;
              <input type="email" v-model="customer.customerEmail" id="customerEmail" required />
            </div><p></p>
            <div class="form-group">
              <label for="customerPhoneNumber">Customer Phone Number:</label>&ensp;&ensp;
              <input type="text" v-model="customer.customerPhoneNumber" id="customerPhoneNumber" required />
            </div><p></p>

          </form>
        </div>
        <div style="display: flex;">
          <button type="submit" @click="submitForm" class="upgrade-btn">Update Customer</button>
          <button @click="goBack" class="back-btn">Back</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading customer details...</p>
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
      selectedView: 'Edit Customer',
      customer: {
        customerName: '',
        customerEmail: '',
        customerPhoneNumber: '',
       
      },
      customerId: this.$route.params.id,
      isDataLoaded: false,
    };
  },
     computed: {
    ...mapGetters(['getToken']), // Map the getToken getter
  },
  created() {
    this.fetchCustomerDetails();
  },
  methods: {
    goBack() {
      this.$router.push("/Customers");
    },
    async fetchCustomerDetails() {
      try {
        const response = await axios.get(`https://localhost:44330/api/Customer/customer-${this.customerId}`);
        const customerData = response.data.find(customer => customer.customerID === this.customerId);
        if (customerData) {
          this.customer = customerData;
        }
        this.isDataLoaded = true;
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    },
   
    async submitForm() {
      const formData = new FormData();
      formData.append('CustomerName', this.customer.customerName);
      formData.append('CustomerEmail', this.customer.customerEmail);
      formData.append('CustomerPhoneNumber', this.customer.customerPhoneNumber);
     

      try {
        await axios.put(`https://localhost:44330/api/Customer/${this.customerId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${this.getToken()}`
          }
        });
        alert('Customer information updated successfully.');
        this.$router.push({ name: 'Customers' });
      } catch (error) {
        console.error('Error updating customer:', error);
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
.customer {
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
.edit-customer {
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

