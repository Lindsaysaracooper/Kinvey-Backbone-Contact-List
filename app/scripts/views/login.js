import $ from 'jquery';
import Backbone from 'backbone';
import signup from './signup';
import user from '../models/username';
import router from '../router';
import settings from '../settings';

function renderLogin() {
    let login = $(`
  <div class="loginPage">
  <h1> Personal Contact List </h1>
  <h2> Log In </h2>
	<input id = "usernameLogIn"
	type="textarea" placeholder="username" value="">
	<input id = "passwordLogIn" type="password" placeholder="password" value="">
	<input id = "loginButton" type="button" name="button" value="Log-In">
  <p> Haven't created an account? Feel free to:</p>
	<input id = "routeToSignupButton" type="button" name="button" value="Sign-Up">
</div>`);

    // on click event for sign-in, go to signin page

    login.find('#routeToSignupButton').on('click', function(evt) {
        evt.preventDefault();
        router.navigate('signup', {
            trigger: true
        });

    });
    // on click event for login button go to contacts page

    login.find('#loginButton').on('click', function(evt) {
        evt.preventDefault();
        let username = login.find('#username').val();
        let password = login.find('#password').val();
        let encrypted = btoa(settings.appId + ':' + settings.appSecret);
        // console.log(encrypted);
        $.ajax({
            type: 'POST',
            url: `https://baas.kinvey.com/user/${settings.appId}/#login`,
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
                console.log("You Logged In");
            },
            error: function() {
                alert("Looks like you don't have an account. Please sign up first");
            }

    });
  });

return login;
}
export default renderLogin;
