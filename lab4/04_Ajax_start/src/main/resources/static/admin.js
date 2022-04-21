init()

function formSubmit(event){
    event.preventDefault();

    let title = document.getElementById("txtTitle").value;
    let content = document.getElementById("txtContent").value;

    fetch("/posts", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"title": title, "content": content})
    })
        .then(() => {
            success("Added blogpost");
            clearFields();
            refreshTable();
        })
        .catch(() => {
            fail("Error adding blogpost")
        });

}

let clearFields = () => {
    let titleForm = document.getElementById("txtTitle");
    titleForm.value = ""
    let contentForm = document.getElementById("txtContent");
    contentForm.value = ""


};
let success = (message) => {
    let succesAlert = document.getElementById("success_alert");
    succesAlert.style.display = "block"
    succesAlert.innerText = message;

    let failAlert = document.getElementById("fail_alert");
    failAlert.style.display = "none"
};
let fail = (message) => {
    let succesAlert = document.getElementById("success_alert");
    succesAlert.style.display = "none"


    let failAlert = document.getElementById("fail_alert");
    failAlert.style.display = "block"
    failAlert.innerText = message;
};

let refreshTable = () => {
    fetch("posts", {
        method: "GET",
    })
        .then(response => response.json())
        .then(json => bouwTabel(json))
        .catch(error => console.log(error))
};

function bouwTabel(data){
    console.log(data[0])


    let tabel = document.getElementById("recentPostsTable");
    for(let i = 0; i < data.length; i++){
        console.log( data[i].title)
        let tr = document.createElement('tr')
        tr.dataset.id = data[i].uuid

        let titelTd = document.createElement('td')
        titelTd.textContent = data[i].title

        let deleteTd = document.createElement('td')
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn_delete");
        deleteButton.textContent = "delete"
        deleteButton.setAttribute("onclick", "deleteHandler(this)");
        deleteTd.appendChild(deleteButton)



        let editTd = document.createElement('td')
        let editButton = document.createElement("button");
        editButton.classList.add("btn_edit");
        editButton.textContent = "edit"
        editButton.setAttribute("onclick", "editHandler(this)"); // werkt niet via editHandler (zonder quotes en haakjes en parameter)

        editTd.appendChild(editButton)

        tr.appendChild(titelTd)
        tr.appendChild(deleteTd)
        tr.appendChild(editTd)
        tabel.appendChild(tr)

    }
}

function deleteHandler(id){
    alert(id)
}
function editHandler(id){
    alert(id)

}

function init(){
    let succesAlert = document.getElementById("success_alert");
    succesAlert.style.display = "none"
    let failAlert = document.getElementById("fail_alert");
    failAlert.style.display = "none"

    let submitKnop = document.getElementById("submitKnop")
    submitKnop.addEventListener('click', formSubmit)
}