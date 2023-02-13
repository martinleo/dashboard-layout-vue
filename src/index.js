import DashboardLayout from './components/DashboardLayout.vue'

export default{
  install: (app, options) => {
    app.component('DashboardLayout',DashboardLayout);
  }
}