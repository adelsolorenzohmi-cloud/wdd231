// Grab the current URL
const currentUrl = window.location.href;

// Split the URL into two halves at the '?'
const everything = currentUrl.split('?');

// Grab just the second half (the parameters)
let formData = everything[1].split('&');

function show(cup) {
    let result = "";
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = decodeURIComponent(element.split('=')[1]).replace(/\+/g, ' ');
        }
    });
    return result;
}

// Select the results container
const showInfo = document.querySelector('#results');

// Display the data
showInfo.innerHTML = `
    <p><strong>Name:</strong> ${show("fname")} ${show("lname")}</p>
    <p><strong>Email:</strong> <a href="mailto:${show("email")}">${show("email")}</a></p>
    <p><strong>Phone:</strong> ${show("phone")}</p>
    <p><strong>Organization:</strong> ${show("org")}</p>
    <p><strong>Membership Level:</strong> ${show("membership")}</p>
    <p><strong>Timestamp:</strong> ${show("timestamp")}</p>
`;