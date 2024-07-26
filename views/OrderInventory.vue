<template>
  <div class="app-container">
    <Header />

    <main class="main-content">
      <SideBar></SideBar>
      <section class="content">
        <div class="card-container">
          <div
            class="card"
            v-for="orderStatus in orderStatuses"
            :key="orderStatus"
            @click="filterOrders(orderStatus)"
          >
            <h2>
              <span :class="{ active: orderStatus === selectedStatus }"
                >{{ orderStatus }} Orders ({{
                  getOrderCount(orderStatus)
                }})</span
              >
            </h2>
          </div>
        </div>
        <div class="content-list">
          <div class="total-orders">
            <button @click="filterOrders('All')">Total Orders</button>
          </div>

          <div class="sort-by-date">
            <button @click="toggleSort('orderDate')">
              <span v-if="oldestFirst">Oldest First </span>
              <span v-else>Newest First </span>
            </button>
          </div>
        </div>
        <div class="content-table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Description</th>
                <th>Customer ID</th>
                <th>Sender Name</th>
                <th>Sender Phone</th>
                <th>Receiver Name</th>
                <th>Receiver Phone</th>
                <th>Sender AddressID</th>
                <th>Receiver AddressID</th>
                <th>Sending DriverID</th>
                <th>Receiving DriverID</th>
                <th>Receiving DateTime</th>
                <th>Leaving DateTime</th>
                <th>Store ID</th>
                <th>Order Size</th>
                <th>Order Status</th>
                <th>Inventory Fee</th>
                <th>App Fee</th>
                <th>Order Cost</th>
                <th>Total Cost</th>
                <th>Actions</th>
                <th>Assign Driver</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!displayedOrders.length">
                <td colspan="10" class="text-center">Loading Orders...</td>
              </tr>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.description }}</td>
                <td>{{ order.customerID }}</td>
                <td>{{ order.senderName }}</td>
                <td>{{ order.senderPhone }}</td>
                <td>{{ order.receiverName }}</td>
                <td>{{ order.receiverPhone }}</td>
                <td>{{ order.senderAddressID }}</td>

                <td>{{ order.receiverAddressID }}</td>
                <td>{{ order.sendingDriverID }}</td>
                <td>{{ order.receivingDriverID }}</td>
                <td>{{ order.receivingDateTime }}</td>
                <td>{{ order.leavingDateTime }}</td>
                <td>{{ order.storeID }}</td>
                <td>{{ order.orderSize }}</td>
                <td>{{ order.orderStatus }}</td>
                <td>{{ order.inventoryFee }}</td>
                <td>{{ order.appFee }}</td>
                <td>{{ order.orderCost }}</td>
                <td>{{ order.totalCost }}</td>
                <!-- Inside the <tr> loop where you display orders -->
                <td>
                  <span class="action-icon">
                    <router-link
                      :to="{
                        name: 'OrderInventoryEdit',
                        params: { id: order.id },
                      }"
                    >
                      <font-awesome-icon icon="fa-edit" />
                    </router-link>
                  </span>

                  <span class="action-icon">
                    <router-link
                      :to="{
                        name: 'DeleteOrderInventory',
                        params: { id: order.id },
                      }"
                    >
                      <font-awesome-icon icon="fa-trash" />
                    </router-link>
                  </span>
                </td>
                <td>
                  <button
                    class="assign"
                    :disabled="assignedDrivers.includes(order.id)"
                    @click="assignDriver(order.id)"
                  >
                    Assign Driver
                  </button>
                </td>
              </tr>
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
import axios from "axios";
import { mapGetters } from 'vuex';

export default {
  components: {
    FontAwesomeIcon,
    Header,
    SideBar,
  },
  data() {
    return {
      displayedOrders: [],
      selectedStatus: "All",
      filteredOrders: [],
      orderStatuses: ["Pending", "Ready", "Completed"],
      assignedDrivers: [], // New property to track assigned drivers
      deliveryFilter: false,
      storeFirstFilter: false,
      oldestFirst: false,
      sortField: "createdAt",
      sortOrder: "asc",
    };
  },

  mounted() {
    this.fetchOrders();
  },

  methods: {
    fetchOrders() {
      axios
        .get("https://localhost:44330/api/AdminHome/GetAll-orderinventory")
        .then((res) => {
          this.displayedOrders = res.data;
          this.filteredOrders = this.displayedOrders.slice();
        })
        .catch((err) => console.error("Error fetching orders:", err));
    },

    filterOrders(orderStatus) {
      this.selectedStatus = orderStatus;
      if (orderStatus === "All") {
        this.filteredOrders = this.displayedOrders.slice();
        this.oldestFirst = false; // Reset sort for "All"
      } else if (orderStatus === "Pending") {
        axios
          .get("https://localhost:44330/api/AdminHome/OrderInventory/pending") // Replace with your endpoint
          .then((res) => {
            this.filteredOrders = res.data;
          })
          .catch((err) => console.error("Error fetching pending orders:", err));
      } else if (orderStatus === "Ready") {
        // Use your specific API endpoint for fetching ready orders
        axios
          .get("https://localhost:44330/api/AdminHome/OrderInventory/ready") // Replace with your endpoint
          .then((res) => {
            this.filteredOrders = res.data;
          })
          .catch((err) => console.error("Error fetching ready orders:", err));
      } else if (orderStatus === "Completed") {
        // Use your specific API endpoint for fetching completed orders
        axios
          .get("https://localhost:44330/api/AdminHome/OrderInventory/completed") // Replace with your endpoint
          .then((res) => {
            this.filteredOrders = res.data;
          })
          .catch((err) =>
            console.error("Error fetching completed orders:", err)
          );
      } else {
        this.filteredOrders = this.displayedOrders.filter(
          (order) => order.orderStatus === orderStatus
        );
      }
    },

    getOrderCount(orderStatus) {
      if (orderStatus === "All") {
        return this.displayedOrders.length;
      } else {
        // Check for "Pending" status specifically
        if (orderStatus === "Pending") {
          return this.displayedOrders.filter(
            (order) => String(order.orderStatus) === "0"
          ).length;
        } else {
          if (orderStatus === "Ready") {
            return this.displayedOrders.filter(
              (order) => String(order.orderStatus) === "1"
            ).length;
          } else {
            if (orderStatus === "Completed") {
              return this.displayedOrders.filter(
                (order) => String(order.orderStatus) === "2"
              ).length;
            }
          }
        }
      }
    },
    toggleSort(field) {
      this.oldestFirst = !this.oldestFirst;
      this.sortField = field;

      const order = this.oldestFirst ? -1 : 1;

      this.filteredOrders.sort((a, b) => {
        switch (field) {
          case "receivingDateTime":
            return (
              order *
              (new Date(a.receivingDateTime) - new Date(b.receivingDateTime))
            );
          case "customerID":
            return order * (a.customerID - b.customerID);
          default:
            return 0;
        }
      });

      this.$forceUpdate();
    },

    assignDriver(orderId) {
      const endpoint = `https://localhost:7255/api/AdminHome/assign-driver/${orderId}`;
      axios
        .put(endpoint)
        .then((res) => {
          console.log("Driver assigned successfully:", res.data);
          this.assignedDrivers.push(orderId); // Add order ID to assignedDrivers array
          this.fetchOrders();
        })
        .catch((err) => console.error("Error assigning driver:", err));
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 130vh;
}

.main-content {
  display: grid;
       grid-template-columns: auto 1fr; 
       
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);
  display: flex;
  width: 100%;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-right: 30px;
}

.card {
  padding: 25px;
  border: 3px solid #1a927a;
  border-radius: 5px;
  cursor: pointer;
  margin: 15px 10px; /* Adjusted margin for consistency */
  width: 300px; /* Set a fixed width */
  height: 150px; /* Set a fixed height */
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box; /* Ensure padding and border are included in the size */
}

.card:hover {
  background-color: #f2f2f2;
}

.card span {
  font-family: Lato;
  font-size: 30px;
}

.card span.active {
  color: #479077;
}

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
  background-color: #fff;
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
  width: 100%;
}

thead,
tbody {
  display: table-header-group; /* Consistent header and body grouping */
}

tr {
  display: table-row;
  border-bottom: 1px solid #ddd;
  scroll-snap-align: start;
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

.content-buttons,
.content-list .sort-by-date,
.content-list .total-orders {
  margin: 10px 20px;
  border: 4px solid #fff;
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
  border: 2px solid #007c4f;

  border-radius: 8px;
}

.content-list .sort-by-date button {
  background-color: #fff;
  cursor: pointer;
  border: none;
}
.content-list .sort-by-date button:hover {
  background-color: #007c4f;
  color: #f2f2f2;
  border: 2px solid #007c4f;

  border-radius: 8px;
}
.content-list .total-orders button {
  background-color: #fff;
  cursor: pointer;
  border: none;
}
.content-list .total-orders button:hover {
  background-color: #007c4f;
  color: #f2f2f2;
  border: 2px solid #007c4f;

  border-radius: 8px;
}
.action-icon {
  margin-right: 10px;
}
.assign {
  background-color: #1a927a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.assign:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.assign:hover:not(:disabled) {
  background-color: #167a64;
}

.text-center {
  text-align: center;
}
.action-icon font-awesome-icon {
  cursor: pointer;
}

.assign {
  background: #007c4f;
  border: none;
  color: #fff;
  padding: 10px;
  width: 100px;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .main-content {
    grid-template-columns: 100%;
  }
  .content {
    padding: 20px;
    font-size: 14px;
  }

  .content th,
  .content td {
    padding: 8px;
    font-size: 16px;
  }
  .content table {
    width: 100%;
  }

  .content th,
  .content td {
    flex: 1 0 auto;
  }
  .card-container {
    flex-wrap: wrap;
  }

  .card {
    width: calc(50% - 20px);
    margin: 10px;
  }
  .pagination button {
    padding: 10px 20px;
  }

  .content-buttons button,
  .content-list .sort-by-date button,
  .content-list .total-orders button {
    padding: 8px 15px;
  }
}
</style>
