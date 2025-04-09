class Tabs {

    container;
    tabs;
    activeIndex = 0;
    buttonsWrapper = null;
    contentWrapper = null;

    constructor(container, config) {
        this.container = container;
        this.tabs = config;

        this.render();

    }

render() {
    this.container.innerHTML = '';
    
    const tabsElement = document.createElement('div');
    tabsElement.classList.add('tabs');

    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('tab-buttons');

    this.tabs.forEach((tab, index) => {
    const btn = document.createElement('button');
    btn.textContent = tab.label;
    if (index === this.activeIndex) {
        btn.className = 'active';
      } else {
        btn.className = '';
      }
    btn.addEventListener('click', () => this.setActive(index));
    buttonsWrapper.appendChild(btn);
    });

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'tab-content';
    contentWrapper.innerHTML = this.tabs[this.activeIndex].content; //Dajemy zawartość dla aktywnego indeksu

    tabsElement.appendChild(buttonsWrapper);
    tabsElement.appendChild(contentWrapper);
    this.container.appendChild(tabsElement);

    this.buttonsWrapper = buttonsWrapper; //Bierzemy to stworzone lokalnie i zapisujemy na obiekcie do użycia później
    this.contentWrapper = contentWrapper; 
    }

    setActive(index) {
        this.activeIndex = index;
        console.log(this.buttonsWrapper.children);
        Array.from(this.buttonsWrapper.children).forEach((btn, i) => { //tworzymy tablicę z HTMLCollection
              btn.classList.toggle('active', i === index); //active dostaje tylko index równy klikniętemu
         });

        this.contentWrapper.innerHTML = this.tabs[index].content;
    }
}

const config = [
    { label: "Oferty", content: "Witaj" },
    { label: "Informacje w pigułce", content: "Info" },
    { label: "Opinie i recenzje", content: "<img src='img/review.jpg' alt='Profesjonalna opinia'>"},
    { label: "Zadaj pytanie", content: "Kto pyta nie błądzi." },
    { label: "Kup lokalnie", content: "Popytaj po sąsiadach czy mozę mają to, czego potrzebujesz." }
];

const container = document.getElementById('tabs-container');

new Tabs(container, config);
