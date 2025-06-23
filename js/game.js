const gamesData = [
    {
        id: 'pacman',
        title: 'PAC-MAN',
        year: '1980',
        developer: 'Namco',
        genre: 'Maze',
        image: 'pacman.jpg',
        description: 'Guide Pac-Man through the maze while avoiding ghosts! Eat all the dots to advance to the next level.',
        controls: ['Arrow Keys: Move', 'P: Pause']
    },
    {
        id: 'spaceinvaders',
        title: 'SPACE INVADERS',
        year: '1978',
        developer: 'Taito',
        genre: 'Shooter',
        image: 'space-invaders.jpg',
        description: 'Defend Earth from descending aliens! Shoot them before they reach the bottom.',
        controls: ['Arrow Keys: Move', 'Space: Fire']
    },
    {
        id: 'tetris',
        title: 'TETRIS',
        year: '1984',
        developer: 'Alexey Pajitnov',
        genre: 'Puzzle',
        image: 'tetris.jpg',
        description: 'Arrange falling blocks to complete lines. The game gets faster as you progress!',
        controls: ['Arrow Keys: Move/Rotate', 'Space: Hard Drop']
    },
    {
        id: 'galaga',
        title: 'GALAGA',
        year: '1981',
        developer: 'Namco',
        genre: 'Shooter',
        image: 'galaga.jpg',
        description: 'Classic arcade shooter with challenging enemy patterns and dual ships.',
        controls: ['Arrow Keys: Move', 'Space: Fire']
    },
    {
        id: 'donkeykong',
        title: 'DONKEY KONG',
        year: '1981',
        developer: 'Nintendo',
        genre: 'Platform',
        image: 'donkey-kong.jpg',
        description: 'Jumpman must rescue Pauline from the giant ape Donkey Kong.',
        controls: ['Arrow Keys: Move', 'Space: Jump']
    },
    {
        id: 'frogger',
        title: 'FROGGER',
        year: '1981',
        developer: 'Konami',
        genre: 'Action',
        image: 'frogger.jpg',
        description: 'Guide your frog across a busy road and hazardous river.',
        controls: ['Arrow Keys: Move']
    }
];

const highScores = {
    pacman: [
        { name: 'ACE', score: 999999 },
        { name: 'NOVA', score: 850200 }
    ],
    invaders: [
        { name: 'MAX', score: 15000 },
        { name: 'LEX', score: 12500 }
    ],
    tetris: [
        { name: 'T-SPIN', score: 1200000 },
        { name: 'BLOCK', score: 1105000 }
    ]
};