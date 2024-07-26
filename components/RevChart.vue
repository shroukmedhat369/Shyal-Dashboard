<template>

        <canvas id="monthly-rev-chart"></canvas>
        <router-link to="/RevMain" class="see-more">See More</router-link>
     
</template>

<script>
import Chart  from 'chart.js/auto';
import axios from 'axios';

export default {
  data() {
    return {
      monthlyData: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const currentYear = new Date().getFullYear();
      try {
        const response = await axios.get(`https://localhost:44330/api/AdminHome/Annual-Revenue?Year=${currentYear}`);
        this.monthlyData = response.data.slice(0, 6); // Getting only the first 6 months
        this.renderChart2();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    renderChart2() {
      const ctx = document.getElementById('monthly-rev-chart').getContext('2d');
      const labels = this.monthlyData.map(monthData => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return monthNames[monthData.month - 1];
      });
      const data = this.monthlyData.map(monthData => monthData.totalMonthlyRev);
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Monthly Revenue',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(158, 252, 158)',
            borderWidth: 1,
            tension: 0.5
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              ticks: {
                color: 'white' // Change color of x-axis labels to black
              }
            },
            y: {
              ticks: {
                color: 'white', // Change color of y-axis labels to black
                beginAtZero: true // Ensure y-axis starts from zero
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'white' // Set label color to black
              }
            }
          }
        }
      });
    }
  }
  }


</script>

<style scoped>
.see-more {
  font-size: 24px;
    color: #007C4F;
    font-weight: 900;
    text-decoration: none;
    position: relative;
    top: 20px;

}
#monthly-rev-chart{
  background-color: #007C4F;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
   width: 480px;
}

</style>