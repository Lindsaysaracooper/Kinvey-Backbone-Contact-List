import $ from 'jquery';
import Backbone from 'backbone';
import login from './login';
import user from '../models/username';
import router from '../router';
import settings from '../settings';

function renderSignup() {
    let signup = $(`
    <div class="signup">
    <h1> Personal Contact List </h1>
    <h2> Sign Up </h2>
  	<input id = "username"
  	type="textarea" placeholder="username" value="">
  	<input id = "password" type="password" placeholder="password" value="">
  	<input id = "signupButton" type="button" name="button" value="Sign-Up">
    <p> Already signed up? Feel free to: </p>
  	<input id = "routeToLoginButton" class ="routeToLoginButton" type="button" name="button" value="Log-In">
  </div>`);

    // on click event for log-in, go to login page

    signup.find('#routeToLoginButton').on('click', function(evt) {
        evt.preventDefault();
        router.navigate('login', {
            trigger: true
        });
    });
    // on click event for login button go to contacts page

    signup.find('#signupButton').on('click', function(evt) {
        evt.preventDefault();
        let username = signup.find('#username').val();
        let password = signup.find('#password').val();
        let encrypted = btoa(settings.appId + ':' + settings.appSecret);
        // console.log(encrypted);
        $.ajax({
            type: 'POST',
            url: `https://baas.kinvey.com/user/${settings.appId}/`,
            data: JSON.stringify({
                username: username,
                password: password
            }),

            headers: {
                Authorization: `Basic ${encrypted}`
            },

            contentType: 'application/json',
            success: function(response) {
                user.username = username;
                user.authtoken = response._kmd.authtoken;
                router.navigate('contacts', {
                    trigger: true
                });
                console.log("User Created");
            },
            error: function() {
                alert("You already have an account. Please go through the log-in page");
            }

        });
    });
return signup;
}
export default renderSignup;
