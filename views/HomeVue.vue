<template>
    <hea :selectedView="selectedView"></hea>
    <div class="container">
      <sid @view-selected="updateSelectedView"></sid>

      <div class="content">
      <div class="main-content boxes"> 
        <div class="box" v-for="(item, index) in items" :key="index">
          <div class="circle"><img :src="item.icon" :alt="item.title"></div>
          <h2>{{ item.title }}</h2>
          <p>{{ item.number }}</p>
        </div>
      </div>
     <div class="section"> 
      <div class="current-orders">
        <h2 class="headers">Current Orders</h2>
        <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Driver ID</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop through the fetched orders and display them in the table -->
              <tr v-for="(order, index) in orders" :key="index">
                <td>{{ order.customerID }}</td>
                <td>{{ order.driverID }}</td>
                <td>{{ order.totalCost }}</td>
                <td>{{ order.orderStatus }}</td>
                <td>{{ order.orderDate }}</td>
              </tr>
            </tbody>
          </table>
      <router-link to="/CurrentOrders" class="see-more">See More</router-link>
        </div>
        <div class="chart-container">
          <h2 class="headers">Monthly Orders</h2>
            <Chart1/>
        </div>
      </div>
      <div class="section1"> 
        <div class="chart-container revenue">
          <h2 class="headers">Monthly Revenue</h2>
            <Chart2/>
        </div>
        <div class="chart-container expense">
            <h2 class="headers">Monthly Expense</h2>
            <canvas id="expenseChart" ></canvas>
            <router-link to="/ExpenseMain" class="see-more">See More</router-link>
        </div>
        
      </div>
      <div class="section2"> 
        <div class="top-cust">
          <h2 class="headers">Top Customers</h2>
          <table class="top-customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(customer, index) in topCustomers" :key="index">
                <td>
                  <div class="customer-info">
                    <img :src="customer.imgUrl" alt="Customer Image">
                    <div class="customer-details">
                      <h3>{{ customer.name }}</h3>
                      <p>{{ customer.email }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="order-info">
                    <p>Total Orders: {{ customer.totalOrders }}</p>
                    <p>Last Order Date: {{ customer.createdAt }}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
      <router-link to="/Customers" class="see-more">See More</router-link>
            
        </div>
        <div class="new-cust">
          <h2 class="headers">New Customers</h2>
          <table class="new-customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Joined At</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(customer, index) in newCustomers" :key="index">
                <td>
                  <div class="customer-info">
                    <img :src="customer.imgUrl" alt="Customer Image">
                    <div class="customer-details">
                      <h3>{{ customer.name }}</h3>
                      <p>{{ customer.email }}</p>
                    </div>
                  </div>
                </td>
                <td>{{ customer.createdAt }}</td>
              </tr>
            </tbody>
          </table>
      <router-link to="/Customers" class="see-more">See More</router-link>
        </div>
      </div>
    </div>
  </div>
      
    </template>
    
    <script>
    
    import { ref, onMounted } from 'vue';
    import axios from 'axios'; // Import axios
    import { mapGetters } from 'vuex';
    import Chart1 from'../components/OrdersChart.vue';
    import Chart2 from'../components/RevChart.vue';
    import hea from'../components/HeaderVue.vue';
    import sid from'../components/SideVue.vue' ;
    import pic from '../assets/profile.png';
    import user from '../assets/user..png';
    import cart from '../assets/cart..png';
    import tag from '../assets/tag.png';


    
    
    export default { 
      computed: {
    ...mapGetters(['getToken']), // Map the getToken getter
  },
      components:{
        Chart1,Chart2,hea,sid
      },
      data() {
    return {
      selectedView: 'Home' , // Initialize items array // Default view
      
      monthlyData: [] // Initialize monthlyData as an empty array
    
    };
  },
      
  setup(props, { expose }) {
    const token = props.getToken;
        const items = ref([]);
        const orders = ref([]);
        const topCustomers = ref([]);
  const newCustomers = ref([]);
  
    // Axios instance with default headers including Authorization
    const axiosInstance = axios.create({
      baseURL: 'https://localhost:44330/api/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const fetchTopCustomers = async () => {
      try {
        const response = await axiosInstance.get('AdminHome/top-customers');
        topCustomers.value = response.data.slice(0, 5).map(customer => ({
          imgUrl: pic,
          name: customer.customerName,
          email: customer.customerEmail,
          totalOrders: customer.numberOfOrders,
          createdAt: customer.lastOrderDate
        }));
      } catch (error) {
        console.error('Error fetching top customers:', error);
      }
    };

    const fetchNewCustomers = async () => {
      try {
        const response = await axiosInstance.get('AdminHome/new-customers');
        newCustomers.value = response.data.slice(0, 5).map(customer => ({
          imgUrl: pic,
          name: customer.customerName,
          email: customer.customerEmail,
          totalOrders: customer.numberOfOrders , // New customers do not have any orders yet
          createdAt: customer.joiningDate
        }));
      } catch (error) {
        console.error('Error fetching new customers:', error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('AdminHome/current-orders');
        orders.value = response.data.slice(0, 6); // Update orders with fetched data
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchItems = async () => {
      try {
        const [driversResponse, usersResponse, ordersResponse, itemResponse] = await Promise.all([
          axiosInstance.get('AdminHome/Get%20Number%20Of%20Drivers'),
          axiosInstance.get('AdminHome/Get%20Number%20Of%20User'),
          axiosInstance.get('AdminHome/Get%20Number%20Of%20Orders'),
          axiosInstance.get('AdminHome/Get%20Number%20Of%20Inventory')
        ]);

        const drivers = driversResponse.data;
        const users = usersResponse.data;
        const totalorders = ordersResponse.data;
        const item = itemResponse.data;

        // Update items array with retrieved values
        items.value = [
          { icon: user, title: 'Total Users', number: users },
          { icon: cart, title: 'Total Orders', number: totalorders },
          { icon: user, title: 'Total Drivers', number: drivers },
          { icon: tag, title: 'Total Inv. Orders', number: item }
        ];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data on component mount
    onMounted(() => {
      fetchItems();
      fetchOrders();
      fetchTopCustomers();
      fetchNewCustomers();
    });

    return { items, orders, topCustomers, newCustomers };
  }
,
      mounted() {
        //this.renderChart1();
        //this.renderChart2();
        this.fetchData();
        
        
      },
      methods: {
        updateSelectedView(view) {
      this.selectedView = view;
    },
      

// Function to fetch data from the API
async fetchData() {
      const currentYear = new Date().getFullYear();
      const token = this.getToken;
      try {
        const response = await axios.get(`https://localhost:44330/api/AdminHome/Annual-expense?Year=${currentYear}`,{
           headers: {
        Authorization: `Bearer ${token}`

        }});
        this.monthlyData = response.data.slice(0, 6); // Getting only the first 6 months
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
    /* Importing Inter font from Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      
    }
    .container {
  display: grid;
  grid-template-columns: auto 1fr; 
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);

  width: 100%;
}
    .circle {
      border-radius: 50%;
        overflow: hidden;
        display: inline-grid;
        background-color: #7ba597;
        align-items: center;
        justify-content: center;
        width: 55px;
        height: 55px;
        margin-top: 10px;
    }
    .circle img{
    
     width: 40px;
        height: 40px;
    }
    
    .content {
      padding: 20px;
    }
    .boxes {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    
    .main-content {
      display: flex;
      align-items: flex-start;
      padding: 20px;
      height: min-content;
      width: 100%
    }
    .circletop{
      border-radius: 50%; /* Make the container a circle */
      overflow: hidden;
      display: inline-grid;
        background-color: #007C4F;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        width: 40px;
        height: 40px;
    }
    
   
    
    .box {
      background-color: #007C4F;
      border-radius: 8px;
      text-align: center;
      color: #ffffff;
      margin: 10px; 
      width: 100px;
      height: 132px;
      box-shadow: 0px 0px 10px 0px rgba(76, 199, 123, 0.75); 
      font-family: 'Inter', sans-serif;
      flex: 1 0 200px; /* Adjust width as needed */
    }
    .section{
      display: flex;
      margin-bottom: 20px;
    }
    .section1{
      display: flex;
      margin-bottom: 80px;
    }
    .section2{
      display: flex;
    }
    
    .current-orders{
      margin-right: 35px;
      width: 50%;
    }
    
    .ready {
      color: rgb(158, 252, 158);
    }
    
    .pending {
      color: rgb(253, 209, 127);
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
      height: 100px;
      color:#ffffff;
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
   
    .see-more {
      font-size: 24px;
        color: #007C4F;
        font-weight: 900;
        text-decoration: none;
    
    }
    .orders-table,
    .chart-container {
      width: 50%;
    }
    .revenue{
      width: 480px;
      height: 260px;
      margin-right: 35px;
    }
    
    .top-customers-table {
      width: 100%;
      border-collapse: collapse;
    }
    .expense{
      height: 260px;
      
    }
    #expenseChart{
      position: relative;
      left: 120px;
    }
    
    .customer-info {
      display: flex;
      align-items: center;
    }
    
    .customer-info img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    .order-info {
      display: flex;
      flex-direction: column;
    }
    .new-customers-table {
      width: 100%;
      border-collapse: collapse;
    }
   
    
    
    .customer-info {
      display: flex;
      align-items: center;
    }
    
    .customer-info img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    
    .order-info {
      display: flex;
      flex-direction: column;
    }
    .top-cust, .new-cust {
      width: 48%;
    }
    .top-cust{
      margin-right: 40px;
    }
    @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr; /* Switch to a single column layout */
    }
    .section,
    .section2 {
      flex-direction: column; /* Stack sections vertically on smaller screens */
    }
    .boxes {
      flex-direction: column; /* Stack boxes vertically on smaller screens */
    }
    .box {
      width: 100%; /* Make boxes occupy full width on smaller screens */
      margin-bottom: 10px; /* Add some space between stacked boxes */
    }
    .current-orders,
    .chart-container,
    .top-cust,
    .new-cust {
      width: 100%; /* Make sections occupy full width on smaller screens */
      margin-right: 0; /* Remove right margin on smaller screens */
    }
    .section,
    .section2 {
      margin-bottom: 20px; /* Add some space between stacked sections */
    }
  }
@media screen and (max-width: 576px) {
  .container {
    grid-template-columns: 1fr;
  }

  .boxes {
    flex-direction:column;
  }

  .section {
    flex-direction: column;
  }

  .circletop {
    width: 30px;
    height: 30px;
  }

  th {
    font-size: 12px;
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .container {
    grid-template-columns: 1fr 1fr;
  }

  .boxes {
    flex-direction: column;
  }

  .section {
    flex-direction: column;
  }

  .circletop {
    width: 50px;
    height: 50px;
  }

  .circlebottom {
    width: 50px;
    height: 50px;
  }

  th {
    font-size: 16px;
  }

}

    </style>