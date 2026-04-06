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

  ### 🏠 Main Hub & Hero Section
  <img src="screenshots/01 home.png" width="850px" alt="Home Page">
  
  <p float="left">
    <img src="screenshots/02 recommended movies.png" width="415px" />
    <img src="screenshots/03 trending movies.png" width="415px" />
  </p>

  ### 🎬 Content Browsing
  <p float="left">
    <img src="screenshots/05 movies.png" width="415px" />
    <img src="screenshots/06 tv shows.png" width="415px" />
  </p>
  
  <p float="left">
    <img src="screenshots/08 my list.png" width="415px" />
    <img src="screenshots/07 about.png" width="415px" />
  </p>

  ### 🔐 Authentication & Support
  <p float="left">
    <img src="screenshots/09 sign in.png" width="275px" />
    <img src="screenshots/10 register.png" width="275px" />
    <img src="screenshots/04 contact.png" width="275px" />
  </p>

</details>
