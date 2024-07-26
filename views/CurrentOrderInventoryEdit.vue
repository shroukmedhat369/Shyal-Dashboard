<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <SideBar />
      <section class="content">
        <h2>Edit Order Inventory</h2>
        <form @submit.prevent="updateOrder">
          <!-- Removed the form-row for Description -->
          <div class="form-row">
            <div class="form-group">
              <label for="customerID">Customer ID:</label>
              <input
                type="text"
                v-model="order.customerID"
                id="customerID"
                class="edit-input"
                required
              />
            </div>
            <div class="form-group">
              <label for="senderName">Sender Name:</label>
              <input
                type="text"
                v-model="order.senderName"
                id="senderName"
                class="edit-input"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="senderPhone">Sender Phone:</label>
              <input
                type="text"
                v-model="order.senderPhone"
                id="senderPhone"
                class="edit-input"
                required
              />
            </div>
            <div class="form-group">
              <label for="senderAddressID">Sender Address ID:</label>
              <input
                type="text"
                v-model="order.senderAddressID"
                id="senderAddressID"
                class="edit-input"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="receiverName">Receiver Name:</label>
              <input
                type="text"
                v-model="order.receiverName"
                id="receiverName"
                class="edit-input"
                required
              />
            </div>
            <div class="form-group">
              <label for="receiverPhone">Receiver Phone:</label>
              <input
                type="text"
                v-model="order.receiverPhone"
                id="receiverPhone"
                class="edit-input"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="receiverAddressID">Receiver Address ID:</label>
              <input
                type="text"
                v-model="order.receiverAddressID"
                id="receiverAddressID"
                class="edit-input"
                required
              />
            </div>
            <div class="form-group">
              <label for="sendingDriverID">Sending Driver ID:</label>
              <input
                type="text"
                v-model="order.sendingDriverID"
                id="sendingDriverID"
                class="edit-input"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="receivingDriverID">Receiving Driver ID:</label>
              <input
                type="text"
                v-model="order.receivingDriverID"
                id="receivingDriverID"
                class="edit-input"
                required
              />
            </div>
            <div class="form-group">
              <label for="receivingDateTime">Receiving DateTime:</label>
              <input
                type="datetime-local"
                v-model="order.receivingDateTime"
                id="receivingDateTime"
                class="edit-input"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="leavingDateTime">Leaving DateTime:</label>
              <input
                type="datetime-local"
                v-model="order.leavingDateTime"
                id="leavingDateTime"
                class="edit-input"
                required
              />
            </div>
            <div class="form-group">
              <label for="storeID">Store ID:</label>
              <input
                type="text"
                v-model="order.storeID"
                id="storeID"
                class="edit-input"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="orderSize">Order Size:</label>
              <input
                type="text"
                v-model="order.orderSize"
                id="orderSize"
                class="edit-input"
                required
              />
            </div>
            <div class="form-group">
              <label for="orderStatus">Order Status:</label>
              <input
                type="number"
                v-model="order.orderStatus"
                id="orderStatus"
                class="edit-input"
                disabled
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="inventoryFee">Inventory Fee:</label>
              <input
                type="number"
                v-model="order.inventoryFee"
                id="inventoryFee"
                class="edit-input"
                required
              />
            </div>
            <div class="form-group">
              <label for="appFee">App Fee:</label>
              <input
                type="number"
                v-model="order.appFee"
                id="appFee"
                class="edit-input"
                required
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="orderCost">Order Cost:</label>
              <input
                type="number"
                v-model="order.orderCost"
                id="orderCost"
                class="edit-input"
                required
              />
            </div>
            <div class="form-group">
              <label for="totalCost">Total Cost:</label>
              <input
                type="number"
                v-model="order.totalCost"
                id="totalCost"
                class="edit-input"
                required
              />
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-left">Save Changes</button>
            <button type="button" class="btn-right" @click="cancelEdit">
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
import Header from "@/components/HeaderVue.vue";
import SideBar from "@/components/SideVue.vue";
import axios from "axios";

export default {
  components: {
    FontAwesomeIcon,
    Header,
    SideBar,
  },
  data() {
    return {
      order: {},
    };
  },

  methods: {
    updateOrder() {
      axios
        .put(
          `https://localhost:44330/api/AdminHome/Update-orderinventory/${this.order.id}`,
          this.order
        )
        .then(() => {
          this.$router.push({ name: "CurrentOrders" });
        })
        .catch((err) => console.error("Error updating order:", err));
    },
    cancelEdit() {
      this.$router.push("/CurrentOrders");
    },
  },
  mounted() {
    fetch(
      `https://localhost:44330/api/AdminHome/orderinventory/details/${this.$route.params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.order = data;
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
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: #2f3b37;
  width: calc(100vw - 330px);
  margin: 0 5px 0 220px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

h2 {
  color: #007c4f;
  font-size: 25px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

.form-group {
  padding: 25px;
  background-color: #007c4f;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(239, 235, 235, 0.1);
  transition: background-color 0.3s, transform 0.3s;
  margin-right: 30px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align vertically */
  justify-content: center; /* Center align horizontally */
}

.form-group label {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #2f3b37;
}

.edit-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 150px;
}

.btn-left {
  background-color: #007c4f;
  margin-left: 10px;
}

.btn-right {
  background-color: red;
  margin-right: 35px;
}

button:hover {
  opacity: 0.8;
}
</style>
