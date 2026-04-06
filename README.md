# 🎬 Binge & Box — Discover Movies by Your Mood

**Binge & Box** is a modern, cinematic web application built with React.js that helps users find the perfect movie based on their current "vibe" or mood. Featuring a sleek dark UI with neon accents, it offers a premium browsing experience.

## ✨ Features
- 🌈 **Mood-Based Filtering:** Quick access to movies via "Mood Pills" (Action, Chill, Thriller, etc.).
- 🔍 **Real-time Search:** Instantly find movies by title.
- 📺 **Cinematic UI:** High-quality movie cards with smooth hover animations and neon glow effects.
- 📱 **Fully Responsive:** Optimized for desktops, tablets, and mobile devices.

## 🚀 Tech Stack
- **Backend:** Node.js
- **Frontend:** React.js
- **Styling:** CSS3 (Custom Properties & Keyframes)
- **Icons:** FontAwesome
- **Deployment:** Vercel (Coming Soon)

## 🛠️ Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/bushra-waseem/binge-box-mood-based-movies.git](https://github.com/bushra-waseem/binge-box-mood-based-movies.git)
   cd binge-box-mood-based-movies
   npm install
   npm start
   ```

 ```mermaid
graph LR
    A[User Selection] -->|Select Mood| B(Filter Engine)
    A -->|Search Title| B
    B -->|Query Data| C[(moviesData.js)]
    C -->|Return Match| D[UI Update]
    D -->|Render| E[Movie Grid]
```

```mermaid
graph TD
    App --> Navbar
    App --> Hero
    App --> FilterBar
    App --> MovieGrid
    MovieGrid --> MovieCard
    MovieCard --> WatchlistButton
```
```mermaid
graph TD
    User((User))
    
    subgraph "Binge & Box App"
    UC1[Browse Movies]
    UC2[Search by Title]
    UC3[Filter by Mood]
    UC4[View Movie Details]
    UC5[Manage Collection]
    end

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
```

```text
binge-box/
├── backend/                # Main Backend Folder
│   └── backend/            # Nested Server Folder
│       ├── server.js       # Entry point (Node.js)
│       ├── package.json    # Backend Dependencies
│       └── package-lock.json
├── frontend/               # React Application
│   ├── public/             # Static Assets
│   └── src/                # Frontend Logic
│       ├── components/     # Navbar.jsx, etc.
│       ├── pages/          # Home, Login, Movies, etc.
│       ├── App.js          # Routing
│       └── moviesData.js   # Local Movie Database
└── README.md
```
## 📸 App Gallery

<details>
  <summary><b>Click to View Cinematic Interface (10 Screenshots)</b></summary>
  <br>

  ### 🏠 Main Hub & Discovery
| Home Page | Recommended | Trending |
| :---: | :---: | :---: |
| "<img width="959" height="474" alt="01 home" src="https://github.com/user-attachments/assets/aae890b5-11b1-453c-ad1e-9ad2b20b2dfb" width="250px"> | "<img width="959" height="473" alt="02 recommended movies" src="https://github.com/user-attachments/assets/e3843427-8a16-492c-8a2f-3a13a44ab3dc" width="250px"> | "<img width="958" height="473" alt="03 trending movies" src="https://github.com/user-attachments/assets/344f1061-2436-411e-8b98-1207451ea09b" width="250px"> |

### 🎬 Content Browsing
| Movies | TV Shows | My List |
| :---: | :---: | :---: |
| <img src="URL_05" width="250px"> | <img src="URL_06" width="250px"> | <img src="URL_08" width="250px"> |

### 🔐 Auth & Others
| Sign In | Register | Contact |
| :---: | :---: | :---: |
| <img src="URL_09" width="250px"> | <img src="URL_10" width="250px"> | <img src="URL_04" width="250px"> |

</details>
