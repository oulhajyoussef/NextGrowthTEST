var data; // this variable will be used to prepare the users informations before adding them to the html table

let users = [
    {
        id: "123456789",
        createdDate: "2021-01-06T00:00:00.000Z",
        status: "En validation",
        firstName: "Mohamed",
        lastName: "Taha",
        userName: "mtaha",
        registrationNumber: "2584",
    },
    {
        id: "987654321",
        createdDate: "2021-07-25T00:00:00.000Z",
        status: "Validé",
        firstName: "Hamid",
        lastName: "Orrich",
        userName: "horrich",
        registrationNumber: "1594",
    },
    {
        id: "852963741",
        createdDate: "2021-09-15T00:00:00.000Z",
        status: "Rejeté",
        firstName: "Rachid",
        lastName: "Mahidi",
        userName: "rmahidi",
        registrationNumber: "3576",
    }
];

/* this class is used to add new user to the users table */
class User {
    constructor(id, createdDate, status, firstName, lastName, userName, registrationNumber) {
        this.id = id;
        this.createdDate = createdDate;
        this.status = status;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.registrationNumber = registrationNumber;
    }
}

/* fetching the users object to the html table */
init();

/* preparing and adding data to the body's table */
function init() {
    data = "<tr>";
    users.forEach(element => {
        data += "<td>" + element.id + "</td>";
        // to fix the creation date format
        console.log(element.createdDate);
        var date = new Date(element.createdDate);
        if (!isNaN(date)) {
            data += "<td>" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "</td>";
        } else {
            data += "<td></td>";
        }
        //to change the background color acording to the format status value
        switch (element.status) {
            case "En validation":
                data += "<td><span class=\"on-validation\">" + element.status + "</span></td>";
                break;
            case "Validé":
                data += "<td><span class=\"valide\">" + element.status + "</span></td>";
                break;
            case "Rejeté":
                data += "<td><span class=\"rejected\">" + element.status + "</span></td>";
                break;
            default:
                data += "<td><span>" + element.status + "</span></td>";
        };

        data += "<td>" + element.lastName + "</td>"
            + "<td>" + element.firstName + "</td>"
            + "<td>" + element.userName + "</td>"
            + "<td>" + element.registrationNumber + "</td>"
            + "<td class=\"trash-icon-container\"><a onClick=\"Delete(this)\" class=\"trash-icon\"> &#128465; </a></td></tr>";
    });
    console.log(users);
    document.querySelector('#users').innerHTML = data;
}

/* adding user to the users table and fitching data to the html table  */
function UserSubmitFunction() {
    // preparing user class properties
    var id = getMaxId() + 1;
    var createdDate = new Date(document.getElementById('date-creation').value);
    var status = document.getElementById('etat').value;
    var firstName = document.getElementById('nom').value;
    var lastName = document.getElementById('prenom').value;
    var userName = document.getElementById('nom-utilisateur').value;
    var registrationNumber = document.getElementById('matricule').value;

    // storing inputs in a user object
    var user = new User(id, createdDate, status, firstName, lastName, userName, registrationNumber);

    // saving the user object in the initial users table
    users.push(user);

    // fetching users table in the html table
    init();

    //closing the popup form
    closeForm();

    // clear the inputs values
    document.getElementById('date-creation').value = '';
    document.getElementById('etat').value = '';
    document.getElementById('nom').value = '';
    document.getElementById('prenom').value = '';
    document.getElementById('nom-utilisateur').value = '';
    document.getElementById('matricule').value = '';

    // this line is to prevent the page from reload
    return false;

}

// delete function
function Delete(td) {
    // getting the row corresponding to the clicked trash icon
    row = td.parentElement.parentElement;
    // remove the user from the users table
    users.splice(row.rowIndex - 1, 1);
    // display the new users table to the console
    console.log(users);
    // removing the user (line) from the html table
    document.getElementById('users').deleteRow(row.rowIndex - 1);
}

// Get the maximum id from the users table in order to increment it for the next user is
function getMaxId() {
    // if the users array is empty the function returns 0 as maximum id
    if (users.length === 0) {
        return 0;
    }
    // if the users array is not empty the fuction returns the maximum id 
    const ids = users.map(object => {
        return object.id;
    });
    return max = Math.max(...ids);
}

/* opening the popup form function */
function openForm() {
    document.getElementById("section-form-add").style.opacity = "1";
    document.getElementById("section-form-add").style.visibility = "visible";
    document.getElementById("section-form-add").style.display = "block";

    document.getElementById("utility-black-bg").style.opacity = "1";
    document.getElementById("utility-black-bg").style.visibility = "visible";
    document.getElementById("utility-black-bg").style.display = "block";
}

/* closing the popup form function */
function closeForm() {
    document.getElementById("section-form-add").style.opacity = "0";
    document.getElementById("section-form-add").style.visibility = "hidden";
    document.getElementById("section-form-add").style.display = "none";

    document.getElementById("utility-black-bg").style.opacity = "0";
    document.getElementById("utility-black-bg").style.visibility = "hidden";
    document.getElementById("utility-black-bg").style.display = "none";
}