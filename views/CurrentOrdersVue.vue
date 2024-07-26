<template>
  <div class="app-container">
    <Header />

    <main class="main-content">
      <SideBar></SideBar>
      <section class="content">
        <h2>Current Orders ({{ totalOrders1 + totalOrders2 }})</h2>
        <div class="content-list">
          <div class="content-buttons">
            <button @click="filterOrders('deliveryOnly')">Delivery Only</button>
            <button @click="filterOrders('storeFirst')">Store First</button>
          </div>
        </div>
        <div class="content-table-container">
          <table>
            <thead>
              <tr v-if="filterCriteria === 'deliveryOnly'">
                <!-- Attributes for delivery only orders -->
                <th>Order ID</th>
                <th>Sender Name</th>
                <th>Sender Phone</th>
                <th>Receiver Name</th>
                <th>Receiver Phone</th>
                <th>Origin Address</th>
                <th>Destination Address</th>
                <th>Order Status</th>
                <th>Order Date</th>
                <th>Package Cost</th>
                <th>App Fee</th>
                <th>Order Cost</th>
                <th>Total Cost</th>
                <th>Actions</th>
              </tr>
              <tr v-else-if="filterCriteria === 'storeFirst'">
                <!-- Attributes for store first orders -->
                <th>Order ID</th>
                <th>Description</th>
                <th>Sender Name</th>
                <th>Sender Phone</th>
                <th>Receiver Name</th>
                <th>Receiver Phone</th>
                <th>Order Status</th>
                <th>Receiving Date Time</th>
                <th>Leaving Date Time</th>
                <th>Store ID</th>
                <th>Order Size</th>
                <th>Inventory Fee</th>
                <th>App Fee</th>
                <th>Order Cost</th>
                <th>Total Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="filterCriteria === 'deliveryOnly'">
                <tr
                  v-for="order in filteredOrders1"
                  :key="'order1-' + order.orderID"
                >
                  <td>{{ order.orderID }}</td>
                  <td>{{ order.senderName }}</td>
                  <td>{{ order.senderPhone }}</td>
                  <td>{{ order.receiverName }}</td>
                  <td>{{ order.receiverPhone }}</td>
                  <td>{{ order.originAddress }}</td>
                  <td>{{ order.destinationAddress }}</td>
                  <td>{{ order.orderStatus }}</td>
                  <td>{{ order.orderDate }}</td>
                  <td>{{ order.packageCost }}</td>
                  <td>{{ order.appFee }}</td>
                  <td>{{ order.orderCost }}</td>
                  <td>{{ order.totalCost }}</td>
                  <td>
                    <span class="action-icon">
                      <router-link
                        :to="{
                          name: 'CurrentOrderEdit',
                          params: { id: order.orderID },
                        }"
                      >
                        <font-awesome-icon icon="fa-edit" />
                      </router-link>
                    </span>
                    <span class="action-icon">
                      <router-link
                        :to="{
                          name: 'CurrentOrderDelete',
                          params: { id: order.orderID },
                        }"
                      >
                        <font-awesome-icon icon="fa-trash" />
                      </router-link>
                    </span>
                  </td>
                </tr>
              </template>
              <template v-else-if="filterCriteria === 'storeFirst'">
                <tr
                  v-for="order in filteredOrders2"
                  :key="'order2-' + order.id"
                >
                  <td>{{ order.id }}</td>
                  <td>{{ order.description }}</td>
                  <td>{{ order.senderName }}</td>
                  <td>{{ order.senderPhone }}</td>
                  <td>{{ order.receiverName }}</td>
                  <td>{{ order.receiverPhone }}</td>
                  <td>{{ order.orderStatus }}</td>
                  <td>{{ order.receivingDateTime }}</td>
                  <td>{{ order.leavingDateTime }}</td>
                  <td>{{ order.storeID }}</td>
                  <td>{{ order.orderSize }}</td>
                  <td>{{ order.inventoryFee }}</td>
                  <td>{{ order.appFee }}</td>
                  <td>{{ order.orderCost }}</td>
                  <td>{{ order.totalCost }}</td>
                  <td>
                    <span class="action-icon">
                      <router-link
                        :to="{
                          name: 'CurrentOrderInventoryEdit',
                          params: { id: order.id },
                        }"
                      >
                        <font-awesome-icon icon="fa-edit" />
                      </router-link>
                    </span>
                    <span class="action-icon">
                      <router-link
                        :to="{
                          name: 'CurrentOrderInventoryDelete',
                          params: { id: order.id },
                        }"
                      >
                        <font-awesome-icon icon="fa-trash" />
                      </router-link>
                    </span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Header from "@/components/HeaderVue.vue";
import SideBar from "@/components/SideVue.vue";

export default {
  components: {
    FontAwesomeIcon,
    Header,
    SideBar,
  },
  data() {
    return {
      orders1: [],
      orders2: [],
      totalOrders1: 0,
      totalOrders2: 0,
      filterCriteria: "deliveryOnly", // Default filter criteria set to "Delivery Only"
      oldestFirst: true, // Default sorting order
    };
  },
  computed: {
    // Filtered orders based on criteria
    filteredOrders1() {
      if (
        this.filterCriteria === "deliveryOnly" ||
        this.filterCriteria === "All"
      ) {
        return this.orders1;
      } else {
        return [];
      }
    },
    filteredOrders2() {
      if (
        this.filterCriteria === "storeFirst" ||
        this.filterCriteria === "All"
      ) {
        return this.orders2;
      } else {
        return [];
      }
    },
  },
  mounted() {
    // Fetch data for delivery only orders
    fetch("https://localhost:44330/api/AdminHome/current-orders")
      .then((res) => res.json())
      .then((data) => {
        this.orders1 = data;
        this.totalOrders1 = this.orders1.length;
      })
      .catch((err) =>
        console.error("Error fetching delivery only orders:", err)
      );

    // Fetch data for store first orders
    fetch("https://localhost:44330/api/AdminHome/current-orderinventory")
      .then((res) => res.json())
      .then((data) => {
        this.orders2 = data;
        this.totalOrders2 = this.orders2.length;
      })
      .catch((err) => console.error("Error fetching store first orders:", err));
  },
  methods: {
    filterOrders(criteria) {
      this.filterCriteria = criteria;
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Adjust height as needed */
}

.main-content {
  display: grid;
       grid-template-columns: auto 1fr; 
       
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);
  display: flex;
  width: 100%;}

.content-list {
  margin: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  padding: 1px;
  border: 1px solid #fff;
  background-color: #007c4f;
  width: 100%;
}

.content {
  padding: 30px;
  border-radius: 5px;
  color: #2f3b37;
  margin: 0 5px 0 50px;
  text-align: center;
  display: flex; /* For horizontal centering of table (optional) */
  flex-direction: column;
  align-items: center; /* Vertically center table within content (optional) */
  overflow-y: auto; /* Add vertical scroll for the entire content section */
}

.content table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

.content-table-container {
  overflow-x: auto; /* Keep horizontal scroll for table */
  max-height: 70vh; /* Limit max height and enable vertical scroll */
  width: 100%;
}

thead,
tbody {
  display: table-header-group; /* Consistent header and body grouping */
}

tr {
  display: table-row;
  border-bottom: 1px solid #ddd;
}

th,
td {
  padding: 13px;
  flex: 1 1 20%; /* Maintain even column width */
  text-align: center;
  font-size: 18px;
}

thead th {
  background-color: #007c4f;
  color: #ddd;
  font-weight: bold;
}

.content th,
.content td {
  font-family: "Times New Roman", Times, serif;
}

.content-buttons {
  margin: 10px 20px;
  border: 8px solid #fff;
  border-radius: 10px;
}

.content-buttons button {
  background-color: #fff;
  cursor: pointer;
  border: none;
}

.content-buttons button:hover {
  background-color: #007c4f;
  color: #f2f2f2;
  border-radius: 4px;
  cursor: pointer;
}

.action-icon {
  margin-left: 5px;
}
</style>
