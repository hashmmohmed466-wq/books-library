const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "روبرت مارتن",
    category: "برمجة",
    language: "العربية",
    year: 2008,
    pages: 464,
    summary:
      "دليل عملي لكتابة كود نظيف، قابل للصيانة، وسهل القراءة، مع أمثلة واقعية لتطبيق أفضل الممارسات في التطوير البرمجي.",
    cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: 2,
    title: "الأدب العربي الحديث",
    author: "د. سارة الخالد",
    category: "أدب",
    language: "العربية",
    year: 2021,
    pages: 312,
    summary:
      "مقدمة في التحولات الشعرية والنثرية في الأدب العربي الحديث، مع تحليل لأبرز الحركات والكتّاب والاتجاهات الفكرية.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: 3,
    title: "تاريخ العرب",
    author: "أحمد شوقي",
    category: "تاريخ",
    language: "العربية",
    year: 2019,
    pages: 420,
    summary:
      "رؤية موسعة للتاريخ العربي والإسلامي، من بدايات الحضارات إلى التحولات السياسية والثقافية عبر العصور المختلفة.",
    cover: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: 4,
    title: "المنطق والذكاء الاصطناعي",
    author: "د. ماجد الفهد",
    category: "علوم",
    language: "العربية",
    year: 2022,
    pages: 280,
    summary:
      "مقدمة مبسطة إلى المنطق، والذكاء الاصطناعي، وكيفية ربط المفاهيم النظرية بالنماذج التطبيقية في الحوسبة الحديثة.",
    cover: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: 5,
    title: "JavaScript للمبتدئين",
    author: "محمد النجار",
    category: "برمجة",
    language: "العربية",
    year: 2023,
    pages: 390,
    summary:
      "كتاب موجه للمبتدئين لتعلم أساسيات JavaScript، التعامل مع DOM، الأحداث، والبرمجة التفاعلية في المتصفح.",
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: 6,
    title: "رحلة في العلوم الطبيعية",
    author: "هند البقمي",
    category: "علوم",
    language: "العربية",
    year: 2020,
    pages: 260,
    summary:
      "كتاب يشرح العلوم الطبيعية بطريقة ممتعة، من الكائنات الحية إلى قوانين الحركة والطاقة، مع أمثلة من الحياة اليومية.",
    cover: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const booksGrid = document.getElementById("booksGrid");
const booksCount = document.getElementById("booksCount");

const modal = document.getElementById("bookModal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalCategory = document.getElementById("modalCategory");
const modalLanguage = document.getElementById("modalLanguage");
const modalYear = document.getElementById("modalYear");
const modalPages = document.getElementById("modalPages");
const modalSummary = document.getElementById("modalSummary");
const modalCover = document.getElementById("modalCover");
const readLink = document.getElementById("readLink");

function renderBooks() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  let filteredBooks = books.filter((book) => {
    const matchesText =
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === "" || book.category === selectedCategory;

    return matchesText && matchesCategory;
  });

  booksCount.textContent = filteredBooks.length;

  if (!filteredBooks.length) {
    booksGrid.innerHTML = `
      <div class="empty-state">
        <h3>لا توجد نتائج</h3>
        <p>حاول البحث بكلمة أخرى أو اختر تصنيفًا مختلفًا.</p>
      </div>
    `;
    return;
  }

  booksGrid.innerHTML = filteredBooks
    .map(
      (book) => `
      <article class="book-card">
        <img class="book-cover" src="${book.cover}" alt="${book.title}" />
        <div class="book-content">
          <div class="book-meta">
            <span class="book-category">${book.category}</span>
            <span class="book-language">${book.language}</span>
          </div>

          <h3>${book.title}</h3>
          <p class="book-author">${book.author}</p>
          <p class="book-summary">${book.summary.substring(0, 120)}...</p>

          <div class="book-actions">
            <button class="primary-btn" data-book-id="${book.id}" type="button">عرض التفاصيل</button>
            <a class="secondary-btn" href="${book.pdfUrl}" target="_blank" rel="noopener noreferrer">اقرأ</a>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function openBookModal(bookId) {
  const selectedBook = books.find((book) => book.id === Number(bookId));
  if (!selectedBook) return;

  modalTitle.textContent = selectedBook.title;
  modalAuthor.textContent = `بواسطة ${selectedBook.author}`;
  modalCategory.textContent = selectedBook.category;
  modalLanguage.textContent = selectedBook.language;
  modalYear.textContent = selectedBook.year;
  modalPages.textContent = selectedBook.pages;
  modalSummary.textContent = selectedBook.summary;
  modalCover.src = selectedBook.cover;
  modalCover.alt = selectedBook.title;
  readLink.href = selectedBook.pdfUrl;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);

booksGrid.addEventListener("click", (event) => {
  const btn = event.target.closest(".primary-btn");
  if (!btn) return;

  const bookId = btn.dataset.bookId;
  openBookModal(bookId);
});

document.querySelectorAll("[data-close='true']").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.getElementById("closeModalBtn").addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

renderBooks();
