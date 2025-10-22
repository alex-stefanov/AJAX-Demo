async function searchBooks() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (query === '') {
        resultsContainer.innerHTML = '<p class="text-danger">Моля, въведете търсен текст.</p>';
        return;
    }

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.docs.length === 0) {
            resultsContainer.innerHTML = '<p class="text-warning">Няма намерени резултати.</p>';
            return;
        }

        data.docs.slice(0, 10).forEach(book => {
            const title = book.title;
            const author = book.author_name ? book.author_name.join(', ') : 'Неизвестен автор';
            const year = book.first_publish_year || 'Няма данни';

            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4 mb-4';
            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text"><strong>Автор(и):</strong> ${author}</p>
                        <p class="card-text"><strong>Година на публикуване:</strong> ${year}</p>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Грешка при заявката:', error);
        resultsContainer.innerHTML = '<p class="text-danger">Възникна грешка при зареждането на данни.</p>';
    }
}
