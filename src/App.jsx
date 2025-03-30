import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

const initialBooks = [
  { 
    id: 1, 
    title: 'The Great Gatsby', 
    author: 'F. Scott Fitzgerald', 
    rating: 4.5,
    cover: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
    reviews: [
      { id: 1, user: 'BookLover42', text: 'Classic novel about the American Dream', rating: 5 }
    ] 
  },
  { 
    id: 2, 
    title: 'To Kill a Mockingbird', 
    author: 'Harper Lee', 
    rating: 4.8,
    cover: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg',
    reviews: [
      { id: 1, user: 'LiteraryFan', text: 'Powerful story about racial injustice', rating: 4 }
    ] 
  },
  { 
    id: 3, 
    title: '1984', 
    author: 'George Orwell', 
    rating: 4.7,
    cover: 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg',
    reviews: [
      { id: 1, user: 'DystopiaReader', text: 'Dystopian masterpiece', rating: 5 }
    ] 
  },
  { 
    id: 4, 
    title: 'Pride and Prejudice', 
    author: 'Jane Austen', 
    rating: 4.6,
    cover: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
    reviews: [
      { id: 1, user: 'RomanceLover', text: 'Timeless romance novel', rating: 4 }
    ] 
  },
  { 
    id: 5, 
    title: 'The Hobbit', 
    author: 'J.R.R. Tolkien', 
    rating: 4.7,
    cover: 'https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg',
    reviews: [
      { id: 1, user: 'FantasyFan', text: 'Fantasy adventure classic', rating: 5 }
    ] 
  },
  { 
    id: 6, 
    title: 'The Catcher in the Rye', 
    author: 'J.D. Salinger', 
    rating: 4.2,
    cover: 'https://m.media-amazon.com/images/I/91HPG31dTwL._AC_UF1000,1000_QL80_.jpg',
    reviews: [
      { id: 1, user: 'TeenReader', text: 'Coming-of-age story', rating: 4 }
    ] 
  },
 
];

const styles = {
  app: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#f5f5f5',
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '24rem'
  },
  loginTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  loginInput: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    marginBottom: '1rem'
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: '500'
  },
  authToggle: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#4b5563',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1rem'
  },
  dashboardHeader: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '1rem'
  },
  headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem'
  },
  profileButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none'
  },
  profileIcon: {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  dropdownMenu: {
    position: 'absolute',
    right: '0',
    top: '100%',
    backgroundColor: 'white',
    borderRadius: '0.375rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '12rem',
    zIndex: '10',
    marginTop: '0.5rem'
  },
  dropdownItem: {
    padding: '0.75rem 1rem',
    color: '#4b5563',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block'
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
    padding: '0 1rem',
    position: 'relative'
  },
  searchInput: {
    width: '100%',
    maxWidth: '32rem',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '1px solid #d1d5db',
    borderRadius: '2rem',
    fontSize: '1rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    outline: 'none',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)'
    }
  },
  searchIcon: {
    position: 'absolute',
    left: '25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#3b82f6',
    width: '20px',
    height: '20px',
    zIndex: 2
  },
  clearButton: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    padding: '0.5rem'
  },
  booksGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  bookCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column'
  },
  bookCover: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderBottom: '1px solid #e2e8f0'
  },
  bookContent: {
    padding: '1.5rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  bookTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  bookAuthor: {
    color: '#6b7280',
    marginBottom: '1rem'
  },
  bookRating: {
    color: '#f59e0b',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center'
  },
  bookReviews: {
    marginTop: '1rem'
  },
  reviewList: {
    listStyleType: 'none',
    paddingLeft: '0',
    color: '#4b5563'
  },
  noResults: {
    textAlign: 'center',
    padding: '3rem 0',
    color: '#6b7280',
    gridColumn: '1 / -1'
  },
  bookDetailContainer: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
    padding: '2rem'
  },
  bookDetailCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    padding: '2rem',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer'
  },
  reviewItem: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e2e8f0'
  },
  reviewUser: {
    fontWeight: '600',
    marginRight: '0.5rem'
  },
  reviewRating: {
    color: '#f59e0b'
  },
  reviewForm: {
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0'
  },
  reviewTextarea: {
    width: '100%',
    minHeight: '100px',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    marginBottom: '1rem'
  },
  ratingSelect: {
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    marginBottom: '1rem'
  },
  submitReviewButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: '500'
  }
};

function BookDetail({ book, user, onAddReview, onClose }) {
   const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (reviewText.trim()) {
        onAddReview(book.id, {
          user: user.username,
          text: reviewText,
          rating: rating
        });
        setReviewText('');
      }
    };
  
    return (
      <div style={styles.bookDetailContainer}>
        <div style={styles.bookDetailCard}>
          <button style={styles.closeButton} onClick={onClose}>×</button>
          <img 
            src={book.cover} 
            alt={`${book.title} cover`} 
            style={{
              width: '150px',
              height: '200px',
              objectFit: 'cover',
              margin: '0 auto 1rem',
              display: 'block',
              borderRadius: '0.25rem'
            }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150x200?text=No+Cover';
            }}
          />
          <h2 style={styles.bookTitle}>{book.title}</h2>
          <p style={styles.bookAuthor}>by {book.author}</p>
          <div style={styles.bookRating}>
            {'★'.repeat(Math.round(book.rating))}
            {'☆'.repeat(5 - Math.round(book.rating))} ({book.rating.toFixed(1)})
          </div>
          
          <div style={styles.bookReviews}>
            <h3>Reviews</h3>
            <ul style={styles.reviewList}>
              {book.reviews.map((review, index) => (
                <li key={index} style={styles.reviewItem}>
                  <div>
                    <span style={styles.reviewUser}>{review.user}</span>
                    <span style={styles.reviewRating}>
                      {'★'.repeat(review.rating)}
                    </span>
                  </div>
                  <p>{review.text}</p>
                </li>
              ))}
            </ul>
          </div>
  
          {user && (
            <div style={styles.reviewForm}>
              <h3>Add Your Review</h3>
              <form onSubmit={handleSubmit}>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your thoughts about this book..."
                  style={styles.reviewTextarea}
                  required
                />
                <div>
                  <label>Rating: </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    style={styles.ratingSelect}
                  >
                    {[5, 4, 3, 2, 1].map(num => (
                      <option key={num} value={num}>{num} ★</option>
                    ))}
                  </select>
                </div>
                <button type="submit" style={styles.submitReviewButton}>
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
}

function AuthPage({ setIsAuthenticated, setUser, isLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      if (!email || !password) {
        setError('Please provide email and password');
        return;
      }
    } else {
      if (!username || !email || !password) {
        setError('Please fill in all fields');
        return;
      }
    }

    try {
      const endpoint = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';
      const body = isLogin ? { email, password } : { username, email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Authentication failed');
      }
      
      setIsAuthenticated(true);
      setUser({ 
        username: responseData.user.username, 
        email: responseData.user.email 
      });
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('user', JSON.stringify({ 
        username: responseData.user.username, 
        email: responseData.user.email 
      }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginBox}>
        <h1 style={styles.loginTitle}>Kalai Book Store</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && <p style={styles.errorText}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  style={styles.loginInput}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                style={styles.loginInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                style={styles.loginInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" style={styles.loginButton}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          
          <div 
            style={styles.authToggle}
            onClick={() => navigate(isLogin ? '/signup' : '/login')}
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ user, setIsAuthenticated }) {
   const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [booksData, setBooksData] = useState(initialBooks);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate = useNavigate();
  
    const handleSignOut = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    };
  
    const handleAddReview = (bookId, newReview) => {
      setBooksData(prevBooks => 
        prevBooks.map(book => 
          book.id === bookId 
            ? { 
                ...book, 
                reviews: [...book.reviews, newReview],
                rating: calculateAverageRating([...book.reviews, newReview])
              } 
            : book
        )
      );
    };
  
    const calculateAverageRating = (reviews) => {
      if (reviews.length === 0) return 0;
      const sum = reviews.reduce((total, review) => total + review.rating, 0);
      return parseFloat((sum / reviews.length).toFixed(1));
    };
  
    const filteredBooks = booksData.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div>
        <header style={styles.dashboardHeader}>
          <div style={styles.headerContainer}>
            <h1>Kalai Book Store</h1>
            <div style={{ position: 'relative' }}>
              <button 
                style={styles.profileButton}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span>{user?.username}</span>
                <div style={styles.profileIcon}>
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </button>
              
              {showDropdown && (
                <div style={styles.dropdownMenu}>
                  <Link
                    to="#"
                    style={styles.dropdownItem}
                    onClick={() => setShowDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    style={{ ...styles.dropdownItem, textAlign: 'left', width: '100%' }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
  
        <main>
          <div style={styles.searchContainer}>
            <svg 
              style={{
                ...styles.searchIcon,
                color: isSearchFocused ? '#2563eb' : '#3b82f6',
                strokeWidth: isSearchFocused ? '2.5' : '2'
              }} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search books by title or author..."
              style={{
                ...styles.searchInput,
                ...(isSearchFocused ? { 
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)'
                } : {})
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchTerm && (
              <button 
                style={styles.clearButton}
                onClick={() => setSearchTerm('')}
              >
                ×
              </button>
            )}
          </div>
  
          <div style={styles.booksGrid}>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div 
                  key={book.id} 
                  style={styles.bookCard}
                  onClick={() => setSelectedBook(book)}
                >
                  <img 
                    src={book.cover} 
                    alt={`${book.title} cover`} 
                    style={styles.bookCover}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Cover';
                    }}
                  />
                  <div style={styles.bookContent}>
                    <h2 style={styles.bookTitle}>{book.title}</h2>
                    <p style={styles.bookAuthor}>by {book.author}</p>
                    <div style={styles.bookRating}>
                      {'★'.repeat(Math.round(book.rating))}
                      {'☆'.repeat(5 - Math.round(book.rating))} ({book.rating.toFixed(1)})
                    </div>
                    <div style={styles.bookReviews}>
                      <h3>Reviews ({book.reviews.length})</h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={styles.noResults}>
                No books found matching your search.
              </div>
            )}
          </div>
        </main>
  
        {selectedBook && (
          <BookDetail
            book={selectedBook}
            user={user}
            onAddReview={handleAddReview}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    );
}

function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(() => {
      return localStorage.getItem('token') !== null;
    });
    
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    });
  
    useEffect(() => {
      const verifyToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
  
        try {
          const response = await fetch('http://localhost:5000/api/verify', {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
  
          if (!response.ok) {
            throw new Error('Token verification failed');
          }
  
          const data = await response.json();
          setIsAuthenticated(true);
          setUser(data.user);
        } catch (err) {
          console.error('Token verification failed:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      };
  
      verifyToken();
    }, []);
  
    return (
      <div style={styles.app}>
        <Router>
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <AuthPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} isLogin={true} />
            } />
            <Route path="/signup" element={
              isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <AuthPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} isLogin={false} />
            } />
            <Route path="/dashboard" element={
              isAuthenticated ? 
              <Dashboard user={user} setIsAuthenticated={setIsAuthenticated} /> : 
              <Navigate to="/login" />
            } />
            <Route path="/" element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            } />
          </Routes>
        </Router>
      </div>
    );
  
}

export default App;