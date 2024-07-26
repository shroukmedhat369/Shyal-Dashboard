<template>
    <div class="chart">
    <canvas id="Annually-rev-chart"></canvas>
    </div>
</template>

<script>
  import Chart from 'chart.js/auto';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        annualData: [],
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
    this.annualData = response.data;
    this.renderChart();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
},
renderChart() {
  const ctx = document.getElementById('Annually-rev-chart').getContext('2d');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels = this.annualData.map(data => monthNames[data.month - 1]);
  const data = this.annualData.map(data => data.totalMonthlyRev);
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Annual Revenue',
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
            color: 'white' // Change color of x-axis labels to white
          }
        },
        y: {
          ticks: {
            color: 'white', // Change color of y-axis labels to white
            beginAtZero: true // Ensure y-axis starts from zero
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white' // Set legend label color to white
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

#Annually-rev-chart {
    background-color: #007C4F;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    width: inherit;
        height: 250px;
}
.chart{
    
      widows: 60%;
        height: 250px;
      
}
</style>
