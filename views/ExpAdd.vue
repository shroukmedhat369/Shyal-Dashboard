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
                <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
              </select>
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="year">Year</label>
              <input type="text" id="year" v-model="selectedYear" placeholder="Please enter Year">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="rent">Rent</label>
              <input type="text" id="rent" v-model="rent" placeholder="Please enter Rent">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="salary">Salary</label>
              <input type="text" id="salary" v-model="salary" placeholder="Please enter Salary">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="marketing">Marketing</label>
              <input type="text" id="marketing" v-model="marketing" placeholder="Please enter Marketing">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="maintenance">Maintenance</label>
              <input type="text" id="maintenance" v-model="maintenance" placeholder="Please enter Maintenance">
            </div>
          </div>
          <div class="box-container">
            <div class="box">
              <label for="otherExpense">Other Expense</label>
              <input type="text" id="otherExpense" v-model="otherExpense" placeholder="Please enter Other Expense">
            </div>
          </div>
          <div class="button-container">
            <button @click="goBack" class="back-button">Back</button>
            <button @click="addExpense" class="add-expense-button">Add Current Month Exp.</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hea from '../components/HeaderVue.vue';
import sid from '../components/SideVue.vue';
import axios from 'axios'; // Import Axios library
import { mapGetters } from 'vuex';

export default {
  components: {
    hea, sid
  },
  data() {
    return {
      selectedView: 'Expenses', // Default view
      selectedMonth: '',
      selectedYear: '', // Add selectedYear to data
      rent: '',
      salary: '',
      marketing: '',
      maintenance: '',
      otherExpense: '',
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
    };
  },
  computed: {
    ...mapGetters(['getToken']) // Map the getToken getter
  },
  methods: {
    goBack() {
      window.location.href = '/ExpenseMain';
    },
    addExpense() {
      const requestBody = {
        month: parseInt(this.selectedMonth),
        year: parseInt(this.selectedYear), // Add year to requestBody
        rent: parseInt(this.rent),
        salary: parseInt(this.salary),
        marketing: parseInt(this.marketing),
        maintenance: parseInt(this.maintenance),
        otherExpense: parseInt(this.otherExpense)
      };

      const token = this.getToken;

      axios.post('https://localhost:44330/api/AdminHome/AddMonthlyExpense', requestBody, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          alert('Data added successfully!');
          // Clear form fields after adding expense
          this.selectedMonth = '';
          this.selectedYear = ''; // Clear the year field
          this.rent = '';
          this.salary = '';
          this.marketing = '';
          this.maintenance = '';
          this.otherExpense = '';
        })
        .catch(error => {
          console.error('Error adding monthly expense:', error);
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

.form-container {
  position: absolute;
  top: 80%;
  left: 60%;
  border-radius: 10px;
  background-color: rgba(3, 110, 2, 0.923); /* Semi-transparent white background */
  width: 50%;
  transform: translate(-50%, -50%);
  background-image: url('../assets/Screenshot\ 2024-04-24\ 032316.jpeg');
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

.buttoncontainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.back-button,
.add-expense-button {
  padding: 12px 30px;
  font-size: 16px;
  background-color: #03422D;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.back-button {
  position: static;
}

.back-button:hover,
.add-expense-button:hover {
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
