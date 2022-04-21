
function bouwSite(data){
    let main = document.getElementById("mainCardDink")
    console.log(data[0])
    for(let i = 0; i < data.length; i++){
        console.log(data[i])
        //maak nieuwe div en zet daar alle bucht in
        let divDink = document.createElement('div');
        divDink.classList.add("card");
        divDink.classList.add("mb-4");

        let cardHeader = document.createElement('div')
        cardHeader.classList.add("card-header");
        cardHeader.innerText = data[i].title

        divDink.appendChild(cardHeader)

        let cardbody = document.createElement('div')
        cardbody.classList.add("card-body");

        let cardText = document.createElement('p')
        cardText.classList.add("card-text");
        cardText.innerText = data[i].content

        let cardLink = document.createElement('a')
        cardLink.classList.add("btn");
        cardLink.classList.add("btn-primary");
        cardLink.innerText = "Read More"
        cardLink.href = "/blogs/" + data[i].id


        cardbody.appendChild(cardText)
        cardbody.appendChild(cardLink)

        divDink.appendChild(cardbody)

        //geef de main dien div
        main.appendChild(divDink)
    }
}

fetch("posts", {
    method: "GET",
})
.then(response => response.json())
.then(json => bouwSite(json))
.catch(error => console.log(error))