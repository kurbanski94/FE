const params = new URLSearchParams(window.location.search);
const characterId = params.get("id");

async function fetchSingleCharacter() {
    try {
        const URL = `https://rickandmortyapi.com/api/character/${characterId}`;
        const response = await fetch(URL);
        const data = await response.json();
    
        displayCharacter(data);
        showEpisodes(data.episode);
    } catch (error) {
        console.error("Błąd przy pobieraniu szczegółów postaci:", error);
    }
}
fetchSingleCharacter();


function displayCharacter(data) {
    const image = document.querySelector(".character__image");
    image.src = data.image || "https://placehold.co/200x200?text=Brak+obrazka";
    image.alt = data.name;

    document.querySelector(".character__name").textContent = data.name;
    document.querySelector(".character__status").textContent = data.status;
    document.querySelector(".character__gender").textContent = data.gender;
    document.querySelector(".character__location").textContent = data.location.name;
}

async function showEpisodes(urls) {  //urls-> tablica url'i
	const data = await Promise.all(urls.map(url => fetch(url).then(response => response.json()))); //nowa tablica z odcinkami
	const list = document.querySelector(".episodes__list");
	list.innerHTML = "";
	data.forEach(ep => {
		const li = document.createElement("li");
		li.textContent = `${ep.episode} – ${ep.name}`;
		list.appendChild(li);
	});
}

document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "./rick-n-morty.html";
});

