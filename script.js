document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkbox-btn');
    const captchaBox = document.getElementById('step-checkbox');
    const captchaModal = document.getElementById('captcha-modal');
    const grid = document.getElementById('grid');
    const verifyBtn = document.getElementById('verify-btn');

    // Images for the front of the cards
    const VALENTINE_IMAGES = [
        'assets/valentine-1.jpg', 'assets/valentine-2.jpg', 'assets/valentine-3.jpg',
        'assets/valentine-4.jpg', 'assets/valentine-5.jpg', 'assets/valentine-6.jpg',
        'assets/valentine-7.jpg', 'assets/valentine-8.jpg', 'assets/valentine-9.jpg'
    ];

    // Words revealed on the back
    const SECRET_WORDS = [
        "Cậu", "Có", "Muốn", 
        "Làm", "Valentine", "2027", 
        "Của", "Tớ", "Không?"
    ];

    let selectedTiles = new Set();
    let isModalOpen = false;

    // 1. Click Checkbox -> Go directly to Valentine Grid
    checkbox.addEventListener('click', () => {
        if (isModalOpen) return;

        // Fake loading spinner
        checkbox.classList.add('loading');
        
        setTimeout(() => {
            // Hide Checkbox, Show Modal
            captchaBox.style.opacity = '0'; // Fade out box
            setTimeout(() => {
                captchaBox.classList.add('hidden');
                captchaModal.classList.remove('hidden'); // Fade in modal via CSS animation
                setupValentineGrid();
                isModalOpen = true;
            }, 300);
        }, 1000); // 1s delay
    });

    // 2. Setup the Grid (Flip Logic)
    function setupValentineGrid() {
        grid.innerHTML = '';
        selectedTiles.clear();
        verifyBtn.disabled = true;

        for (let i = 0; i < 9; i++) {
            // Create 3D Card Structure
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.dataset.index = i;

            const tileInner = document.createElement('div');
            tileInner.classList.add('tile-inner');

            // FRONT: The Image
            const front = document.createElement('div');
            front.classList.add('tile-front');
            // Check if using array of images or fallback
            const bgUrl = VALENTINE_IMAGES[i] || 'https://via.placeholder.com/150/FFB6C1/808080?text=?'; 
            front.style.backgroundImage = `url('${bgUrl}')`;

            // BACK: The Word (Background is handled in CSS)
            const back = document.createElement('div');
            back.classList.add('tile-back');
            back.innerText = SECRET_WORDS[i];

            tileInner.appendChild(front);
            tileInner.appendChild(back);
            tile.appendChild(tileInner);
            grid.appendChild(tile);

            // Click Event
            tile.addEventListener('click', () => {
                if (!tile.classList.contains('flipped')) {
                    tile.classList.add('flipped');
                    selectedTiles.add(i);
                } else {
                    // Optional: allow un-flipping. 
                    // Usually better to keep revealed for this effect.
                }

                // Enable verify button if all 9 are flipped (or at least 3, up to you)
                // Let's require all 9 for the full message
                if (selectedTiles.size === 9) {
                    verifyBtn.disabled = false;
                }
            });
        }
    }

    // 3. Verify -> Success Screen
    verifyBtn.addEventListener('click', () => {
        // Fade out modal
        captchaModal.style.transition = "opacity 0.5s";
        captchaModal.style.opacity = "0";

        setTimeout(() => {
            captchaModal.classList.add('hidden');
            document.getElementById('success-screen').classList.remove('hidden');
            launchConfetti();
        }, 500);
    });

    // Confetti Effect
    function launchConfetti() {
        const colors = ['#ff6b81', '#ff4757', '#ffffff'];
        for (let i = 0; i < 100; i++) {
            const conf = document.createElement('div');
            conf.style.position = 'fixed';
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.top = '-10vh';
            conf.style.width = '10px';
            conf.style.height = '10px';
            conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            conf.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            document.body.appendChild(conf);
        }

        // Add dynamic style if not already there
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.innerHTML = `
                @keyframes fall {
                    to { transform: translateY(110vh) rotate(720deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }
});