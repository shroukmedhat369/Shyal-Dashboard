<template>
  <div>
    <hea :selectedView="selectedView"></hea>
    <div class="container">
      <sid @view-selected="updateSelectedView"></sid>
      <div class="content">
        <div>
          <input type="text" v-model="selectedYearInput" placeholder="Enter Year">
          <button @click="fetchExpenseData(selectedYearInput)">Fetch Data</button>
        </div>
        <table v-if="expenseData[selectedYear] && expenseData[selectedYear].length > 0">
          <thead>
            <tr>
              <th>Month</th>
              <th>Rent</th>
              <th>Salary</th>
              <th>Marketing</th>
              <th>Maintenance</th>
              <th>Other Expenses</th>
              <th>Total Monthly Expense</th>
              <th>Total Accumulated Expense</th>
              <th>Actions</th> <!-- Added Actions column -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(monthData, index) in expenseData[selectedYear]" :key="index">
              <td>{{ monthNames[monthData.month - 1] }}</td>
              <td>{{ monthData.rent }}</td>
              <td>{{ monthData.salary }}</td>
              <td>{{ monthData.marketing }}</td>
              <td>{{ monthData.maintenance }}</td>
              <td>{{ monthData.otherExpense }}</td>
              <td>{{ monthData.totalMonthlyExpense }}</td>
              <td>{{ calculateAccumulatedExpense(index) }}</td>
              <td>
                <router-link class="button"
                      :to="{
                        name: 'ExpEditman',
                        params: { year : monthData.year,month: monthData.month  },
                      }"
                    >Edit
                    </router-link>
              <router-link class="button"
                      :to="{
                        name: 'ExpDeleteman',
                        params: { year : monthData.year ,month: monthData.month },
                      }"
                    >Delete
                    </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>
          <p>No expense data available for the selected year.</p>
        </div>
        <button class="back" @click="goBack">Back</button>
        <button @click="addNewMonth">Add New Month Expense</button>
      </div>
    </div>
  </div>
</template>

<script>
import hea from '../components/HeaderFinance.vue';
import sid from '../components/FinanceSide.vue';
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  components: {
    hea,
    sid
  },
  data() {
    return {
      selectedView: 'Expense', // Default view
      selectedYear: 2024, // Default selected year
      years: [],
      expenseData: {},
      monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
    };
  },
  computed: {
    ...mapGetters(['getToken']) // Map the getToken getter
  },
  mounted() {
    // Fetch initial expense data for the default year
    this.fetchExpenseData(this.selectedYear);
  },
  methods: {
    updateSelectedView(view) {
      this.selectedView = view;
    },
    goBack() {
      window.location.href='/FinanceManager';
    },
    fetchExpenseData(year) {
      this.selectedYear = year;
      const token = this.getToken;

      axios.get(`https://localhost:44330/api/AdminHome/Annual-expense?Year=${year}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          this.expenseData[year] = res.data;
        })
        .catch(error => {
          console.error('Error fetching expense data:', error);
        });
    },
    calculateAccumulatedExpense(index) {
      let accumulatedExpense = 0;
      const yearData = this.expenseData[this.selectedYear];
      if (yearData && yearData[index]) {
        accumulatedExpense = yearData.slice(0, index + 1).reduce((total, month) => total + month.totalMonthlyExpense, 0);
      }
      return accumulatedExpense;
    },
    addNewMonth() {
      // Logic to add a new month's expense
      window.location.href = '/ExpAddmanager';
    },
    editExpense(monthData) {
      // Placeholder method for editing expense
      console.log('Editing expense:', monthData);
      // Implement edit functionality as needed
    },
    deleteExpense(monthData) {
      // Placeholder method for deleting expense
      console.log('Deleting expense:', monthData);
      // Implement delete functionality using an API call
    }
  }
};
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: auto 1fr;
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);
 
  width: 100%;
}

.content {
  padding: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
  color: #ffffff;
  background-color: #007C4F;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
}

th {
  border-bottom: 1px solid #7ba597;
  padding: 8px;
  text-align: left;
}

td {
  padding: 8px;
  border: none;
}

button , .button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007c4f;
  color: #fff;
  cursor: pointer;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  font-size: medium;
}

input {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #000000;
  color: #fff;
  cursor: pointer;
  border: none;
  cursor: pointer;
  margin-right: 60px;
  margin-bottom: 10px;
  border-radius: 20px;
  font-size: medium;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.back {
  width: 150px;
  margin-right: 90px;
}
</style>