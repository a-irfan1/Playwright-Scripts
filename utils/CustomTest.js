const base = require("@playwright/test");

exports.customtest = base.test.extend({
    testData : {
        email : "def@def.com",
        password : "DEFdef123!",
        productName : "ADIDAS ORIGINAL"
    }
})