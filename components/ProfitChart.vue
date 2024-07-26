<template>
  <div class="container2">
    <div class="profit-box" style="background-color: white;">
      <h2>Total Annual Profit</h2>
      <p>{{ formattedTotalAnnualProfit }}</p>
    </div>
    <div class="indicator-chart">
      <canvas id="safety-chart" width="100" height="100"></canvas>
      <span>{{ profitPercentage }} %</span>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  setup() {
    const totalAnnualProfit = ref(0);
    const safetyScore = 300000; // Safety score set to 300,000

    const fetchAnnualProfit = async (year) => {
      try {
        const response = await axios.get(`https://localhost:44330/api/AdminHome/annual-profit?year=${year}`);
        totalAnnualProfit.value = response.data.profit;
      } catch (error) {
        console.error('Error fetching annual profit:', error);
      }
    };

    const formattedTotalAnnualProfit = computed(() => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAnnualProfit.value);
    });

    const profitPercentage = computed(() => {
      return ((totalAnnualProfit.value / safetyScore) * 100 ).toFixed(2);
    });

    onMounted(async () => {
      const currentYear = new Date().getFullYear();
      await fetchAnnualProfit(currentYear);

      const ctx = document.getElementById('safety-chart').getContext('2d');
      const gradient = ctx.createLinearGradient(0, 90, 155, 0);
      gradient.addColorStop(0.5, '#05CD99'); // Start with main color
      gradient.addColorStop(0.3, '#05CD99'); // Main color
      gradient.addColorStop(0.4, '#05CD99'); // Main color
      gradient.addColorStop(1, 'rgba(5, 205, 153, 0)');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Profit Percentage'],
          datasets: [{
            data: [profitPercentage.value, 10 - profitPercentage.value],
            backgroundColor: [ gradient,'transparent'],
            borderWidth: 0,
            borderRadius: 10
          }]
        },
        options: {
          responsive: true,
          cutout: '80%', // Adjust the size of the hole in the center
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            title: {
              display: true,
              text: 'Safety Score',
              position: 'top',
              font: {
                size: 32,
                weight: 'bold',
              },
              padding: 20,
              color: '#47F71B'
            },
            animation: { animateRotate: true }
          }
        }
      });
    });

    return { profitPercentage, formattedTotalAnnualProfit };
  }
};
</script>

<style scoped>
.container2 {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.profit-box, .indicator-chart {
  text-align: center;
}
.indicator-chart {
  width: 50%;
}
.profit-box {
  border-collapse: collapse;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  text-align: center;
  color: #007c4f;
  margin-top: 10%;
  width: 30%;
  height: 90px;
  box-shadow: 0px 0px 10px 0px rgba(76, 199, 123, 0.75);
  font-family: 'Inter', sans-serif;
}

.profit-box h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

.profit-box p {
  font-size: 24px;
  font-weight: bold;
  color: #007C4F;
}

span {
  font-size: 36px;
  position: relative;
  top: -130px;
  color: #47F71B;
}

.see-more {
  font-size: 24px;
  color: #007C4F;
  font-weight: 900;
  text-decoration: none;
}
</style>
