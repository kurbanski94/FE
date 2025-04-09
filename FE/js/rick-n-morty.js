let allCharacters = [];
let currentPage = 1;
let totalPages = 1;
let currentSearch = "";

async function fetchCharacters(page = 1, name = "") {
	try {
		const URL = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`;
		const response = await fetch(URL);
		const data = await response.json();
	
		allCharacters = data.results;
		totalPages = data.info.pages;
		currentSearch = name;
	
		document.querySelector(".pagination__info").textContent = `Strona: ${currentPage}`;
	
		displayCharacters(allCharacters);
	} catch (error) {
		console.error("Błąd podczas pobierania danych:", error);
		const container = document.querySelector(".characters");
		container.innerHTML = `<p class="characters__error">Nie znaleziono wyników. Spróbuj ponownie.</p>`;
		document.querySelector(".pagination__info").textContent = `Brak wyników`;
		totalPages = 1;
	}

}
fetchCharacters(1, "");

function displayCharacters(characters) {
	const container = document.querySelector(".characters");
	container.innerHTML = "";

	characters.forEach(char => {
		const charContainer = document.createElement("a");
		charContainer.setAttribute("href", `character.html?id=${char.id}`);

		const characterDiv = document.createElement("div");
		characterDiv.classList.add("character");

		const image = document.createElement("img");
		image.src = char.image || "https://placehold.co/150x150?text=Brak+obrazka";
		image.alt = char.name;

		const name = document.createElement("div");
		name.classList.add("character__name");
		name.textContent = char.name;

		const species = document.createElement("p");
		species.textContent = char.species;

		characterDiv.appendChild(image);
		characterDiv.appendChild(name);
		characterDiv.appendChild(species);
		charContainer.appendChild(characterDiv);

		container.appendChild(charContainer);
	});
}

document.querySelector(".page-header__form").addEventListener("submit", e => {
	e.preventDefault();
	const value = document.querySelector(".page-header__input").value.trim(); //To API samo ucina białe znaki, ale warto dawać
	currentPage = 1;
	fetchCharacters(currentPage, value);
});

const prev = document.getElementById("prev").addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		fetchCharacters(currentPage, currentSearch);
	}
});

const next = document.getElementById("next").addEventListener("click", () => {
	if (currentPage < totalPages) {
		currentPage++;
		fetchCharacters(currentPage, currentSearch);
	}
});
