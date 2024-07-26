<template>
  <hea :selectedView="selectedView"></hea>
   <div class="container">
     <sid @view-selected="updateSelectedView"></sid>

     <div class="content">
       <section class="section">
         <div class="box">
   <h2>Total Annual Revenue</h2>
   <p>{{ totalAnnualRevenue }}</p>
        </div>
        <div>
        <chart1/>
        <router-link to="/RevMainmanager" class="see-more">See More</router-link>
       </div>

       </section>
       <section class="section">
         <div class="box">
           
   <h2>Total Annual Expenses</h2>
   <p>{{ totalAnnualExpense }}</p>
 
        </div>
        
         <chart2/>

        
        

       </section >
       <router-link to="/ExpMainmanager" class="see-more exp">See More</router-link>

       <section class="section dis ">
         <div class="third">
           <Chart3/>
           
         </div>

         <p><router-link to="/ProfitManager" class="see-more">See More</router-link></p>
         

       </section>



       </div>
   </div>
 </template>
 
 
<script>
import axios from 'axios';

import hea from '../components/HeaderFinance.vue';
import sid from '../components/FinanceSide.vue';
import Chart1 from '../components/AnnualRev.vue';
import Chart2 from '../components/AnnualExp.vue';
import Chart3 from '../components/ProfitChart.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    Chart1, Chart2, Chart3, hea, sid
  },
  data() {
    return {
      selectedView: 'Finance',
      totalAnnualRevenue: 0,
      totalAnnualExpense: 0,
      currentYear: new Date().getFullYear() // Get the current year
    };
  },
  computed: {
    ...mapGetters(['getToken']) // Replace 'getToken' with your actual getter name
  },
  methods: {
    updateSelectedView(view) {
      this.selectedView = view;
    },
    calculateTotalAnnualRevenue(data) {
      let totalRev = 0;
      data.forEach(monthData => {
        totalRev += monthData.totalMonthlyRev;
      });
      this.totalAnnualRevenue = totalRev;
    },
    calculateTotalAnnualExpense(data) {
      let totalExp = 0;
      data.forEach(monthData => {
        totalExp += monthData.totalMonthlyExpense;
      });
      this.totalAnnualExpense = totalExp;
    }
  },
  mounted() {
    const token = this.getToken; // Retrieve token from Vuex store

    // Fetch revenue data from API
    axios.get(`https://localhost:44330/api/AdminHome/Annual-Revenue?Year=${this.currentYear}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include token in the headers
      }
    })
    .then(response => this.calculateTotalAnnualRevenue(response.data))
    .catch(error => console.error('Error fetching revenue data:', error));

    // Fetch expense data from API
    axios.get(`https://localhost:44330/api/AdminHome/Annual-Expense?Year=${this.currentYear}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include token in the headers
      }
    })
    .then(response => this.calculateTotalAnnualExpense(response.data))
    .catch(error => console.error('Error fetching expense data:', error));
  }
};
</script>

 <style scoped>
 .container{
  display: grid;
  grid-template-columns: auto 1fr; 
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);
  display: flex;
  width: 100%;
}
 .sidebar{
  height: auto;
 }
 .exp{
   position: relative;
   bottom: 100px;
   left: 250px;
 }

 .see-more {
   font-size: 24px;
   color: #007C4F;
   font-weight: 900;
   text-decoration: none;
}
 .box {
   background-color: #007C4F;
   border-radius: 8px;
   text-align: center;
   color: #ffffff;
   margin: 60px;
   margin-right: 50px;
   padding: 20px;

   box-shadow: 0px 0px 10px 0px rgba(76, 199, 123, 0.75);
   font-family: 'Inter', sans-serif;
   flex: 1 0 200px;
   }
   
.container {
     display: grid;
     grid-template-columns: auto 1fr; /* Sidebar takes auto width, content takes remaining space */
   }
   .content {
     padding: 20px;
   }
   .section{
   display: flex;
     margin-bottom: 90px;
     margin-top: 50px;
     justify-content: center;
   }
   .dis{
     display: block;
   }
   
     .exp{
       margin-right: 50px;
       height: fit-content;
     }
     .third{
       position: relative;
   right: -19%;
       
       background-color: #007C4F;
   border-radius: 8px;
   text-align: center;
   /* margin: 100px; */
   /* margin-right: 50px; */
   padding: 20px;
   width: 600px;
   height: 400px;
   box-shadow: 0px 0px 10px 0px rgba(76, 199, 123, 0.75);
   font-family: 'Inter', sans-serif;

  

     }

     @media (max-width: 768px) {
   .container {
     grid-template-columns: 1fr; /* Switch to a single column layout */
   }
   .section {
     flex-direction: column; /* Stack sections vertically on smaller screens */
     align-items: center; /* Center content in each section */
     margin-bottom: 40px; /* Decrease margin between sections */
   }
   .box {
     margin: 20px 0; /* Adjust margin for smaller screens */
   }
   .exp {
     margin-right: 0; /* Remove right margin on smaller screens */
   }
   .third {
     width: 100%; /* Make the third section occupy full width on smaller screens */
     margin-right: 0; /* Remove margin on smaller screens */
   }
 }
 </style>