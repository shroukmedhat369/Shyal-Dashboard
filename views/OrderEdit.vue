<template>
  <div class="app-container">
    <Header />

    <main class="main-content">
      <SideBar />
      <section class="content">
        <h2>Edit Order</h2>
        <div v-if="isLoading" class="loading-indicator">Saving...</div>

        <form class="edit-Form" @submit.prevent="SaveChanges">
          <div class="form-row">
            <div class="form-group">
              <label for="orderID">Order ID</label>
              <input
                type="text"
                name="orderID"
                v-model="orders.orderID"
                id="orderID"
                disabled
              />
            </div>
            <div class="form-group">
              <label for="customerID">Customer ID</label>
              <input
                type="text"
                name="customerID"
                v-model="orders.customerID"
                id="customerID"
                disabled
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="driverID">Driver ID</label>
              <input
                type="text"
                name="driverID"
                v-model="orders.driverID"
                id="driverID"
                disabled
              />
            </div>
            <div class="form-group">
              <label for="senderPhone">Sender Phone</label>
              <input
                type="text"
                name="senderPhone"
                v-model="orders.senderPhone"
                id="sender Phone"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="receiverPhone">receiverPhone</label>
              <input
                type="text"
                name="receiverPhone"
                v-model="orders.receiverPhone"
                id="receiverPhone"
              />
            </div>
            <div class="form-group">
              <label for="senderName">senderName</label>
              <input
                type="text"
                name="senderName"
                v-model="orders.senderName"
                id="senderName"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="receiverName">receiverName</label>
              <input
                type="text"
                name="receiverName"
                v-model="orders.receiverName"
                id="receiverName"
              />
            </div>
            <div class="form-group">
              <label for="Origin Address">Origin Address</label>
              <input
                type="text"
                name="Origin Address"
                v-model="orders.originAddress"
                id="Origin Address"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="destinationAddress">Destination Address</label>
              <input
                type="text"
                name="destinationAddress"
                v-model="orders.destinationAddress"
                id="destinationAddress"
              />
            </div>
            <div class="form-group">
              <label for="weight">Weight</label>
              <input
                type="text"
                name="weight"
                v-model="orders.weight"
                id="weight"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="orderStatus">Order Status</label>
              <input
                type="text"
                name="orderStatus"
                v-model="orders.orderStatus"
                id="orderStatus"
                
              />
            </div>
            <div class="form-group">
              <label for="orderDate">Order Date</label>
              <input
                type="text"
                name="orderDate"
                v-model="orders.orderDate"
                id="orderDate"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="packageCost">Package Cost</label>
              <input
                type="text"
                name="packageCost"
                v-model="orders.packageCost"
                id="packageCost"
              />
            </div>
            <div class="form-group">
              <label for="appFee">App Fee</label>
              <input
                type="text"
                name="appFee"
                v-model="orders.appFee"
                id="appFee"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="destinationAddress">Order Cost</label>
              <input
                type="text"
                name="orderCost"
                v-model="orders.orderCost"
                id="orderCost"
              />
            </div>
            <div class="form-group">
              <label for="totalCost">Total Cost</label>
              <input
                type="text"
                name="totalCost"
                v-model="orders.totalCost"
                id="totalCost"
              />
            </div>
          </div>

          <div class="form-buttons">
            <button class="btn-left" type="submit">Save</button>
            <button class="btn-right" type="button" @click="goBack">
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import Header from "@/components/HeaderVue.vue";
import SideBar from "@/components/SideVue.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    FontAwesomeIcon,
    Header,
    SideBar,
  },

  data() {
    return {
      orders: [],
      isLoading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/orders");
    },
    async SaveChanges() {
      this.isLoading = true;
      const updatedOrder = {
        customerID: this.orders.customerID,
        driverID: this.orders.driverID,
        senderPhone: this.orders.senderPhone,
        receiverPhone: this.orders.receiverPhone,
        senderName: this.orders.senderName,
        receiverName: this.orders.receiverName,
        originAddress: this.orders.originAddress,
        destinationAddress: this.orders.destinationAddress,
        weight: this.orders.weight,
        orderStatus: this.orders.orderStatus,
        orderDate: this.orders.orderDate,
        packageCost: this.orders.packageCost,
        appFee: this.orders.appFee,
        orderCost: this.orders.orderCost,
        totalCost: this.orders.totalCost,
        message: this.orders.message,
      };

      try {
        await axios.put(
          `https://localhost:44330/api/Customer/orders/update/${this.$route.params.id}`,
          updatedOrder
        );
        this.$router.push("/orders");
      } catch (error) {
        console.error("Failed to save changes:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    fetch(
      `https://localhost:44330/api/Customer/orders/details/${this.$route.params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.orders = data;
      })
      .catch((err) => console.log(err.message));
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: grid;
       grid-template-columns: auto 1fr; 
       
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);
  display: flex;
  width: 100%;
}

.content {
  padding: 30px;
 
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #2f3b37;
  width: calc(100vw - 330px);
  margin: 0 5px 0 220px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h2 {
  color: #007c4f;
  font-size: 25px;
}
.edit-Form {
  text-align: center;
}
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

.form-group {
  padding: 20px;
  background-color: #1d6e53;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(239, 235, 235, 0.1);
  transition: background-color 0.3s, transform 0.3s;
}

.form-group label {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #2f3b37;
}

.edit-Form input {
  margin-bottom: 15px;
  padding: 15px;
  display: block;
  width: 250px;
  border: 3px solid #1a927a;
  border-radius: 8px;
  text-align: center;
  color: black;
  font-size: large;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-left {
  border: 2px solid #2f3b37;
  border-radius: 10px;
  padding: 10px;
  width: 200px;
  color: white;
  box-shadow: inset 0 -100px 0 0 #2f3b37;
  font-size: 16px;
}

.btn-left:hover {
  box-shadow: inset 0 -100px 0 0 #eee;
  color: #2f3b37;
}

.btn-right {
  background: #c1c1c1;
  border: none;
  color: #fff;
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  font-size: 16px;
}
.btn-right:hover,
.btn-right:focus {
  background: #a8a8a8;
}
</style>
