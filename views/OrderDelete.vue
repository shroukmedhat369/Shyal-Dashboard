<template>
  <div class="app-container">
    <Header />

    <main class="main-content">
      <SideBar />
      <section class="content">
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
      order: null,
    };
  },
  mounted() {
    axios.get("https://localhost:44330/api/Customer/orders").then((res) => {
      this.order = res.data.find(
        (order) => order.orderID === this.$route.params.id
      );
    });
  },

  methods: {
    goBack() {
      this.$router.push("/orders");
    },
    deleteOrder() {
      axios
        .delete(
          `https://localhost:44330/api/Customer/orders/delete/${this.$route.params.id}`
        )
        .then(() => {
          this.$router.push("/orders");
        })
        .catch((err) => {
          console.error("Error deleting item:", err);
        });
    },
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
  background: #f15e5e;
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
