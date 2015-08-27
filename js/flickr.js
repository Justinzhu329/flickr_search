 $(document).ready(function () {


    $('form').submit(function (evt) {
        evt.preventDefault();
        var $searchField = $('#search'),
            $submitButton = $('#submit'),

            // the AJAX part
            flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            animal = $searchField.val(),
            flickrOptions = {
                tags: animal,
                format: "json"
			};
        $searchField.prop("disabled", true);
        $submitButton.attr("disabled", true).val("searching...");
            

        function displayPhotos(data) {
            var photoHTML = '<ul>';

			console.log(data.items.length);
            //checking to see if we have items to be displayed.
			if (data.items.length !== 0) {
                $.each(data.items, function (i, photo) {
                    var date = new Date(photo.date_taken);
                    photoHTML += '<li class="grid-25 tablet-grid-50">';
                    photoHTML += '<a href="' + photo.link + '" class="image">';
                    photoHTML += '<img src="' + photo.media.m + '">';
                    photoHTML += '</a><p>Photo by<br>' + photo.author.slice(19, -1) + '<br>on ' 
                                                       + photo.date_taken.slice(0, 10) + ' at ' 
                                                       + photo.date_taken.slice(11, 16) + '</p></li>';
                }); // end each
                photoHTML += '</ul>';
				$('#photos').html(photoHTML);
			} else {
				$('#photos').html('<p>Unfortunately, there were no results found containing the keyword <u> ' + $searchField.val() + '</u>.</p>');
			}
			
            $searchField.prop("disabled", false);
            $submitButton.attr("disabled", false).val("Submit");
        } //end displayPhotos function


        $.getJSON(flickerAPI, flickrOptions, displayPhotos);

    }); // end submit

    //check to make sure there is data to be rendered
    //if data exists ... render to screen
    // else print message to client 




}); // end ready