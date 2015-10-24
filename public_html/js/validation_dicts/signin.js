define({
    rules: {
        name: "required",
        pswd: {
                required: true,
                minlength: 5
        }
   },
        
   // Specify the validation error messages
   messages: {
       name: "Please enter your first name",
       pswd: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
       }
  }
});
