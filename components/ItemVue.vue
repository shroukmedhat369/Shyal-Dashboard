<template>
   
        
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Item Description</th>
                <th>Receiving Date</th>
                <th>Leaving Date</th>
                <th>Location</th>
                <th>Size</th>
                <th>Fees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.orderId }}</td>
                <td>{{ item.customerName }}</td>
                <td>{{ item.itemDescription }}</td>
                <td>{{ item.receivingDate }}</td>
                <td>{{ item.leavingDate }}</td>
                <td>{{ item.location }}</td>
                <td>{{ item.size }}</td>
                <td>{{ item.fees }}</td>
                <td>
                  
  
                  <span class="action-icon">
                    <router-link
                      :to="{
                        name: 'ItemEditing',
                        params: { id: item.id },
                      }"
                    >
                      <font-awesome-icon icon="fa-edit" />
                    </router-link>
                  </span>
  
                  <span class="action-icon">
                    <router-link
                      :to="{
                        name: 'DeleteItem',
                        params: { id: item.id },
                      }"
                    >
                      <font-awesome-icon icon="fa-trash" />
                    </router-link>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
  

  </template>
  
  <script>
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import axios from "axios";
  
  export default {
      data() {
       return {
        items: [],
         
       };},
       components:{
        FontAwesomeIcon,
          
         },
         mounted() {
      axios.get("http://localhost:3000/items")
        .then((res) => {
          this.items = res.data;
        })
        .catch((err) => console.log(err.message));
    },         
           
  
  }
  </script>
  
  <style scoped>
  
      
  
  table {
      border-collapse: collapse;
      width: 100%;
      height: 100%;
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
  .action-icon {
    margin-right: 10px;
    padding: 2px;
    cursor: pointer;
  }
  </style>