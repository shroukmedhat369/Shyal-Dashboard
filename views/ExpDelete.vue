<template>
  <hea :selectedView="selectedView"></hea>
  <div class="container1">
    <sid @view-selected="updateSelectedView"></sid>
    <div class="content">
      <div class="delete-item-container">
        <h2>Delete Expense</h2>
        <p>
          Are you sure you want to delete the expense for {{ this.$route.params.year }} and {{ this.$route.params.month }}?
        </p>
        <div class="action-buttons">
          <button class="btn-left" @click="deleteExpense">Delete</button>
          <button class="btn-right" @click="goBack">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import hea from '../components/HeaderVue.vue';
import sid from '../components/SideVue.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    hea, sid
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    goBack() {
      this.$router.push("/ExpenseMain");
    },
    deleteExpense() {
      const token = this.getToken;
      const year = this.$route.params.year;
      const month = this.$route.params.month;

      axios.delete(`https://localhost:44330/api/AdminHome/DeleteExpense?year=${year}&month=${month}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        alert('Expense deleted successfully!');
        this.$router.push("/ExpenseMain"); // Redirect to expenses page after deletion
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
      });
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

.delete-item-container {
  padding: 20px;
  border: 1px solid #1a927a;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  min-width: 120px;
  min-height: 40px;
  margin: 0 5px;
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
