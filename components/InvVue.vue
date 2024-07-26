<template>
  <div class="card-container">
          <div
            v-for="store in stores"
            :key="store.id"
            class="card"
            @click="selectedStore = store"
          >
            {{ store.name }}
          </div>
        </div>
        <table v-if="selectedStore">
          <thead>
            <tr>
              <th>Total Size</th>
              <th>Occupied</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ selectedStore.TotalSize }}</td>
              <td>{{ selectedStore.occupied }}</td>
              <td>{{ selectedStore.Available }}</td>
            </tr>
          </tbody>
        </table>
</template>

<script>
import axios from "axios";

export default {
    data() {
    return {
      stores: [],
      selectedStore: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/stores")
      .then((response) => {
        this.stores = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
</script>

<style scoped>
.storage-locations {
  padding: 30px;
  background-color: #2f3b37;
  color: #fff;
  width: calc(100vw - 330px);
  margin: 0 5px 0 220px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-container {
  display: flex;
  margin-right: 20;
}
.card {
  padding: 70px;
  border: 1px solid #1a927a;
  border-radius: 5px;
  cursor: pointer;
  margin: 15px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.storage-locations table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  display: flex;
  width: 100%;
  padding: 12px 0;
}

.storage-locations thead tr th {
  background-color: #2f3b37;
  color: #ddd;
  font-weight: bold;
  border-right: 1px solid white;
}
tr {
  display: flex;
  width: 100%;
  padding: 8px 0;
  border: none;
  background-color: #ddd;
  color: #333;
}
tr:nth-of-type(odd) {
  background: hsl(0, 0%, 98%);
}

.storage-locations th,
.storage-locations td {
  padding: 13px;
  flex: 1 1 20%;
  text-align: center;
  font-size: 17px;
}

.storage-locations th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #2f3b37;
}

.storage-locations td {
  font-family: "Times New Roman", Times, serif;
}
</style>