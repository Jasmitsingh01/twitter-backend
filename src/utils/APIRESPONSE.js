class APIRESPONSE {
    // Create a new ApiResponse Class
    constructor(statusCode, message, data = {}) {
      // use the Constructor
      this.success = true; // set success flag to true
      this.statusCode = statusCode; // set status code
      this.message = message; // set message
      this.data = data; // set data
    
          
    }
  
  
}
  export default APIRESPONSE;