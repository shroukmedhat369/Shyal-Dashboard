<template>
  <div class="edit-order">
    <h2>Edit Order</h2>
    <!-- <form @submit.prevent="updateOrder"> -->
    <form class="driver">
      <div>
        <label for="customerID">Customer ID:</label>
        <input v-model="order.customerID" id="customerID" type="tel" required />
      </div>
      <div>
        <label for="originAddress">Origin Address:</label>
        <input v-model="order.originAddress" id="originAddress" type="tel" required />
      </div>
      <div>
        <label for="destinationAddress">Destination Address:</label>
        <input v-model="order.destinationAddress" id="destinationAddress" type="tel" required />
      </div>
      <div>
        <label for="weight">Weight:</label>
        <input v-model="order.weight" id="weight" type="tel" required />
      </div>
      <div>
        <label for="totalPrice">Total Price:</label>
        <input v-model="order.totalPrice" id="totalPrice" type="tel" required />
      </div>
      <div>
        <label for="orderStatus">Order Status:</label>
        <input v-model="order.orderStatus" id="orderStatus" type="tel" required />
      </div>
      <div>
        <label for="createdAt">Created At:</label>
        <input v-model="order.createdAt" id="createdAt" type="tel" required />
      </div>
      <br>
      <button type="submit">Update Order</button>
      <button type="button" @click="$emit('cancel-edit')">Cancel</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EditOrder',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
     computed: {
    ...mapGetters(['getToken']), // Map the getToken getter
  },
  methods: {
    updateOrder() {
      this.$emit('update-order', this.order);
    }
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
    .edit-order {
      background-color: rgba(255, 255, 255, 0.0);    padding: 20px;
      border-radius: 5px;
      margin-left: 100px;
      align-content: center;
      width: 80%;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
    }
    button {
      margin-right: 10px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button[type="button"] {
      background-color: #f44336;
    }
    .driver{
      color:whitesmoke;
      background-color: #12372A;
      /* margin-left: 16%; */
      text-align: center;
      /* width: 18%; */
      padding: 15px;
      border-radius: 20px;
      /* margin-right: 0; */
      width: 110%;
      flex-grow: 1;
      margin-top: 20%;
    }
    </style>
    