const movieData = [
  { title: "Silo", type: "Series", genre: "Sci-Fi", year: 2026 },
  { title: "The Handmaid's Tale", type: "Series", genre: "Drama", year: 2025 },
  { title: "Stranger Things", type: "Series", genre: "Sci-Fi", year: 2025 },
  { title: "Toy Story 5", type: "Movie", genre: "Animation", year: 2026 },
  { title: "Minions & Monsters", type: "Movie", genre: "Animation", year: 2026 },
  { title: "Backrooms", type: "Movie", genre: "Horror", year: 2026 },
  { title: "Project Hail Mary", type: "Movie", genre: "Sci-Fi", year: 2026 },
  { title: "The Super Mario Galaxy Movie", type: "Movie", genre: "Animation", year: 2026 }
];

let nextId = 0;

function createItemElement(item) {
  const id = nextId++;
  const li = document.createElement("li");
  li.className = "watch-item";
  li.dataset.id = id;
  li.dataset.type = item.type;
  li.dataset.title = item.title.toLowerCase();

  const title = document.createElement("h3");
  title.textContent = item.title;

  const meta = document.createElement("p");
  meta.textContent = `${item.type} · ${item.genre} · ${item.year}`;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "watch-remove";
  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("aria-label", `Remove ${item.title}`);

  li.append(title, meta, removeBtn);
  return li;
}

const list = document.querySelector("#watch-list");

movieData.forEach((item) => {
  list.appendChild(createItemElement(item));
});
const searchInput = document.querySelector("#watch-search");
const filterButtons = document.querySelectorAll(".watch-filter");
const emptyMessage = document.querySelector("#watch-empty");

let activeCategory = "all";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const items = list.querySelectorAll(".watch-item");
  let visibleCount = 0;

  items.forEach((item) => {
    const matchesCategory = activeCategory === "all" || item.dataset.type === activeCategory;
    const matchesSearch = item.dataset.title.includes(query);
    const show = matchesCategory && matchesSearch;
    item.hidden = !show;
    if (show) visibleCount++;
  });

  emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", applyFilters);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    activeCategory = button.dataset.category;
    applyFilters();
  });
});
const addForm = document.querySelector("#watch-add-form");

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newItem = {
    title: document.querySelector("#watch-title").value.trim(),
    type: document.querySelector("#watch-type").value,
    genre: document.querySelector("#watch-genre").value.trim(),
    year: document.querySelector("#watch-year").value
  };

  if (!newItem.title || !newItem.genre || !newItem.year) return;

  list.appendChild(createItemElement(newItem));
  applyFilters();
  addForm.reset();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest(".watch-remove");
  if (!button) return;
  button.closest(".watch-item").remove();
});

const themeToggle = document.querySelector("#theme-toggle");

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
});

const contactForm = document.querySelector("#contact-form");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const messageField = document.querySelector("#message");
const successMessage = document.querySelector("#form-success");

const fieldConfig = [
  {
    field: nameField,
    errorId: "name-error",
    validate: (value) => value.trim().length >= 2,
    message: "Enter your name (at least 2 characters)."
  },
  {
    field: emailField,
    errorId: "email-error",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: "Enter a valid email address, like name@example.com."
  },
  {
    field: messageField,
    errorId: "message-error",
    validate: (value) => value.trim().length >= 10,
    message: "Write a message with at least 10 characters."
  }
];

function showError(config) {
  const errorEl = document.querySelector(`#${config.errorId}`);
  errorEl.textContent = config.message;
  errorEl.hidden = false;
  config.field.setAttribute("aria-invalid", "true");
  config.field.setAttribute("aria-describedby", config.errorId);
}

function clearError(config) {
  const errorEl = document.querySelector(`#${config.errorId}`);
  errorEl.textContent = "";
  errorEl.hidden = true;
  config.field.removeAttribute("aria-invalid");
  config.field.removeAttribute("aria-describedby");
}

function validateField(config) {
  const isValid = config.validate(config.field.value);
  if (isValid) {
    clearError(config);
  } else {
    showError(config);
  }
  return isValid;
}

fieldConfig.forEach((config) => {
  config.field.addEventListener("input", () => {
    if (config.field.getAttribute("aria-invalid") === "true") {
      validateField(config);
    }
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  successMessage.hidden = true;

  const results = fieldConfig.map((config) => validateField(config));
  const allValid = results.every(Boolean);

  if (allValid) {
    successMessage.hidden = false;
    contactForm.reset();
  }
});