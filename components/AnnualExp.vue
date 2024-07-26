<template>
  <div class="chart-container expense">
  
            <canvas id="expenseChart"></canvas>
        </div>
</template>

<script>
export default {
    
        mounted() {
        //this.renderChart1();
        //this.renderChart2();
        this.fetchData();
      } ,
      methods: {
       
        async fetchData() {
      const currentYear = new Date().getFullYear();
      try {
        const response = await axios.get(`https://localhost:44330/api/AdminHome/Annual-expense?Year=${currentYear}`);
        this.monthlyData = response.data; // Getting only the first 6 months
        console.log('Fetched data:', this.monthlyData); // Log fetched data for debugging
        this.renderChart3();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    renderChart3() {
      if (!this.monthlyData || this.monthlyData.length === 0) {
        console.error('No data available');
        return;
      }

      const ctx = document.getElementById('expenseChart').getContext('2d');

      // Process the fetched data
      const marketingExpense = this.monthlyData.reduce((sum, item) => sum + item.marketing, 0);
      const technologyExpense = this.monthlyData.reduce((sum, item) => sum + item.maintenance, 0);
      const inventoryExpense = this.monthlyData.reduce((sum, item) => sum + item.rent, 0);
      const operationsExpense = this.monthlyData.reduce((sum, item) => sum + item.salary + item.otherExpense, 0);

      // Log processed expenses for debugging
      console.log('Processed expenses:', { marketingExpense, technologyExpense, inventoryExpense, operationsExpense });

      // Create the chart
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [
            'Marketing and Promotion', 
            'Technology and Infrastructure', 
            'Inventory and Management', 
            'Operations and Other Expense'
          ],
          datasets: [{
            data: [
              marketingExpense, 
              technologyExpense, 
              inventoryExpense, 
              operationsExpense
            ],
            backgroundColor: [
              'rgb(158, 252, 158)',
              'rgb(0, 124, 79)',
              'rgb(158, 252, 158)',
              'rgb(0, 124, 79)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false // Hide the legend below the pie chart
            },
            tooltip: {
              bodyColor: 'white', // Change color of tooltip text to white
              titleColor: 'white' // Change color of tooltip title to white
            },
            datalabels: {
              color: 'white', // Change color of data labels to white
              formatter: (value) => value // Display the actual data values
            }
          },
          responsive: true,
          elements: {
            arc: {
              borderWidth: 0
            }
          },
          layout: {
            padding: {
              left: 50,
              right: 50,
              top: 0,
              bottom: 0
            }
          },
          offset: 10
        }
      });

      // Update the legend labels color
      const legendLabels = document.querySelectorAll('#expenseChart .chartjs-plugin-datalabels span');
      legendLabels.forEach(label => {
        label.style.color = 'white';
      });

      // Update the tooltip text color
      const tooltips = document.querySelectorAll('#expenseChart .chartjs-tooltip');
      tooltips.forEach(tooltip => {
        tooltip.style.color = 'white';
      });
    }
  
},

    }


</script>

<style scoped>

        .chart-container {
      width: 48%;
    }
    
    .expense{
      height: 260px;
      
    }
    #expenseChart{
      position: relative;
      left: 120px;
    }
    
</style>