document.addEventListener('DOMContentLoaded', function() {
    // Initialize the site
    initSite();
    
    // Load games data
    loadGames();
    
    // Load high scores
    loadHighScores();
    
    // Setup event listeners
    setupEventListeners();
    
    // Start background music (with user interaction)
    setupAudio();
});

function initSite() {
    // Create floating pixels
    createFloatingPixels();
    
    // Set current year in footer
    document.querySelector('.copyright p').innerHTML = `© ${new Date().getFullYear()} RETRO ARCADE HUB | Made with ♥ for 8-bit fans`;
}

function createFloatingPixels() {
    const container = document.querySelector('.floating-pixels');
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#00ff00', '#9900ff'];
    
    for (let i = 0; i < 50; i++) {
        const pixel = document.createElement('div');
        pixel.style.position = 'absolute';
        pixel.style.width = `${Math.random() * 10 + 5}px`;
        pixel.style.height = pixel.style.width;
        pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        pixel.style.opacity = Math.random() * 0.5 + 0.1;
        pixel.style.borderRadius = Math.random() > 0.7 ? '50%' : '0';
        
        // Random position
        pixel.style.left = `${Math.random() * 100}%`;
        pixel.style.top = `${Math.random() * 100}%`;
        
        // Animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        pixel.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        container.appendChild(pixel);
    }
}

function loadGames() {
    const gamesGrid = document.querySelector('.games-grid');
    
    gamesData.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card animate__animated animate__fadeInUp';
        gameCard.dataset.gameId = game.id;
        
        gameCard.innerHTML = `
            <img src="assets/images/${game.image}" alt="${game.title}" class="game-image">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-year">${game.year}</p>
        `;
        
        gamesGrid.appendChild(gameCard);
    });
}

function loadHighScores() {
    // Pac-Man scores
    const pacmanScores = document.getElementById('pacman-scores');
    highScores.pacman.forEach((score, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${index + 1}. ${score.name}</span><span>${score.score.toLocaleString()}</span>`;
        pacmanScores.appendChild(li);
    });
    
    // Space Invaders scores
    const invadersScores = document.getElementById('invaders-scores');
    highScores.invaders.forEach((score, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${index + 1}. ${score.name}</span><span>${score.score.toLocaleString()}</span>`;
        invadersScores.appendChild(li);
    });
    
    // Tetris scores
    const tetrisScores = document.getElementById('tetris-scores');
    highScores.tetris.forEach((score, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${index + 1}. ${score.name}</span><span>${score.score.toLocaleString()}</span>`;
        tetrisScores.appendChild(li);
    });
}

function setupEventListeners() {
    // Navigation smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Play click sound
                playSound('click');
            }
        });
    });
    
    // Music mute/unmute button
    const musicToggle = document.querySelector('.music-toggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            const bgMusic = document.getElementById('bgMusic');
            if (bgMusic) {
                bgMusic.muted = !bgMusic.muted;
                this.textContent = bgMusic.muted ? '🔇' : '🔊';
                localStorage.setItem('musicMuted', bgMusic.muted);
                playSound('click');
            }
        });
    }
    
    // Game card clicks
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            const gameId = this.dataset.gameId;
            openGameModal(gameId);
            playSound('click');
        });
    });
    
    // Modal close button
    document.querySelector('.close-modal').addEventListener('click', closeGameModal);
    
    // Play now button
    document.querySelector('.cta-button').addEventListener('click', function() {
        // Scroll to games section
        document.querySelector('#games').scrollIntoView({
            behavior: 'smooth'
        });
        playSound('click');
    });
    
    // Hover effects with sound
    document.querySelectorAll('.nav-link, .game-card, .cta-button, .community-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            playSound('hover');
        });
    });
    
    // Newsletter form
    document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Simple validation
        if (email && email.includes('@')) {
            alert('Thanks for subscribing to our newsletter!');
            this.querySelector('input').value = '';
            playSound('click');
        } else {
            alert('Please enter a valid email address.');
        }
    });
    
    // Music toggle (needs user interaction)
    document.addEventListener('click', function firstClick() {
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(e => console.log('Autoplay prevented'));
            document.removeEventListener('click', firstClick);
        }
    });
}

function openGameModal(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (!game) return;
    
    const modal = document.getElementById('gameModal');
    const modalTitle = document.getElementById('modalGameTitle');
    const gameContainer = document.getElementById('modalGameContainer');
    const gameInfo = document.getElementById('modalGameInfo');
    
    // Set game info
    modalTitle.textContent = game.title;
    gameInfo.innerHTML = `
        <p><strong>Released:</strong> ${game.year}</p>
        <p><strong>Developer:</strong> ${game.developer}</p>
        <p><strong>Genre:</strong> ${game.genre}</p>
        <p>${game.description}</p>
        <div class="game-controls">
            <h4>Controls:</h4>
            <ul>
                ${game.controls.map(control => `<li>${control}</li>`).join('')}
            </ul>
        </div>
    `;
    
    // Here you would normally load the actual game
    // For this example, we'll just show a placeholder
    gameContainer.innerHTML = `
        <div class="game-placeholder">
            <div class="placeholder-screen">
                <p>${game.title}</p>
                <p>LOADING GAME...</p>
                <p>PRESS START</p>
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
    playSound('click');
}

function playSound(type) {
    const sound = document.getElementById(`${type}Sound`);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Audio play failed:', e));
    }
}

function setupAudio() {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;
    
    // Initialize volume
    bgMusic.volume = 0.3;
    
    // Load saved mute state
    const savedMuteState = localStorage.getItem('musicMuted');
    if (savedMuteState) {
        bgMusic.muted = savedMuteState === 'true';
    }
    
    // Initialize toggle button state
    const musicToggle = document.querySelector('.music-toggle');
    if (musicToggle) {
        musicToggle.textContent = bgMusic.muted ? '🔇' : '🔊';
    }
    
    // Audio context for more advanced sound effects
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        new AudioContext();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('gameModal');
    if (e.target === modal) {
        closeGameModal();
    }
});