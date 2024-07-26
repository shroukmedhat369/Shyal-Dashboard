<template>
  <hea :selectedView="selectedView"></hea>
  <div class="container1">
    <sid @view-selected="updateSelectedView"></sid>

    <div class="content">
      <div class="form-container">
        <div class="container">
          <div class="box-container">
            <div class="box">
              <label for="month">Month</label>
              <select id="month" v-model="selectedMonth" class="custom-select">
                <option value="" disabled selected>Please select</option>
                <option v-for="month in months" :key="month.month" :value="month.month">{{ month.month }}</option>
              </select>
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="year">Year</label>
              <input type="text" id="year" v-model="year" placeholder="Enter Year">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="rent">Rent</label>
              <input type="text" id="rent" v-model="rent" placeholder="Enter Rent">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="salary">Salary</label>
              <input type="text" id="salary" v-model="salary" placeholder="Enter Salary">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="marketing">Marketing</label>
              <input type="text" id="marketing" v-model="marketing" placeholder="Enter Marketing">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="maintenance">Maintenance</label>
              <input type="text" id="maintenance" v-model="maintenance" placeholder="Enter Maintenance">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="otherExpense">Other Expense</label>
              <input type="text" id="otherExpense" v-model="otherExpense" placeholder="Enter Other Expense">
            </div>
          </div>

          <div class="button-container">
            <button @click="goBack" class="back-button">Back</button>
            <button @click="editExpense" class="edit-expense-button">Edit Monthly Expense</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hea from '../components/HeaderFinance.vue';
import sid from '../components/FinanceSide.vue';
import axios from 'axios'; // Import Axios library
import { mapGetters } from 'vuex';

export default {
  components: {
    hea, sid
  },
  data() {
    return {
      selectedView: 'Expense Edit', // Default view
      selectedMonth: '',
      year: '',
      rent: '',
      salary: '',
      marketing: '',
      maintenance: '',
      otherExpense: '',
      months: [
        { month: 1 }, { month: 2 }, { month: 3 }, { month: 4 }, { month: 5 }, { month: 6 },
        { month: 7 }, { month: 8 }, { month: 9 }, { month: 10 }, { month: 11 }, { month: 12 }
      ]
    };
  },
  computed: {
    ...mapGetters(['getToken']) // Map the getToken getter
  },
  created() {
    const year = this.$route.params.year;
    const month = this.$route.params.month;
    this.fetchExpenseData(year, month);
  },
  methods: {
    goBack() {
      window.location.href = '/ExpMainmanager';
    },
    editExpense() {
      const requestBody = {
        month: parseInt(this.selectedMonth),
        year: parseInt(this.year),
        rent: parseInt(this.rent),
        salary: parseInt(this.salary),
        marketing: parseInt(this.marketing),
        maintenance: parseInt(this.maintenance),
        otherExpense: parseInt(this.otherExpense)
      };

      const token = this.getToken;

      axios.put(`https://localhost:44330/api/AdminHome/UpdateExpense?Year=${this.year}`, requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          alert('Data updated successfully!');
          // Clear form fields after updating expense
          this.selectedMonth = '';
          this.year = '';
          this.rent = '';
          this.salary = '';
          this.marketing = '';
          this.maintenance = '';
          this.otherExpense = '';
        })
        .catch(error => {
          console.error('Error updating monthly expense:', error);
        });
    },
    updateSelectedView(view) {
      this.selectedView = view;
    },
    fetchExpenseData(year, month) {
      const token = this.getToken;

      axios.get(`https://localhost:44330/api/AdminHome/expenses/${year}/${month}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          const expenseData = response.data;
          this.selectedMonth = expenseData.month;
          this.year = expenseData.year;
          this.rent = expenseData.rent;
          this.salary = expenseData.salary;
          this.marketing = expenseData.marketing;
          this.maintenance = expenseData.maintenance;
          this.otherExpense = expenseData.otherExpense;
        })
        .catch(error => {
          console.error('Error fetching expense data:', error);
        });
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

.form-container {
  position: absolute;
  top: 55%;
  left: 60%;
  border-radius: 10px;
  background-color: rgb(255, 255, 255); /* Semi-transparent white background */
  width: 50%;
  background-image: url('../assets/Screenshot\ 2024-04-24\ 032316.jpeg');
  transform: translate(-50%, -50%);
}

.container {
  border: 2px solid #176B4C;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.box-container {
  width: calc(50% - 20px);
}

.box {
  padding: 20px;
  background-color: #1D6E53;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(239, 235, 235, 0.1);
  transition: background-color 0.3s, transform 0.3s;
}

.box label {
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  display: block;
}

.box input {
  width: calc(100% - 20px);
  padding: 8px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  background-color: transparent;
  transition: box-shadow 0.3s ease;
  color: #fff;
}

/* Change the color of the placeholder text */
.box input::placeholder {
  color: #ccc;
}

/* Change the shadow when input is focused */
.box input:focus {
  box-shadow: 0px 4px 8px rgba(229, 221, 221, 0.2);
}

/* Hover effect */
.box:hover {
  background-color: #03422D;
  transform: translateY(-5px);
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.back-button,
.edit-expense-button {
  padding: 12px 30px;
  font-size: 16px;
  background-color: #03422D;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.back-button:hover,
.edit-expense-button:hover {
  background-color: #176B4C;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.custom-select {
  width: calc(100% - 20px);
  padding: 8px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  background-color: transparent;
  transition: box-shadow 0.3s ease;
  color: #ffffff; /* Change text color to black */
}

.custom-select option {
  background-color: #fff; /* Change background color of options */
  color: #000000; /* Change text color of options */
}

/* Change the color of the placeholder text */
.custom-select::placeholder {
  color: #000; /* Change placeholder color to black */
}

@media (max-width: 768px) {
  .form-container {
    width: 70%;
  }
}

@media (max-width: 576px) {
  .form-container {
    width: 90%;
  }
}
</style>
