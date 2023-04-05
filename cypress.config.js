const { defineConfig } = require("cypress");


module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://makeup.com.ua/ua/',
    viewportHeight: 900,
    viewportWidth: 1400,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  cosmeticsBrands: [
    "Maybelline",
    "Nivea",
    "DKNY",
    "Dior",
    "Clinique"
  ],
  categories: [
    "/ua/categorys/3/",
    "/ua/categorys/20272/",
    "/ua/categorys/20273/",
    "/ua/categorys/321073/"
  ]

});

