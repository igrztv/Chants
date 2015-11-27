define({
    rules: {
        name: "required",
        email: {
                required: true,
                email: true
        },
        pswd: {
                required: true,
                minlength: 5
        },
        repeatpswd: {
                required: true,
                equalTo: '.b-main-signup-form__input_type_password'
        },
   },
        
   // Specify the validation error messages
   messages: {
       name: "Please enter your first name",
       pswd: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
       },
       email: "Please enter a valid email address",
       repeatpswd: "Passwords does not match"
  }
});