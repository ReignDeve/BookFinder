const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const bookList = document.getElementById('book-list');
const loadingAnimation = document.getElementById('loading-animation');

// Replace 'YOUR_API_KEY' with your actual Google API key
const apiKey = 'YOUR_API_KEY';

searchButton.addEventListener('click', searchBooks);

function searchBooks() {
  const query = searchInput.value;
  if (query.trim() === '') {
    alert('Please enter a search query.');
    return;
  }

  bookList.innerHTML = '';
  // loadingAnimation.classList.remove('hidden');

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?key=${apiKey}&q=${encodeURIComponent(query)}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
     
      displayBooks(data);
    })
    .catch(error => {

      console.error('Error:', error);
    });
}

function displayBooks(data) {
  if (!data.items || data.items.length === 0) {
    bookList.innerHTML = 'No books found.';
    return;
  }

  const books = data.items;
  const bookRow = document.createElement('div');
  bookRow.classList.add('book-row');

  books.forEach(book => {
    const volumeInfo = book.volumeInfo;
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');

    const image = document.createElement('img');
    image.src = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
    bookItem.appendChild(image);

    const title = document.createElement('p');
    const titleLink = document.createElement('a');
    titleLink.href = volumeInfo.infoLink;
    titleLink.textContent = volumeInfo.title;
    title.appendChild(titleLink);
    bookItem.appendChild(title);

    const author = document.createElement('p');
    author.textContent = `Author: ${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}`;
    bookItem.appendChild(author);

    const publishedDate = document.createElement('p');
    publishedDate.textContent = `Published Date: ${volumeInfo.publishedDate ? volumeInfo.publishedDate : 'Unknown'}`;
    bookItem.appendChild(publishedDate);

    bookRow.appendChild(bookItem);
  });

  bookList.appendChild(bookRow);
}
