// Элемент, в который будем вставлять записи
const blogWrap = document.querySelector('.vs-blog-wrapper #blog_wrap');

console.log(blogWrap)

// HTML-шаблон для поста
function createBlogPost(post) {
    return `
        <div class="col-lg-12">
            <div class="post-${post.id} post type-post status-publish format-standard has-post-thumbnail hentry">
                <div class="blog-img">
                    <a href="${post.link}" class="post-thumbnail">
                        <img 
                            fetchpriority="high" 
                            width="870" 
                            height="540" 
                            src="https://avatars.mds.yandex.net/i?id=7da87be6fb844f190bb75bb17ab065bdc0b2fc96-5876729-images-thumbs&n=13" 
                            class="attachment-post-thumbnail size-post-thumbnail wp-post-image" 
                            alt="${post.title}" 
                            decoding="async"
                        />
                    </a>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span>
                            <a href="${post.link}"><i class="fal fa-comments"></i>${post.comments || 0} Comments</a>
                        </span>
                        <span>
                            <a href="#"><i class="fal fa-calendar-minus"></i>
                                <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
                            </a>
                        </span>
                    </div>
                    <h2 class="blog-title h3">
                        <a href="${post.link}">${post.title}</a>
                    </h2>
                    <p class="blog-text">${post.excerpt}</p>
                    <a href="${post.link}" class="link-btn">Read More <i class="fal fa-long-arrow-right"></i></a>
                </div>
            </div>
        </div>
    `;
}

// GET-запрос для получения постов
fetch('https://adb-solution.com/api/posts')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(posts => {
        // Очистка контейнера перед вставкой новых данных
        blogWrap.innerHTML = '';

        // Генерация и вставка HTML для каждого поста
        posts.forEach(post => {
            const postHTML = createBlogPost(post);
            blogWrap.innerHTML += postHTML;
        });
    })
    .catch(error => {
        console.error('Ошибка при получении данных:', error);
    });
