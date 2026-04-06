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

### 🤝 Connect with Me
* **LinkedIn:** (https://www.linkedin.com/in/ bushraa-waseem)

## 📸 App Gallery

<details>
  <summary><b>Click to View Cinematic Interface (10 Screenshots)</b></summary>
  <br>

  ### 🏠 Main Hub & Discovery
| Home Page | Recommended | Trending |
| :---: | :---: | :---: |
| <img width="959" height="473" alt="01 home" src="https://github.com/user-attachments/assets/aae890b5-11b1-453c-ad1e-9ad2b20b2dfb" width="250px"> | <img width="959" height="473" alt="02 recommended movies" src="https://github.com/user-attachments/assets/e3843427-8a16-492c-8a2f-3a13a44ab3dc" width="250px"> | <img width="958" height="479" alt="03 trending movies" src="https://github.com/user-attachments/assets/344f1061-2436-411e-8b98-1207451ea09b" width="250px"> |

### 🎬 Content Browsing
| Movies | TV Shows | My List |
| :---: | :---: | :---: |
| <img width="959" height="473" alt="05 movies" src="https://github.com/user-attachments/assets/8808ca42-c056-4cdd-aaab-8b90e6d05c93" width="250px"> | <img width="959" height="473" alt="06 tv shows" src="https://github.com/user-attachments/assets/e2963881-894d-456e-9d7c-86ead7881f27" width="250px"> | <img width="959" height="473" alt="08 my list" src="https://github.com/user-attachments/assets/1e83f8a9-db59-47c9-ac87-91bbed79ecec" width="250px"> |

### 🔐 Auth & Others
| About | Contact | Sign In | 
| :---: | :---: | :---: | 
| <img width="959" height="473" alt="07 about" src="https://github.com/user-attachments/assets/490af4db-ef10-42a3-8be8-4f352bcd2a3a" width="250px"> | <img width="959" height="473" alt="04 contact" src="https://github.com/user-attachments/assets/5b8d2f53-732f-4730-bf3f-ff15f0cf2c1f" width="250px"> | <img width="959" height="473" alt="09 sign in" src="https://github.com/user-attachments/assets/c4320321-f98d-4a88-a74f-052fb92bb9e7" width="250px"> 
| Register |
| <img width="959" height="473" alt="10 register" src="https://github.com/user-attachments/assets/e6c9565c-a666-445a-a6b2-fb11ca7579ea" width="250px"> |
</details>

