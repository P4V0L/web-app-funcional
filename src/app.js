document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (!isLoggedIn() && !path.includes('login.html') && !path.includes('register.html')) {
        window.location.href = 'login.html';
        return;
    }

    if (path.includes('books.html')) {
        fetchBooks();
    } else if (path.includes('characters.html')) {
        fetchCharacters();
    } else if (path.includes('book-details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const bookIndex = urlParams.get('index');
        fetchBookDetails(bookIndex);
    } else if (path.includes('character-details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const characterIndex = urlParams.get('index');
        fetchCharacterDetails(characterIndex);
    } else if (path.includes('login.html')) {
        setupLogin();
    } else if (path.includes('register.html')) {
        setupRegister();
    }

    checkLoginStatus();
});

function isLoggedIn() {
    return sessionStorage.getItem('userEmail') !== null;
}

function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const user = JSON.parse(localStorage.getItem(email));
        if (user && decryptPassword(user.password) === password) {
            sessionStorage.setItem('userEmail', email);
            window.location.href = 'index.html';
        } else {
            alert('Correo electrónico o contraseña incorrectos.');
        }
    });
}

function setupRegister() {
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (validateEmail(email) && password === confirmPassword) {
            const encryptedPassword = encryptPassword(password);
            const user = { name, email, password: encryptedPassword };
            localStorage.setItem(email, JSON.stringify(user));
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        } else {
            if (!validateEmail(email)) {
                document.getElementById('registerEmail').classList.add('is-invalid');
            }
            if (password !== confirmPassword) {
                document.getElementById('registerConfirmPassword').classList.add('is-invalid');
            }
        }
    });
}

function encryptPassword(password) {
    return CryptoJS.AES.encrypt(password, 'secret key 123').toString();
}

function decryptPassword(encryptedPassword) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'secret key 123');
    return bytes.toString(CryptoJS.enc.Utf8);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function checkLoginStatus() {
    const userEmail = sessionStorage.getItem('userEmail');
    const loginButtonContainer = document.getElementById('loginButtonContainer');
    const profileDropdownContainer = document.getElementById('profileDropdownContainer');
    const userEmailDisplay = document.getElementById('userEmailDisplay');

    if (userEmail) {
        loginButtonContainer.classList.add('d-none');
        profileDropdownContainer.classList.remove('d-none');
        userEmailDisplay.textContent = userEmail;
    } else {
        loginButtonContainer.classList.remove('d-none');
        profileDropdownContainer.classList.add('d-none');
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('userEmail');
            window.location.href = 'login.html';
        });
    }
}

async function fetchBooks() {
    try {
        const res = await fetch('https://potterapi-fedeperin.vercel.app/es/books');
        const books = await res.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function displayBooks(books) {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';

    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item', 'col-md-4');

        const bookCover = document.createElement('img');
        bookCover.src = book.cover;
        bookCover.alt = book.title;

        const bookTitle = document.createElement('div');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = book.title;

        const bookLink = document.createElement('a');
        bookLink.classList.add('book-link')
        bookLink.href = `book-details.html?index=${index}`;
        bookLink.textContent = 'View Details';

        bookItem.appendChild(bookCover);
        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookLink);

        booksList.appendChild(bookItem);
    });
}

async function fetchCharacters() {
    try {
        const res = await fetch('https://potterapi-fedeperin.vercel.app/es/characters');
        const characters = await res.json();
        displayCharacters(characters);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

function displayCharacters(characters) {
    const charactersList = document.getElementById('characters-list');
    charactersList.innerHTML = '';

    characters.forEach((character, index) => {
        const characterItem = document.createElement('div');
        characterItem.classList.add('character-item', 'col-md-4');

        const characterImage = document.createElement('img');
        characterImage.src = character.image;
        characterImage.alt = character.fullName;

        const characterName = document.createElement('div');
        characterName.classList.add('character-name');
        characterName.textContent = character.fullName;

        const characterLink = document.createElement('a');
        characterLink.classList.add('character-link')
        characterLink.href = `character-details.html?index=${index}`;
        characterLink.textContent = 'View Details';

        characterItem.appendChild(characterImage);
        characterItem.appendChild(characterName);
        characterItem.appendChild(characterLink);

        charactersList.appendChild(characterItem);
    });
}

async function fetchBookDetails(index) {
    try {
        const res = await fetch(`https://potterapi-fedeperin.vercel.app/es/books`);
        const books = await res.json();
        const book = books[index];
        displayBookDetails(book);
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
}

function displayBookDetails(book) {
    const bookDetails = document.getElementById('book-details');
    bookDetails.innerHTML = '';

    const bookCover = document.createElement('img');
    bookCover.src = book.cover;
    bookCover.alt = book.title;
    bookCover.classList.add('col-md-4');

    const bookInfo = document.createElement('div');
    bookInfo.classList.add('col-md-8', 'book-info');

    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;

    const bookOriginalTitle = document.createElement('p');
    bookOriginalTitle.textContent = `Título Original: ${book.originalTitle}`;

    const bookDescription = document.createElement('p');
    bookDescription.textContent = book.description;

    const bookReleaseDate = document.createElement('p');
    bookReleaseDate.textContent = `Fecha de Publicación: ${book.releaseDate}`;

    const bookPages = document.createElement('p');
    bookPages.textContent = `Páginas: ${book.pages}`;

    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookOriginalTitle);
    bookInfo.appendChild(bookDescription);
    bookInfo.appendChild(bookReleaseDate);
    bookInfo.appendChild(bookPages);

    bookDetails.appendChild(bookCover);
    bookDetails.appendChild(bookInfo);
}

async function fetchCharacterDetails(index) {
    try {
        const res = await fetch(`https://potterapi-fedeperin.vercel.app/es/characters`);
        const characters = await res.json();
        const character = characters[index];
        displayCharacterDetails(character);
    } catch (error) {
        console.error('Error fetching character details:', error);
    }
}

function displayCharacterDetails(character) {
    const characterDetails = document.getElementById('character-details');
    characterDetails.innerHTML = '';

    const characterImage = document.createElement('img');
    characterImage.src = character.image;
    characterImage.alt = character.fullName;
    characterImage.classList.add('col-md-4');

    const characterInfo = document.createElement('div');
    characterInfo.classList.add('col-md-8', 'character-info');

    const characterName = document.createElement('h2');
    characterName.classList.add('character-name');
    characterName.textContent = character.fullName;

    const characterNickname = document.createElement('p');
    characterNickname.textContent = `Apodo: ${character.nickname}`;

    const characterHouse = document.createElement('p');
    characterHouse.textContent = `Casa: ${character.hogwartsHouse}`;

    const characterActor = document.createElement('p');
    characterActor.textContent = `Interpretado por: ${character.interpretedBy}`;

    const characterBirthdate = document.createElement('p');
    characterBirthdate.textContent = `Fecha de Nacimiento: ${character.birthdate}`;

    const characterChildren = document.createElement('p');
    characterChildren.textContent = `Hijos: ${character.children.join(', ')}`;

    characterInfo.appendChild(characterName);
    characterInfo.appendChild(characterNickname);
    characterInfo.appendChild(characterHouse);
    characterInfo.appendChild(characterActor);
    characterInfo.appendChild(characterBirthdate);
    characterInfo.appendChild(characterChildren);

    characterDetails.appendChild(characterImage);
    characterDetails.appendChild(characterInfo);
}
