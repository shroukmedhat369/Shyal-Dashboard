<template>
    <div class="delete-driver">
        <h1 style="color: #436851;margin-left: 16%;">Delete User {{ driver.name }}</h1>
        <div style="margin-left: 45%;width: 20%;">
            <div v-if="driver" class="driver">
              <h2>Delete Driver</h2>
              <p>Are you sure you want to delete {{ driver.name }}?</p>
            </div>
            <div style="display: flex;">
              <button @click="confirmDelete" class="back-btn">Yes</button>
             <button @click="goBack" class="back-btn">No</button>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['driver'],
    methods: {
      confirmDelete() {
        // Logic to delete the driver
        console.log('Deleting driver:', this.driver);
        this.$emit('back');
      },
      goBack() {
        this.$emit('back');
      }
    }
  };
  </script>
  
  <style scoped>
  .delete-driver {
    justify-items: center;
  }
  /* Add styles for the driver details component */
  .driver{
    color:whitesmoke;
    background-color: #12372A;
    /* margin-left: 16%; */
    text-align: center;
    /* width: 18%; */
    padding: 15px;
    border-radius: 20px;
    /* margin-right: 0; */
    width: 110%;
    flex-grow: 1;
    margin-top: 20%;
  }

  .edit-driver{
    justify-items: center;
  }
 

  .btns
  {
    background-color: #12372A;
    margin-left: 40%;
    width: 40%;
    border-radius: 20px;
    border-color: rgba(255, 255, 255, 0);
    margin-bottom: 5px;
  }
  .btn{
    width: 50%;
    padding: 25px;
    background-color: transparent;
    font-size: larger;
    color: antiquewhite;
    border-color: rgba(255, 255, 255, 0);


  }
  .back-btn{
    margin-left: 20%;
    width: 80%;
    background-color:#12372A ;
    color: aliceblue;
    font-size: x-large;
    margin-top: 123px;
    border-radius: 10px;
    padding: 10px;
  }
  </style>
  