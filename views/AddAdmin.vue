<template>
  <div>
    <hea :selectedView="selectedView"></hea>
    <div class="container1">
      <sid @view-selected="updateSelectedView"></sid>
      <div class="content">
        <div class="background-image">
          <div class="form-container">
            <div class="container">
              <!-- Name Inputs -->
              <div class="box-container">
                <div class="box">
                  <label for="firstName">First Name</label>
                  <input type="text" id="firstName" v-model="firstName" placeholder="Please enter your first name">
                  <span v-if="!isFirstNameValid" class="error">Please enter a valid first name (only alphabetic characters)</span>
                </div>
              </div>
              <div class="box-container">
                <div class="box">
                  <label for="lastName">Last Name</label>
                  <input type="text" id="lastName" v-model="lastName" placeholder="Please enter your last name">
                  <span v-if="!isLastNameValid" class="error">Please enter a valid last name (only alphabetic characters)</span>
                </div>
              </div>

              <!-- Gender Input -->
              <div class="box-container">
                <div class="box">
                  <label>Gender</label>
                  <div class="radio-buttons">
                    <label>
                      <input type="radio" v-model="gender" value="Male">
                      <span class="radio-custom"></span> Male
                    </label>
                    <label>
                      <input type="radio" v-model="gender" value="Female">
                      <span class="radio-custom"></span> Female
                    </label>
                  </div>
                  <span v-if="!isGenderValid" class="error">Please select a gender</span>
                </div>
              </div>

              <!-- Phone Input -->
              <div class="box-container">
                <div class="box">
                  <label for="phone">Phone</label>
                  <input type="tel" id="phone" v-model="phone" placeholder="Please enter your phone number">
                  <span v-if="!isPhoneValid" class="error">Please enter a valid phone number (only numeric characters)</span>
                </div>
              </div>

              <!-- Email Input -->
              <div class="box-container">
                <div class="box">
                  <label for="email">Email</label>
                  <input type="email" id="email" v-model="email" placeholder="Please enter your email">
                  <span v-if="!isEmailValid" class="error">Please enter a valid email address</span>
                </div>
              </div>

              <!-- Password Input -->
              <div class="box-container" style="width: calc(50% - 10px);">
                <div class="box">
                  <label for="password">Password</label>
                  <div class="password-input">
                    <input type="password" id="password" v-model="password" :class="{ 'password-hidden': !showPassword }" placeholder="Please enter your password">
                    <span class="toggle-password" @click="togglePasswordVisibility">
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </span>
                  </div>
                  <span v-if="!isPasswordValid" class="error">Please enter a valid password (at least 8 characters with at least one uppercase letter, one lowercase letter, one number, and one special character)</span>
                </div>
              </div>

              <!-- Confirm Password Input -->
              <div class="box-container" style="width: calc(50% - 10px);">
                <div class="box">
                  <label for="confirmPassword">Confirm Password</label>
                  <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Please confirm your password">
                  <span v-if="!isConfirmPasswordValid" class="error">Passwords do not match</span>
                </div>
              </div>

              <!-- Role Radio Buttons -->
              <div class="box-container">
                <div class="box">
                  <label>Role</label>
                  <div class="radio-buttons">
                    <label>
                      <input type="radio" v-model="role" value="Admin">
                      <span class="radio-custom"></span> Admin
                    </label>
                    <label>
                      <input type="radio" v-model="role" value="Finance Manager">
                      <span class="radio-custom"></span> Finance Manager
                    </label>
                    <label>
                      <input type="radio" v-model="role" value="Storage Manager">
                      <span class="radio-custom"></span> Storage Manager
                    </label>
                  </div>
                  <span v-if="!isRoleValid" class="error">Please select a role</span>
                </div>
              </div>

              <!-- Button Container -->
              <div class="button-container">
                <button @click="registerUser" class="register-user-button">ADD</button>
                <button @click="goBack" class="back-button">Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hea from'../components/HeaderVue.vue';
import sid from'../components/SideVue.vue' ;
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getToken']), // Map the getToken getter
  },
  components: {
    hea, sid
  },
  data() {
    return {
      selectedView: 'Add Admin', // Default view
      firstName: '',
      lastName: '',
      gender: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      isFirstNameValid: true,
      isLastNameValid: true,
      isGenderValid: true,
      isPhoneValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      isRoleValid: true,
      isConfirmPasswordValid: true,
      showPassword: false,
    };
  },
  methods: {
    updateSelectedView(view) {
      this.selectedView = view;
    },
    async registerUser() {
      // Validate input
      this.isFirstNameValid = /^[a-zA-Z]+$/.test(this.firstName.trim());
      this.isLastNameValid = /^[a-zA-Z]+$/.test(this.lastName.trim());
      this.isGenderValid = !!this.gender.trim();
      this.isPhoneValid = /^\d+$/.test(this.phone.trim());
      this.isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
      this.isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.password.trim());
      this.isRoleValid = !!this.role.trim();
      this.isConfirmPasswordValid = this.password === this.confirmPassword;
      
      // Check if all fields are valid
      if (
        !this.isFirstNameValid ||
        !this.isLastNameValid ||
        !this.isGenderValid ||
        !this.isPhoneValid ||
        !this.isEmailValid ||
        !this.isPasswordValid ||
        !this.isRoleValid ||
        !this.isConfirmPasswordValid
      ) {
        alert('Please fill in all required fields correctly.');
        return;
      }

      try {
        // Retrieve token
        const token = this.getToken;

        // Send POST request to the endpoint
        const response = await fetch('https://localhost:44330/api/UserAccount/Add%20Admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add the token here
          },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            gender: this.gender === 'Male' ? 0 : 1, // Assuming 'Male' corresponds to 0 and 'Female' corresponds to 1
            phoneNumber: this.phone,
            role: this.role === 'Admin' ? 1 : this.role === 'Finance Manager' ? 5 : 4, // Assuming 'Admin' corresponds to 1, 'Finance Manager' corresponds to 2, and 'Storage Manager' corresponds to 3
          }),
        });

        // Check if the request was successful
        if (response.ok) {
          // Registration successful
          alert('User registered successfully!');
        } else {
          // Registration failed
          const errorMessage = await response.text();
          alert(`Registration failed: ${errorMessage}`);
        }
      } catch (error) {
        // Handle any network or server errors
        console.error('Error registering user:', error);
        alert('An error occurred while registering user. Please try again later.');
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        passwordInput.type = this.showPassword ? 'text' : 'password';
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  
};
</script>




   
   <style scoped>
   .container1 {
       display: grid;
       grid-template-columns: auto 1fr; 
       
  background: linear-gradient(to left, #8dd3a8, #ADBC9F, #FBFADA);
  display: flex;
  width: 100%;
}/* Sidebar takes auto width, content takes remaining space */
     
   .content {
       padding: 20px;
     }
     .form-container {
  position: absolute;
  top: 90%;
  left: 55%;
 
  border-radius: 10px;
  background-image: url("../assets/Screenshot\ 2024-04-24\ 032316.jpeg");
  background-size: cover;
  width: 50%;
  transform: translate(-50%, -50%);
}

.container {
  border: 2px solid #176B4C;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.box-container {
  width: calc(50% - 10px); /* Adjusted width */
}

.box {
  padding: 20px;
  background-color: #1D6E53;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.3s;
}

.box label {
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  display: block;
}

.box input {
  width: calc(100% - 20px);
  padding: 8px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  background-color: transparent;
  transition: box-shadow 0.3s ease;
  color: #fff;
}

.box input::placeholder {
  color: #ccc;
}

.box input:focus {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.box:hover {
  background-color: #03422D;
  transform: translateY(-5px);
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.password-input {
  position: relative;
}

.password-hidden ~ .toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

.toggle-password {
  cursor: pointer;
}

.toggle-password:hover {
  color: #176B4C;
}

.password-hidden {
  -webkit-text-security: disc; /* Safari */
  text-decoration: disc;
}

.back-button,
.register-user-button {
  padding: 12px 30px;
  font-size: 16px;
  background-color: #03422D;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}
.back-button{
  position: static;
}
.back-button:hover,
.register-user-button:hover {
  background-color: #176B4C;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.error {
  color: rgb(0, 255, 106);
  font-size: 12px;
}

.radio-buttons {
  display: flex;
  flex-direction: column;
}

.radio-buttons label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.radio-buttons input[type="radio"] {
  display: none;
}

.radio-buttons label .radio-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 10px;
  position: relative;
}

.radio-buttons label .radio-custom::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.radio-buttons input[type="radio"]:checked + .radio-custom::after {
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .form-container {
    width: 80%;
  }
  
  .box-container {
    width: calc(100% - 20px);
  }
}

@media screen and (max-width: 480px) {
  .container {
    padding: 20px;
  }

  .box {
    padding: 15px;
  }

  .button-container {
    flex-direction: column;
    align-items: center;
  }

  .back-button,
  .register-user-button {
    margin-top: 10px;
    width: 100%;
  }

  .radio-buttons {
    display: flex;
    flex-direction: column;
}

.radio-buttons label {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
}

.radio-buttons input[type="radio"] {
    display: none;
}

.radio-buttons label .radio-custom {
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 10px;
    position: relative;
}

.radio-buttons label .radio-custom::after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.radio-buttons input[type="radio"]:checked + .radio-custom::after {
    opacity: 1;
}


}
   </style>