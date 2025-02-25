
// 1. Считываем ID статьи из адресной строки (например, ?id=xxxx)
const params = new URLSearchParams(window.location.search);
const articleId = params.get('id'); // string или null, если не передан

// Ссылки на элементы
const pageTitleEl = document.getElementById('page-title');
const articleContainerEl = document.getElementById('article-container');

// 2. Если нет ID, выводим сообщение и прекращаем
if (!articleId) {
  pageTitleEl.textContent = 'Не задан ID статьи!';
  articleContainerEl.innerHTML = '<p class="not-found">Проверьте адрес ссылки</p>';
} else {
  // 3. Формируем URL для запроса
  const apiURL = `https://adb-solution.com/api/posts/${articleId}`;

  // 4. Делаем fetch-запрос
  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        // Если HTTP-статус не 2xx, бросаем ошибку
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(articleData => {
      // Если ответ пришел, а объект пуст или не содержит нужные поля:
      if (!articleData.title || !articleData.text) {
        throw new Error('В ответе отсутствуют данные статьи');
      }
      
      // 5. Обновляем заголовок страницы
      pageTitleEl.textContent = articleData.title;

      // 6. Преобразуем Markdown в HTML
      const htmlFromMarkdown = marked.parse(articleData.text);

      // 7. Формируем итоговую верстку
      //  - Можно дополнительно вывести дату, автора и т.д.
      const articleHTML = `
        <p><strong>Автор:</strong> ${articleData.user?.fullName || 'Неизвестен'}</p>
        <p><strong>Просмотров:</strong> ${articleData.viewsCount || 0}</p>
        <hr/>
        ${htmlFromMarkdown}
      `;
      
      // 8. Вставляем на страницу
      articleContainerEl.innerHTML = articleHTML;
    })
    .catch(error => {
      console.error('Ошибка при загрузке статьи:', error);
      pageTitleEl.textContent = 'Статья не найдена';
      articleContainerEl.innerHTML = `<p class="not-found">${error.message}</p>`;
    });
}

