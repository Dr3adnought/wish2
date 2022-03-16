// know when a user submits our #destination_form form
const destination_form = document.getElementById("destination_form")

destination_form.addEventListener("submit", handleFormSubmit);

// OR
// document.getElementById("destination_form").addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
    // 1. pause the submit refresh behavior (orevent default behavior of the form => preventDefault method)

    event.preventDefault()
    // console.log("form submitted");
    
    // 2. get user input from the input fields & save them in variables
    
    var destination = document.getElementById("destination_name").value
    var location = document.getElementById("location_name").value
    var photo_url = document.getElementById("photo_url").value
    var description = document.getElementById("description").value
    
    console.log(destination, location, photo_url, description);


    destination_form.reset();
    // document.getElementById("destination_form").reset();

    createCard({
        destination,
        location,
        photo_url,
        description
    });
    
    
    // 3. Put the values of the variables in a card
    // &
    // 4. Display the card on the page (inside the #cards_container div)
    function createCard({ description, photo_url, destination, location }) {
        console.log(location, destination, description, photo_url);

        /*
        <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>

        */

        // create <div> element
        var card = document.createElement("div");  // <-- same as <div></div>

        // set attribute of class of div as 'card'
        card.setAttribute("class", "card");          // <-- same as adding class="card" inside <div>, so <div class="card">

        // set style of div to 'width: 18rem'
        card.style.width = "18rem";                  // <-- same as CSS version of card { width: 18rem }

        // set margin on card to 15px
        card.style.margin = "15px";

        
        // append as a child to the card container
        document.querySelector("#cards_container").appendChild(card);
        // document.getElementById("cards_container").appendChild(card)  // <-- effectively the same as line above


        // create <img> element
        var img = document.createElement("img");

        // set attribute of class of img as 'card-img-top' <-- places img as the top section of the card
        img.setAttribute("class", "card-img-top");
        
        // set attribute of alt of img as 'img_name'
        img.setAttribute("alt", name);

        // set style of photo, to keep cards uniform
        img.style.height = "185px";
        
        
        // check to see if user did / didn't submit optional photo
        
        // set a default photo if one is not submitted by user
        var defaultPhotoUrl = "https://imageio.forbes.com/specials-images/imageserve/5f709d82fa4f131fa2114a74/solo-women-travel-female-travel/960x0.jpg?fit=bounds&format=jpg&width=960";
        
        if (photo_url.length === 0) {                   // <-- checks if no submission
            img.setAttribute("src", defaultPhotoUrl);   // <-- sets to default if no submission
        } else {
            img.setAttribute("src", photo_url);         // <-- sets submission as photo if photo submitted
        }
        // append img to card
        card.appendChild(img);
        
        
        // create div for card body
        var cardBody = document.createElement("div");
        
        // set attribute of class to 'card-body'
        cardBody.setAttribute("class", "card-body");
        
        // create h5 for card title
        var cardTitle = document.createElement("h5");
        
        //set attribute of class to 'card-title' (destination)
        cardTitle.setAttribute("class", "card-title");
        
        // set innerText to 'destinationName'
        cardTitle.innerText = destination;
        
        // append cardTitle to cardBody
        cardBody.appendChild(cardTitle);
        
        // create h6 for 'card-subtitle' (location)
        var cardSubTitle = document.createElement("h6");
        
        //set attribute of class to 'card-subTitle'
        cardSubTitle.setAttribute("class", "card-subTitle");
        
        // set innerText to 'locationName'
        cardSubTitle.innerText = location;
        
        // append cardTitle to cardBody
        cardBody.appendChild(cardSubTitle);
        console.log(cardBody.children);
        
        // check to see if user submitted descriptionand enter as <p> if so
        if (description.length !== 0) {
            var cardText = document.createElement("p");
            
            // set attribute of class of <p> as 'card-text'
            cardText.setAttribute("class", "card-text");
            
            // set user submitted description as description
            cardText.innerText = description;
            
            // append cardBody with new info from cardText
            cardBody.appendChild(cardText)
        }
        
        // create a div for a button
        var buttonContainer = document.createElement("div");  // <-- creating a div for the button(s).

        // TODO: align buttons to bottom
        buttonContainer.style.alignItems = "baseline";  // <-- failed attempt to set buttons in a fixed position off the baseline of the card, instead of floating aimlessly
        
        // set attribute of class of <div>
        buttonContainer.setAttribute("class", "button_container");
        
        var cardEditButton = document.createElement("button");       // creates button element, for Edit button
        cardEditButton.setAttribute("class", "btn btn-secondary");   // sets attribute as class, bootstrap preformatted button
        cardEditButton.innerText = "Edit";                           // labels button
        cardEditButton.addEventListener("click", editDestination);   // indicates when to activate (on click)
        
        var cardDeleteButton = document.createElement("button");     // creates button element, for Edit button
        cardDeleteButton.setAttribute("class", "btn btn-dark");      // sets attribute as class, bootstrap preformatted button
        cardDeleteButton.innerText = "Delete";                       // labels button
        cardDeleteButton.addEventListener("click", deleteDestination);// indicates when to activate (on click)
        
        buttonContainer.appendChild(cardEditButton);    // appends (adds) child edit button to buttonContainer
        buttonContainer.appendChild(cardDeleteButton);  // appends (adds) child delete button to buttonContainer
        cardBody.appendChild(buttonContainer);          // appaends (adds) child buttonContainer (which contains edit, delete) to cardBody
        
        card.appendChild(cardBody);   // appends (adds) cardBody onto card itself
        console.log(cardBody.children);

        return card;        // shows card
    }
    
    // function to edit data on a card, when edit button is selected
    function editDestination(event) {
        var cardBody = event.target.parentElement.parentElement;  // <-- target cardBody identified
        var title = cardBody.children[0];           // <-- title (destination) to be edited
        var subTitle = cardBody.children[1];        // <-- subTitle (location) to be edited
        var cardText = cardBody.children[2];        // <-- cardText (description) to be edited
        var card = cardBody.parentElement;          // <-- target card identified
        var photoUrl = card.children[0];            // <-- photoUrl (photo_url) to be edited
        
        // add something here to ask what to edit, give user choice to edit what they want
        // adjust code below to only edit the item the user wants to edit rather than have them edit all of it
        
        var newTitle = window.prompt("Enter destination name: ");   // prompt asking for user input
        var newSubTitle = window.prompt("Enter location name: ");   // prompt asking for user input
        var newPhotoUrl = window.prompt("Enter link for photo: ");  // prompt asking for user input
        var newCardText = window.prompt("Enter description: ");     // prompt asking for user input
        
        if (newTitle.length !== 0) {    // <-- any user submission at destination prompt will overwrite old destination
            title.innerText = newTitle; // <-- overwriting of old title (destination) data
        }
        if (newSubTitle.length !== 0) {         // <-- any user submission at location prompt will overwrite old locaation
            subTitle.innerText = newSubTitle;   // <-- overwriting of old subTitle (location) data
        }
        if (newCardText.length !== 0) {         // <-- any user submission at description prompt will overwrite old description
            cardText.innerText = newCardText;   // <-- overwriting of old cardText (description) data
        }
        if (newPhotoUrl.length !== 0) {                 // <-- an user submitted link overwrites previously submitted or empty link
            photoUrl.setAttribute("src", newPhotoUrl);  // <-- setting new URL as attribute
        }
    }
    
    function deleteDestination(event) {             // <-- the function that happens when delete button is click
        var cardBody = event.target.parentElement.parentElement;  // <-- identifies cardBody as target to delete
        var card = cardBody.parentElement           // <-- identifies that entire cardBody on parent card will be deleted
        card.remove();                              // <-- deletes card
    }
}




    





