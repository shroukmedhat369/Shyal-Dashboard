<!-- DriverDetails.vue -->
<template>
    <div class="edit-driver">
      <h1 style="color: #436851;margin-left: 16%;">Edit User {{ driver.name }}</h1>


        <div style="margin-left: 45%;width: 20%;">
            <div v-if="driver" class="driver">
            <img :src="driver.photo" alt="Driver Photo">
            <p><strong></strong> {{ driver.name }}</p>
            <p style="text-align: left;"><strong>Name:&ensp;&ensp;</strong> <input type="tel" id="phone" v-model="driver.name" /></p>
            <p style="text-align: left;"><strong>Email:&ensp;&ensp;</strong> <input type="tel" id="phone" v-model="driver.email" /></p>
            <p style="text-align: left;"><strong>Phone:&ensp;&ensp;</strong> <input type="tel" id="phone" v-model="driver.phone" /></p>
            <!-- <p style="text-align: left;"><strong>Vehical Type:&ensp;&ensp;</strong>  <input type="tel" id="phone" v-model="driver.vehical_type" />{{ driver.vehical_type }}</p>
            <p style="text-align: left;"><strong>vehical capacity:&ensp;&ensp;</strong>  <input type="tel" id="phone" v-model="driver.vehical_cap" />{{ driver.vehical_cap }}</p>
            <p style="text-align: left;"><strong>Driver License:&ensp;&ensp;</strong> <input type="tel" id="phone" v-model="driver.license_num" /> {{ driver.license_num }}</p>
            <p style="text-align: left;"><strong>Driver Due File:&ensp;&ensp;</strong> <img :src="driver.Drivers_Due_file" alt="Driver Photo"> <input type="tel" id="phone" v-model="driver.Drivers_Due_file" /></p> -->
            <!-- Add more details as needed -->
          
            </div>
            <div style="display: flex;">
            <button @click="goBack" class="back-btn">Save Changes</button>
          <button @click="goBack" class="back-btn">Back</button>
            </div>
        </div>

    </div>
  </template>
  
  <script>
  export default {
    props: ['driver'],
    data()
    {
      return{
       
      };
    },
    methods: {
    goBack() {
      this.$emit('back');
    },
  }
  };
  </script>
  
  <style scoped>

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
    width: 4000px ;
    background-color:#12372A ;
    color: aliceblue;
    font-size: x-large;
    margin-top: 100px;
    border-radius: 10px;
    padding: 10px;
  }
.upgrade-btn{
  margin-left: 100%;
  width: 70%;
  background-color:#12372A ;
  color: aliceblue;
  font-size: x-large;
  margin-top: 167px;
  border-radius: 10px;
  padding: 10px;
}
img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  </style>
  