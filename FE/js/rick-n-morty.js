let allCharacters = [];
let currentPage = 1;
let totalPages = 1;
let currentSearch = "";

async function fetchCharacters(page = 1, name = "") {
	try {
		const URL = `https://rickandmortyapi.com/api/character?page=${page}&name=${encodeURIComponent(
			name
		)}`;
		const response = await fetch(URL);
		if (!response.ok) throw new Error("Brak wyników");
		const data = await response.json();
		//inaczej:
		//fetch(URL).then(response => response.json().then(data => {}));

		totalPages = data.info.pages;
		currentPage = page;
		currentSearch = name;

		document.getElementById(
			"pageInfo"
		).innerText = `Strona: ${currentPage} / ${totalPages}`;
		displayCharacters(data.results);
		toggleButtons();
	} catch (error) {
		document.getElementById(
			"characters"
		).innerHTML = `<p>Nie znalezion postaci.</p>`;
		document.getElementById("pageInfo").innerText = "";
		totalPages = 1;
		toggleButtons();
	}
}

function displayCharacters(characters) {
	const container = document.getElementById("characters");
	container.innerHTML = "";

	characters.forEach(character => {
		const characterDiv = document.createElement("div");
		characterDiv.className = "character";

		const imageUrl = character.image || "https://placehold.co/150x150?text=Brak+obrazka";

		characterDiv.addEventListener('click', () => {
			window.location.href = `character.html?id=${character.id}`;
		})

		characterDiv.innerHTML = `
              <img src="${imageUrl}" alt="${character.name}" onerror="this.src='https://placehold.co/150x150?text=Brak+obrazka';">
              <p><strong>${character.name}</strong></p>
              <p>${character.species}</p>
            `;

		container.appendChild(characterDiv);
	});
}

function toggleButtons() {
	document.getElementById("prev").disabled = currentPage <= 1;
	document.getElementById("next").disabled = currentPage >= totalPages;
}

document.getElementById("search").addEventListener("keydown", e => {
	if (e.key === "Enter") {
		const searchValue = e.target.value.trim();
		fetchCharacters(1, searchValue);
	}
});

document.getElementById("prev").addEventListener("click", () => {
	if (currentPage > 1) fetchCharacters(currentPage - 1, currentSearch);
});

document.getElementById("next").addEventListener("click", () => {
	if (currentPage <= totalPages)
		fetchCharacters(currentPage + 1, currentSearch);
});

fetchCharacters();
