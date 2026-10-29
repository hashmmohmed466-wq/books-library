const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "روبرت مارتن",
    category: "برمجة",
    language: "العربية",
    year: 2008,
    pages: 464,
    summary: "دليل عملي لكتابة كود نظيف، قابل للصيانة، وسهل القراءة، مع أمثلة واقعية لتطبيق أفضل الممارسات في التطوير البرمجي.",
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
    summary: "مقدمة في التحولات الشعرية والنثرية في الأدب العربي الحديث، مع تحليل لأبرز الحركات والكتّاب والاتجاهات الفكرية.",
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
    summary: "رؤية موسعة للتاريخ العربي والإسلامي، من بدايات الحضارات إلى التحولات السياسية والثقافية عبر العصور المختلفة.",
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
    summary: "مقدمة مبسطة إلى المنطق، والذكاء الاصطناعي، وكيفية ربط المفاهيم النظرية بالنماذج التطبيقية في الحوسبة الحديثة.",
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
    summary: "كتاب موجه للمبتدئين لتعلم أساسيات JavaScript، التعامل مع DOM، الأحداث، والبرمجة التفاعلية في المتصفح.",
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
    summary: "كتاب يشرح العلوم الطبيعية بطريقة ممتعة، من الكائنات الحية إلى قوانين الحركة والطاقة، مع أمثلة من الحياة اليومية.",
    cover: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

const enterButton = document.getElementById("enterLibrary");
const readerNameInput = document.getElementById("readerName");

if (enterButton) {
  enterButton.addEventListener("click", () => {
    const name = (readerNameInput.value || "زائر").trim() || "زائر";
    localStorage.setItem("libraryUser", name);
    window.location.href = "library.html";
  });
}

const userWelcome = document.getElementById("userWelcome");
if (userWelcome) {
  const savedName = localStorage.getItem("libraryUser");
  userWelcome.textContent = savedName ? "مرحباً " + savedName : "مرحباً";
}

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const booksGrid = document.getElementById("booksGrid");
const booksCount = document.getElementById("booksCount");

if (searchInput && booksGrid && booksCount && categoryFilter) {
  function renderBooks() {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = books.filter((book) => {
      const matchesText = 
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword);

      const matchesCategory = !selectedCategory || book.category === selectedCategory;
      return matchesText && matchesCategory;
    });

    booksCount.textContent = filtered.length;

    if (!filtered.length) {
      booksGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 28px 12px; color: #586962;">
          <h3 style="margin:0 0 8px; font-size:1.5rem;">لا توجد نتائج</h3>
          <p style="margin:0;">حاول البحث بكلمة أخرى أو اختر تصنيفًا مختلفًا.</p>
        </div>
      `;
      return;
    }

    booksGrid.innerHTML = filtered.map((book) => `
      <article class="book-card">
        <img class="book-cover" src="${book.cover}" alt="${book.title}" />
        <div class="book-content">
          <div class="book-meta">
            <span class="book-category">${book.category}</span>
            <span class="book-language">${book.language}</span>
          </div>

          <h3 class="book-title">${book.title}</h3>
          <p class="book-author">${book.author}</p>
          <p class="book-summary">${book.summary.substring(0, 120)}...</p>

          <div class="book-actions">
            <a href="details.html?id=${book.id}" class="primary-btn">عرض التفاصيل</a>
            <a href="${book.pdfUrl}" class="secondary-btn" target="_blank" rel="noopener noreferrer">اقرأ</a>
          </div>
        </div>
      </article>
    `).join("");
  }

  searchInput.addEventListener("input", renderBooks);
  categoryFilter.addEventListener("change", renderBooks);
  renderBooks();
}

const detailTitle = document.getElementById("detailTitle");
const detailAuthor = document.getElementById("detailAuthor");
const detailCategory = document.getElementById("detailCategory");
const detailLanguage = document.getElementById("detailLanguage");
const detailYear = document.getElementById("detailYear");
const detailPages = document.getElementById("detailPages");
const detailSummary = document.getElementById("detailSummary");
const detailCover = document.getElementById("detailCover");
const detailReadLink = document.getElementById("detailReadLink");

if (detailTitle && detailAuthor && detailCategory && detailLanguage && detailYear && detailPages && detailSummary && detailCover && detailReadLink) {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const book = books.find((item) => item.id === id);

  if (book) {
    detailTitle.textContent = book.title;
    detailAuthor.textContent = `بواسطة ${book.author}`;
    detailCategory.textContent = book.category;
    detailLanguage.textContent = book.language;
    detailYear.textContent = book.year;
    detailPages.textContent = book.pages;
    detailSummary.textContent = book.summary;
    detailCover.src = book.cover;
    detailCover.alt = book.title;
    detailReadLink.href = book.pdfUrl;
  }
}
