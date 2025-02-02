import React, { useState, useEffect } from "react";
import "./App.css";

// Import book images
import gatsby from "./books-images/the-great-gatsby-9780743273565_hr.jpg";
import mockingbird from "./books-images/th.jpeg";
import pride from "./books-images/pride&p.jpeg";
import mobyDick from "./books-images/dick.jpeg";
import nineteenEightyFour from "./books-images/1984.jpeg";

// Book Data
const books = [
  {
    title: "The Great Gatsby",
    img: gatsby,
    link: "https://books.apple.com/us/book/the-great-gatsby/id6444766266",
    description: "By F. Scott Fitzgerald - A story of wealth, love, and tragedy.",
  },
  {
    title: "To Kill a Mockingbird",
    img: mockingbird,
    link: "https://www.mobythegreat.com/books/harper-lee/to-kill-a-mockingbird/9780061120084",
    description: "By Harper Lee - A powerful tale of racial injustice.",
  },
  {
    title: "Pride and Prejudice",
    img: pride,
    link: "https://www.amazon.com/Pride-Prejudice-Jane-Austen/dp/1503290565",
    description: "By Jane Austen - A classic romance novel.",
  },
  {
    title: "Moby-Dick",
    img: mobyDick,
    link: "https://www.amazon.com/Moby-Dick-Herman-Melville/dp/1503280780",
    description: "By Herman Melville - The tale of Captain Ahab's obsession.",
  },
  {
    title: "1984",
    img: nineteenEightyFour,
    link: "https://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934",
    description: "By George Orwell - A dystopian novel about totalitarianism.",
  },
];

// Navbar Component
const Navbar = ({ toggleMenu, toggleTheme, theme, isMenuVisible }) => {
  return (
    <header className={`navbar ${isMenuVisible ? "navbar-open" : ""}`}>
      <button className="menu-btn" onClick={toggleMenu}>
        &#9776; Menu
      </button>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ isMenuVisible }) => {
  return (
    <div className={`sidebar ${isMenuVisible ? "sidebar-open" : ""}`}>
      <ul>
        <li>
          <a href="./">Home</a>
        </li>
        <li>
          <a href="./">Catalog</a>
        </li>
        <li>
          <a href="./">About</a>
        </li>
      </ul>
    </div>
  );
};

// BookCard Component
const BookCard = ({ book }) => {
  return (
    <li className="card">
      <img src={book.img} alt={book.title} className="card-img" />
      <h3>{book.title}</h3>
      <p>{book.description}</p>
      <button onClick={() => (window.location.href = book.link)} className="more">
        Find out more
      </button>
    </li>
  );
};

// Library Component
const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="library-container">
      <h1 className="title">HS Library</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a book..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="book-list">
        {filteredBooks.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </ul>
    </div>
  );
};

// App Component
const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  // Apply theme to the document and save it to localStorage
  useEffect(() => {
    document.documentElement.className = theme; // Apply the theme to root element
    localStorage.setItem("theme", theme); // Save to localStorage
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Toggle sidebar menu visibility
  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <>
      <Navbar toggleMenu={toggleMenu} toggleTheme={toggleTheme} theme={theme} isMenuVisible={isMenuVisible} />
      <Sidebar isMenuVisible={isMenuVisible} />
      <Library />
    </>
  );
};

export default App;