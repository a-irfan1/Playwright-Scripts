import {test as base} from "@playwright/test";

interface TestData {
    email : string,
    password : string,
    productName : string,
}

export const customtest = base.extend<{testData : TestData}>({
    testData : {
        email : "def@def.com",
        password : "DEFdef123!",
        productName : "ADIDAS ORIGINAL"
    }
})