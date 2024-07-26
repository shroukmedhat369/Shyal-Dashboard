import { createRouter, createWebHistory } from 'vue-router';
import store from '/Shyal-App/store'; // Import your Vuex store
import HomeVue from '../views/HomeVue.vue';
import CurrentOrdersVue from '../views/CurrentOrdersVue.vue';
import CurrentOrderInventoryEdit from "../views/CurrentOrderInventoryEdit.vue";
import CurrentOrderInventoryDelete from "../views/CurrentOrderInventoryDelete.vue";
import CustomersVue from '../views/CustomersVue.vue';
import DriversVue from '../views/DriversVue.vue';
import ExpAdd from '../views/ExpAdd.vue';
import ExpMain from '../views/ExpMain.vue';
import FinanceVue from '../views/FinanceVue.vue';
import Stores from "../views/Stores.vue";
import InventoryEdit from "../views/InventoryEdit.vue";
import InventoryEditman from "../views/InventoryEdit.vue";

import OrderInventory from "../views/OrderInventory.vue";
import OrderInventoryman from "../views/OrderInventoryman.vue";

import NewDriversVue from '../views/NewDriversVue.vue';
import OrdersVue from '../views/OrdersVue.vue';
import RevAdd from '../views/RevAdd.vue';
import RevMain from '../views/RevMain.vue';
import SettingVue from '../views/SettingVue.vue';
import ProfitVue from '../views/ProfitVue.vue';
import StorageMan from '../views/StorageMan.vue';
import FinanceManager from '../views/FinanceManager.vue';
import ExpAddmanager from '../views/ExpAddmanager.vue';
import ExpMainmanager from '../views/ExpMainmanager.vue';
import ProfitManager from '../views/ProfitManager.vue';
import RevAddmanager from '../views/RevAddmanager.vue';
import RevMainmanager from '../views/RevMainmanager.vue';
import DeleteOrderInventory from "../views/DeleteOrderInventory.vue";
import DeleteOrderInventoryman from "../views/DeleteOrderInventoryman.vue";
import OrderInventoryEdit from "../views/OrderInventoryEdit.vue";
import OrderInventoryEditman from "../views/OrderInventoryEditman.vue";
import AddAdmin from '../views/AddAdmin.vue';
import CurrentOrderDelete from '../views/CurrentOrderDelete.vue';
import CurrentOrderEdit from '../views/CurrentOrderEdit.vue';
import OrderDelete from '../views/OrderDelete.vue';
import OrderEdit from '../views/OrderEdit.vue';
import SettingFinance from '../views/SettingFinance.vue';
import SettingStore from '../views/SettingStore.vue';
import EditCust from '../views/EditCust.vue';
import EditDriver from '../views/EditDriver.vue';
import EditOrder from '../views/EditOrder.vue';
import DeleteCust from '../views/DeleteCust.vue';
import DeleteDriver from '../views/DeleteDriver.vue';
import DetailsCust from '../views/DetailsCust.vue';
import DetailsDriver from '../views/DetailsDriver.vue';
import DetailsNewD from '../views/DetailsNewD.vue';
import RevEdit from '../views/RevEdit.vue';
import RevEditman from '../views/RevEditman.vue';
import RevDelete from '../views/RevDelete.vue';
import RevDeleteman from '../views/RevDeleteman.vue';
import ExpEdit from '../views/ExpEdit.vue';
import ExpEditman from '../views/ExpEditman.vue';
import ExpDelete from '../views/ExpDelete.vue';
import ExpDeleteman from '../views/ExpDeleteman.vue';
import shayalApp from '../views/ShayalApp.vue';


  const routes = [
    {
      path: '/',
      name: 'ShayalApp',
      component: shayalApp,
      
    },
    {
      path: '/CurrentOrders',
      name: 'CurrentOrdersVue',
      component: CurrentOrdersVue,
      beforeEnter: requireAuth
    },
    {
      path: '/HomeVue',
      name: 'home',
      component: HomeVue,
      beforeEnter: requireAuth
    },
    {
      path: '/Customers',
      name: 'Customers',
      component: CustomersVue,
      beforeEnter: requireAuth
    },
    {
      path: '/Drivers',
      name: 'Drivers',
      component: DriversVue,
      beforeEnter: requireAuth
    },
    {
      path: '/ExpenseAdd',
      name: 'ExpAdd',
      component: ExpAdd,
      beforeEnter: requireAuth
    },
    {
      path: '/ExpenseMain',
      name: 'ExpenseMain',
      component: ExpMain,
      beforeEnter: requireAuth
    },
    {
      path: '/Finance',
      name: 'Finance',
      component: FinanceVue,
      beforeEnter: requireAuth
    },
    {
      path: "/Stores",
      name: "Stores",
      component: Stores,
      beforeEnter: requireAuth

    },{
      path: "/Stores/InventoryEdit/:id",
      name: "InventoryEdit",
      component: InventoryEdit,
      beforeEnter: requireAuth

    },
    {
      path: "/Stores/InventoryEdit/:id",
      name: "InventoryEditman",
      component: InventoryEditman,
      beforeEnter: requireAuth

    },
    {
      path: "/OrderInventory",
      name: "OrderInventory",
      component: OrderInventory,
      beforeEnter: requireAuth

    },{
      path: "/OrderInventoryman",
      name: "OrderInventoryman",
      component: OrderInventoryman,
      beforeEnter: requireAuth

    },
    
    
    {
      path: '/NewDrivers',
      name: 'NewDrivers',
      component: NewDriversVue,
      beforeEnter: requireAuth
    },
    {
      path: '/Orders',
      name: 'Orders',
      component: OrdersVue,
      beforeEnter: requireAuth
    },
    {
      path: '/RevAdd',
      name: 'RevAdd',
      component: RevAdd,
      beforeEnter: requireAuth
    },
    {
      path: '/RevMain',
      name: 'RevMain',
      component: RevMain,
      beforeEnter: requireAuth
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: SettingVue,
      beforeEnter: requireAuth
    },
    {
      path: '/Profit',
      name: 'Profit',
      component: ProfitVue,
      beforeEnter: requireAuth
    },
    {
      path: '/FinanceManager',
      name: 'FinanceManager',
      component: FinanceManager,
      beforeEnter: requireAuth
    },
    {
      path: '/StoreManager',
      name: 'StoreManager',
      component: StorageMan,
      beforeEnter: requireAuth
    },
    
    {
      path: '/ExpAddmanager',
      name: 'ExpAddmanager',
      component: ExpAddmanager,
      beforeEnter: requireAuth
    },
    {
      path: '/ExpMainmanager',
      name: 'ExpMainmanager',
      component: ExpMainmanager,
      beforeEnter: requireAuth
    },
    {
      path: '/ProfitManager',
      name: 'ProfitManager',
      component: ProfitManager,
      beforeEnter: requireAuth
    },
    {
      path: '/RevAddmanager',
      name: 'RevAddmanager',
      component: RevAddmanager,
      beforeEnter: requireAuth
    },
    {
      path: '/RevMainmanager',
      name: 'RevMainmanager',
      component: RevMainmanager,
      beforeEnter: requireAuth
    },
    {
      path: "/DeleteOrderInventory/:id",
      name: "DeleteOrderInventory",
      component: DeleteOrderInventory,
      beforeEnter: requireAuth

    },
    {
      path: "/DeleteOrderInventoryman/:id",
      name: "DeleteOrderInventoryman",
      component: DeleteOrderInventoryman,
      beforeEnter: requireAuth

    },
    
    {
      path: "/OrderInventoryEdit/:id",
      name: "OrderInventoryEdit",
      component: OrderInventoryEdit,
      beforeEnter: requireAuth

    },
    {
      path: "/OrderInventoryEditman/:id",
      name: "OrderInventoryEditman",
      component: OrderInventoryEditman,
      beforeEnter: requireAuth

    },
    
    {
      path: '/CurrentOrder/Delete/:id',
      name: 'CurrentOrderDelete',
      component: CurrentOrderDelete,
      beforeEnter: requireAuth
    },
    {
      path: '/current-orders/edit/:id',
      name: 'CurrentOrderEdit',
      component: CurrentOrderEdit,
      beforeEnter: requireAuth
    },
    {
      path: "/CurrentOrder/Delete/:id",
      name: "CurrentOrderInventoryDelete",
      component: CurrentOrderInventoryDelete,
      beforeEnter: requireAuth

    },
    {
      path: "/current-orders/edit/:id",
      name: "CurrentOrderEdit",
      component: CurrentOrderEdit,
      beforeEnter: requireAuth

    },
    {
      path: "/current-orders/edit/:id",
      name: "CurrentOrderInventoryEdit",
      component: CurrentOrderInventoryEdit,
      beforeEnter: requireAuth

    },
    
    {
      path: '/Order/Delete/:id',
      name: 'OrderDelete',
      component: OrderDelete,
      beforeEnter: requireAuth
    },
    {
      path: '/orders/edit/:id',
      name: 'OrderEdit',
      component: OrderEdit,
      beforeEnter: requireAuth
    },
    {
      path: '/AddAdmin',
      name: 'AddAdmin',
      component: AddAdmin,
      beforeEnter: requireAuth
    },
    {
      path: '/SettingFinance',
      name: 'SettingFinance',
      component: SettingFinance,
      beforeEnter: requireAuth
    },
    {
      path: '/SettingStore',
      name: 'SettingStore',
      component: SettingStore,
      beforeEnter: requireAuth
    },
    {
      path: '/EditCust/:id',
      name: 'EditCust',
      component: EditCust,
      beforeEnter: requireAuth
    },
    {
      path: '/EditDriver/:id',
      name: 'EditDriver',
      component: EditDriver,
      beforeEnter: requireAuth
    },
    {
      path: '/EditOrder/:id',
      name: 'EditOrder',
      component: EditOrder,
      beforeEnter: requireAuth
    },
    {
      path: '/DeleteCust/:id',
      name: 'DeleteCust',
      component: DeleteCust,
      beforeEnter: requireAuth
    },
    {
      path: '/DeleteDriver/:id',
      name: 'DeleteDriver',
      component: DeleteDriver,
      beforeEnter: requireAuth
    },
    {
      path: '/DetailsCust/:id',
      name: 'DetailsCust',
      component: DetailsCust,
      beforeEnter: requireAuth
    },
    {
      path: '/DetailsDriver/:id',
      name: 'DetailsDriver',
      component: DetailsDriver,
      beforeEnter: requireAuth
    } ,{
      path: '/DetailsNewD/:id',
      name: 'DetailsNewD',
      component: DetailsNewD,
      beforeEnter: requireAuth
    },
    {
      path: '/RevEdit/:year/:month',
      name: 'RevEdit',
      component: RevEdit,
      beforeEnter: requireAuth
    },
    {
      path: '/RevEditman/:year/:month',
      name: 'RevEditman',
      component: RevEditman,
      beforeEnter: requireAuth
    },
    {
      path: '/RevDelete/:year/:month',
      name: 'RevDelete',
      component: RevDelete,
      beforeEnter: requireAuth
    },
    {
      path: '/RevDeleteman/:year/:month',
      name: 'RevDeleteman',
      component: RevDeleteman,
      beforeEnter: requireAuth
    },
    {
      path: '/ExpEdit/:year/:month',
      name: 'ExpEdit',
      component: ExpEdit,
      beforeEnter: requireAuth
    },
    {
      path: '/ExpEditman/:year/:month',
      name: 'ExpEditman',
      component: ExpEditman,
      beforeEnter: requireAuth
    },
    {
      path: '/ExpDelete/:year/:month',
      name: 'ExpDelete',
      component: ExpDelete,
      beforeEnter: requireAuth
    },
    {
      path: '/ExpDeleteman/:year/:month',
      name: 'ExpDeleteman',
      component: ExpDeleteman,
      beforeEnter: requireAuth
    },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  // Navigation guard to check authentication
  function requireAuth(to, from, next) {
    const token = store.getters.getToken;
    const hasFlag = store.getters.getFlag;
  
    if (token && hasFlag) {
      next();
    } else {
      next('/'); // Redirect to login page if not authenticated or flag is not set
    }
  }
  
  export default router;
