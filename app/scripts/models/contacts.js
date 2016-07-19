// actual backbone model prototype
import $ from 'jquery';
import Backbone from "backbone";
import settings from "../settings";

const Contact = Backbone.Model.extend({
idAttribute: '_id',
urlRoot:`https://baas.kinvey.com/appdata/${settings.appId}/contacts`,
defaults: {
  contactName: '',
  nickname: '',
  email: '',
  number: ''
}

});

export default Contact;
