$(document).ready(function(){
	$("#login_button").click(function(){ 
		event.preventDefault();
		var username = $("#login_email").val();
		var password = $("#login_password").val();
		if (username != "" & password != ""){
			Parse.User.logIn(username, password, {
	  			success: function(user) {
	   				 console.log("logged in " + user);
	   				 window.location.href = "../HTML/app.html";
				},
				error: function(user, error) {
				    console.log("failed to logg in " + error);
				    $("#login_box").prepend("<p id='invalid' class='alert_text'> Please check your email and password and try again. </p>")
				}})
			} else if (username == "" & password != "") {
				$("#login_box").prepend("<p id='no_username' class='alert_text'> Please enter an email address. </p>")			
			} else if (password == "" & username != "") {
				$("#login_box").prepend("<p id='no_password' class='alert_text'> Please enter a password. </p>")
			} else {
				$("#login_box").prepend("<p id='no_both' class='alert_text'> Please enter an email address and password. </p>")			
			}
	});

	$("#forgotten_password").click(function(){
		$("#login_box").css("display", "none");
		$("#password_box").css("display", "block");
	})

	$("#reset_button").click(function(){
		event.preventDefault();
		var email = $("#reset_email").val();
		if (email != "") {
			Parse.User.requestPasswordReset(email, {
			  success: function() {
			    $("#password_form").css("display", "none");
				$("#instructions").css("display", "block");
			  },
			  error: function(error) {
			    $("#reset_instructions").append("<p class='alert_text' id='invalid_email'>Error: " + error.message + "</p>")
			  }
			});
		} else {
				$("#reset_instructions").append("<p class='alert_text' id='no_email'>Please enter an email address. </p>")
		
		}
	});

	$("#to_login").click(function(){
		$("#login_box").css("display", "block");
		$("#password_box").css("display", "none");
	});

	$("#register_link").click(function(){
		$("#login_box").css("display", "none");
		$("#register_box").css("display", "block");
	});

	$("#register_btn").click(function(){
		event.preventDefault();
		var fname = $("#fname").val();
		var lname = $("#lname").val();
		var email = $("#register_email").val();
		var conf_email = $("#confirm_email").val();
		var password = $("#register_password").val();
		if (fname != "" & lname != "" & email != "" & conf_email != "" & password != ""  ) {
			if (email === conf_email){
				var user = new Parse.User();
				user.set("first_name", fname);
				user.set("last_name", lname);
				user.set("username", email);
				user.set("password", password);
				user.set("email", email);
				 
				user.signUp(null, {
				  success: function(user) {
				    console.log(user + "was successfully registered")
				  },
				  error: function(user, error) {
				    // Show the error message somewhere and let the user try again.
				    alert("Error: " + error.code + " " + error.message);
				  }
				});
			}
		}
	});
});
