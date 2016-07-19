// backbone collection creation
// store all the models

import $ from 'jquery';
import Backbone from 'backbone';
import settings from '../settings';
import Contact from '../models/contacts';

const Contacts = Backbone.Collection.extend({
model: Contact,
  url: `https://baas.kinvey.com/appdata/${settings.appId}/contacts`,

});

let contactCollection = new Contacts ();

export default contactCollection;
