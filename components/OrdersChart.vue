<template>
  <canvas id="monthly-orders-chart"></canvas>
  <router-link to="/orders" class="see-more">See More</router-link>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios'; // Import Axios library

export default {
  mounted() {
    this.fetchMonthlyOrders(); // Call method to fetch monthly orders data
  },
  methods: {
    fetchMonthlyOrders() {
      axios.get('https://localhost:44330/api/AdminHome/Get%20Monthly%20Orders%20Number') // Make HTTP GET request to the endpoint
        .then(response => {
          const data = this.formatData(response.data); // Format data from response
          this.renderChart(data); // Call method to render chart with formatted data
        })
        .catch(error => {
          console.error('Error fetching monthly orders data:', error);
        });
    },
    formatData(data) {
      // Map the response data to extract labels and data points
      return data.map(item => ({
        label: item.item1,
        value: item.item2
      }));
    },
    renderChart(data) {
      const canvas = document.getElementById('monthly-orders-chart');
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }
      const ctx = canvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(item => item.label), // Extract labels from formatted data
          datasets: [{
            label: 'Monthly Orders',
            data: data.map(item => item.value), // Extract data points from formatted data
            borderColor: 'rgb(158, 252, 158)',
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15,
            borderWidth: 2,
            fill: false,
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

}
#monthly-orders-chart{
  background-color: #007C4F;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
}
</style>