<template>
  <div class="app-container">
    <Header />

    <main class="main-content">
      <SideBar />
      <section class="content">
        <form class="edit-Form">
          <div class="form-row">
            <div class="form-group">
              <label for="capacity">Total Size</label>
              <input
                type="number"
                name="capacity"
                v-model.number="stores.capacity"
                id="capacity"
              />
            </div>
            <div class="form-group">
              <label for="occupation">Occupied</label>
              <input
                type="number"
                name="occupation"
                v-model.number="stores.occupation"
                id="occupation"
              />
            </div>
          </div>

          <div class="form-buttons">
            <button class="btn-left" @click.prevent="SaveChanges">Save</button>
            <button class="btn-right" @click.prevent="goBack">Cancel</button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import Header from "@/components/HeaderStore.vue";
import SideBar from "@/components/StorageSide.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    FontAwesomeIcon,
    Header,
    SideBar,
  },

  data() {
    return {
      stores: {
        capacity: 0,
        occupation: 0,
      },
    };
  },

  methods: {
    async goBack() {
      this.$router.push("/StoreManager");
    },
    async SaveChanges() {
      const updatedStores = {
        capacity: this.stores.capacity,
        occupation: this.stores.occupation,
      };

      try {
        await axios.put(
          `https://localhost:44330/api/AdminHome/updatStore/${this.$route.params.id}`,
          updatedStores
        );
        this.$router.push("/StoreManager");
      } catch (error) {
        console.error("Error updating store:", error.message);
      }
    },
  },

  mounted() {
    fetch(
      `https://localhost:44330/api/AdminHome/storebyid-${this.$route.params.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.stores = data;
      })
      .catch((err) => console.error("Error fetching store:", err.message));
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  display: grid;
  grid-template-columns: 150px auto;
}

.content {
  padding: 30px;
  background-color: #007c4f;
  border-radius: 10px;
  box-shadow: 0 2px 5px #007C4F(0, 0, 0, 0.1);
  width: calc(100vw - 330px);
  margin: 0 5px 0 180px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-Form {
  text-align: center;
  justify-content: space-between;
}
.form-row {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  gap: 15px;
}

.form-group {
  width: 100%;
  background-color: #f5f5f5;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.form-group label {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #2f3b37;
}

.edit-Form input {
  margin: auto;
  padding: 15px;
  display: block;
  width: 350px;
  border: 3px solid #1a927a;
  border-radius: 8px;
  text-align: center;
  color: black;
  font-size: large;
}

.form-buttons {
  display: flex;
  flex-direction: row;
  margin-top: 25px;
}

.btn-left {
  border: 2px solid #fff;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  width: 175px;
  color: #2f3b37;
  font-size: 16px;
  margin: auto;
}

.btn-left:hover {
  box-shadow: inset 0 -100px 0 0 #eee;
  color: #2f3b37;
}

.btn-right {
  background: #c1c1c1;
  border: none;
  color: #fff;
  padding: 10px;
  width: 175px;
  border-radius: 10px;
  font-size: 16px;
}
.btn-right:hover,
.btn-right:focus {
  background: #a8a8a8;
}
</style>
