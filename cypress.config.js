const { defineConfig } = require("cypress");

module.exports = defineConfig({

  defaultCommandTimeout:6000,
  pageLoadTimeout: 120000,
  projectId: "x6aw2j",
  

  env: {
   // url :  'https://azrtprel11.trackerpro.cc/11.1.00/Authentication/Login.aspx',
    url : 'https://azrtpqaw19v2.trackerpro.cc/Alfa/Authentication/Login.aspx',
  },

  e2e: {
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/HolderManagement/*.js'   
  },
});
