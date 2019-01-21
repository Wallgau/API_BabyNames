const printName = (feedBack) => {
    // ce que je vais mettre dans mon html, je crée une fonction pour la réutiliser dans la fonction feedBackName, ça évite de se répéter
    //to avoid repeat this for each condition, I will just return it in feedBackName for each condition
    $('#answer').css("display", "block")
    const retour = $('#answer').text("Wonderful! your babyname is " + feedBack);

}




const feedBackName = (babyNames) => {
    if (babyNames.length === 0) { //if it is not in the API result, then it is original
        //si il y a aucune valeur correspondante dans les resultats API
        return printName("original")
    }
    const isOlderThan2000 = babyNames.filter(function(item) {
            //to get the 4 first string
            //récupérer les 4 premier élément de year
            const babyYear = item.year.substring(0, 4);
            //transformer en chiffre
            //transform string to integer
            const yearNumber = parseInt(babyYear);
            // ici il faut qu'il soit supérieur à 2000
            //condition > 2000, if this name is used only before the year 2000 it means is traditional
            return yearNumber < 2000
                //si dans mes resultats API, il y a des nom correspondant à la condition ci dessus alors l'index devrait être supérieur à zéro
                //if there is a results so if its length > 0 mean true
        }).length > 0
        //same function but it's for > 2000 so popular
    const isYoungerThan2000 = babyNames.filter(function(item) {
            const babyYear = item.year.substring(0, 4);
            const yearNumber = parseInt(babyYear); //même raisonnement
            return yearNumber > 2000
        }).length > 0
        //ici on établit les conditions
        //here we establish the conditions
    if (isOlderThan2000 && isYoungerThan2000) {
        return printName('timeless')
    } else if (isOlderThan2000) {
        return printName('traditional')
    } else if (isYoungerThan2000) {
        return printName('Popular')
    }
}


//first request API to get the name
function getBabyName(name) { // API request function

    $.ajax({
        url: `https://data.novascotia.ca/resource/emf8-vmuy.json?`,
        type: "GET",
        data: {
            "$limit": 10000,
            "$$app_token": "whW6hkBV9XeQn2RtJhqKb9pzA",
            "first_name": name.toUpperCase(),
        }

    }).then(function(name) { //when I got my results
        console.log(name)
        feedBackName(name); //then run feedBack function

    });


}
//second request to get the sex, I had issue to do with only one request function so I try this and it works
function getGender(sex) { // API request function

    $.ajax({
        url: `https://data.novascotia.ca/resource/emf8-vmuy.json?`,
        type: "GET",
        data: {
            "$limit": 10000,
            "$$app_token": "whW6hkBV9XeQn2RtJhqKb9pzA",
            "sex": sex
        }

    }).then(function(sex) { //when I got my results
        nameByGender(sex);
        //then run feedBack function

    });
}

function ideaButtonEvent() {
    // code for the event listerner
    $('#ideaButton').on('click', function(event) {
        event.preventDefault();
        console.log('hi')
            // when the gender is checked
        const ideaName = $('input[type=radio]:checked').val();
        // make your ajax call (passing the ideaName to it)
        getGender(ideaName); //
    });

}
//this function is to get name randomly according to the gender choice
const nameByGender = (genderName) => {
        const numberName = genderName.length;
        console.log(numberName)
        for (i = 0; i < numberName; i++) {
            const randNumberName = genderName[Math.floor(Math.random() * numberName)];
            const sexName = randNumberName.first_name;
            console.log(sexName)
            return getNameBySex(sexName)
        }

    }
    //make it appear on the page
const getNameBySex = (backnames) => {
        const retour = $("#randyName").append(function() {
            $(this).text(backnames);
            $('#listnames').css("display", "block")
            $('#answer').css("display", "none")
        });

    }
    // this function is for the second form, the one which check what kind of name is your babyname
function checkButtonEvent() {
    // code for the event listerner
    $('#check-button').on('click', function(event) {
        event.preventDefault();
        // get the information - baby name
        const requestedName = $('#myname').val();
        // make your ajax call (passing the name to it)
        getBabyName(requestedName); //
        $('#listnames').css("display", "none")
    });

}


$(function() {
    init()
})

function init() {
    checkButtonEvent();
    ideaButtonEvent();
}