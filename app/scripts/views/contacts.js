import $ from 'jquery';
import Backbone from 'backbone';
import user from '../models/username';
import settings from '../settings';
import contactCollection from '../collections/contacts';


function renderContacts() {

    let contacts = $(
        `<div class="Contacts">

<div class="createContact">
	<h1>Create a New Contact</h1>
	<form>
			 <input id = "contactName" type="textarea" name="name" class="newContactName" placeholder="Contact Name">
			 <input id = "nickname" type="textarea" name="nickname " class="newContactNickname" placeholder="Nickname">
			 <input id = "email" type="textarea" name="email" class="newContactEmail" placeholder="Email Address">
			 <input id = "number" type="textarea" name="number" class="newContactNumber" placeholder="Phone Number">
			 <input id = "add" type="submit" name="submit" value="Add to Contact List">

	</form>

</div>
<div class="SavedContacts">
	<h1>List of Contacts</h1>
	<ul></ul>

</div>
</div>`);
    contactCollection.fetch({
        headers: {
            Authorization: `Kinvey ${user.authtoken}`
        }
    });

    contacts.find("#add").on('click', function(evt) {
        evt.preventDefault();
        let contactName = contacts.find('#contactName').val();
        let nickname = contacts.find('#nickname').val();
        let email = contacts.find('#email').val();
        let number = contacts.find('#number').val();
        let encrypted = btoa(settings.appId + ':' + settings.appSecret);

        contactCollection.create({
            contactName: contactName,
            nickname: nickname,
            email: email,
            number: number
        }, {
            headers: {
                Authorization: `Kinvey ${user.authtoken}`
            }
        });


    });

    contactCollection.on('add', function(model, collection, evt) {
        $('ul').append($('<li>' + model.get( 'contactName' ) + '</li>'));
                // console.log(signup);

});

    // The below was removed because i used a collection and consolidated all the information to the above create()

    // $.ajax({
    //     type: 'POST',
    //     url: `https://baas.kinvey.com/appdata/${settings.appId}/contacts`,
    //     data: JSON.stringify({
    //         contactName: contactName,
    //         nickname: nickname,
    //         email: email,
    //         number: number
    //     }),
    //
    //     headers: {
    //         Authorization: `Kinvey ${user.authtoken}`
    //     },
    //
    //     contentType: 'application/json',
    //     success: function(response) {
    //         console.log("yas queen");
    //     }
    // });

    return contacts;
}

export default renderContacts;
