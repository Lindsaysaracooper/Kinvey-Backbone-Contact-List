import $ from 'jquery';
import Backbone from 'backbone';
import signup from './views/signup';
import login from './views/login';
import contacts from './views/contacts';

const Router = Backbone.Router.extend({

routes: {
  signup: 'signupFunction',
  login: 'loginFunction',
  contacts: 'contactsFunction'
},

signupFunction: function (){
  $('.container').empty().append(signup());
// console.log(signup);
},

loginFunction: function (){
$('.container').empty().append(login());
// console.log(login);
},

contactsFunction: function (){
$('.container').empty().append(contacts());

}

});


const router = new Router ();

export default router;
