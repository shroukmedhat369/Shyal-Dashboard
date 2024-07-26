<template>
  <hea :selectedView="selectedView"></hea>
  <div class="container1">
    <sid @view-selected="updateSelectedView"></sid>
    <div class="content">
      <div class="delete-order-container">
        <h2>Delete Order</h2>
        <p>
          Are You Sure You Want To Delete The Order With ID
          {{ this.$route.params.id }}?
        </p>
        <div class="form-buttons">
          <button class="btn-left" @click="deleteOrder">Delete</button>
          <button class="btn-right" @click="goBack">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import hea from "../components/HeaderVue.vue";
import sid from "../components/SideVue.vue";
export default {
  components: {
    FontAwesomeIcon,
    hea,
    sid,
  },

  data() {
    return {
      order: null,
      selectedView: "Current Orders",
    };
  },
  mounted() {
    axios
      .get("https://localhost:44330/api/AdminHome/current-orders")
      .then((res) => {
        this.order = res.data.find(
          (order) => order.id === this.$route.params.id
        );
      });
  },

  methods: {
    goBack() {
      this.$router.push("/CurrentOrders");
    },
    updateSelectedView(view) {
      this.selectedView = view;
    },
    deleteOrder(id) {
      axios
        .delete(
          `https://localhost:44330/api/AdminHome/Deletecurrentorder/${this.$route.params.id}`
        )
        .then(() => {
          this.$router.push("/CurrentOrders");
        })
        .catch((err) => {
          console.error("Error deleting item:", err);
        });
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

h2 {
  text-align: center;
  font-size: 26px;
  margin: 20px;
}
p {
  margin: 20px;
}
.delete-order-container {
  padding: 20px;
  border: 1px solid #1a927a;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-left {
  border-radius: 10px;
  padding: 10px;
  width: 200px;
  font-size: 16px;
  background: #007c4f;
  border: none;
  color: #fff;
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

.btn-left:hover,
.btn-left:focus {
  background: #ee3535;
}
</style>
