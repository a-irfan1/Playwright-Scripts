export class APIUtils {

    context : any;
    loginPayload: any;
    constructor(context : any, loginPayload : any){
        this.context = context;
        this.loginPayload= loginPayload;
    }

    async getToken(){
        const loginResponse = await this.context.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: this.loginPayload});
    
        const loginResponseJSON = await loginResponse.json();
        const token : any = loginResponseJSON.token;
        console.log(token);
        return token;
    }
    async createOrder(orderPayload){
        let response = {token : String, orderID : String};
        response.token = await this.getToken();
        const orderResponse = await this.context.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type' : "application/json"
            }
        }
    );
    const orderResponseJSON = await orderResponse.json();
    console.log(orderResponseJSON);
    const orderID = await orderResponseJSON.orders[0];
    response.orderID = orderID;
    return response;
    }
}

module.exports = {APIUtils}