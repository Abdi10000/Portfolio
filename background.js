// 1. Select the Background Canvas
const backgroundCanvas = document.getElementById("background-canvas");
const backgroundContext = backgroundCanvas.getContext("2d");

// 2. Matrix Rain Settings
const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = [];
let animationFrame;
let lastFrameTime = 0;

// 2A. Dark Mode Network Settings
const networkNodes = [];
const networkNodeCount = 45;
const networkConnectionDistance = 130;

// 3. Set Canvas Size
function resizeBackground() {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;

    columns.length = 0;

    const totalColumns = Math.ceil(backgroundCanvas.width / fontSize);

    for (let i = 0; i < totalColumns; i++) {
        columns.push(Math.random() * -50);
    }
}

// 3A. Create Dark Mode Network Nodes
function createNetworkNodes() {
    networkNodes.length = 0;

    const width = backgroundCanvas.width;
    const height = backgroundCanvas.height;

    const mainBounds = document.querySelector("main").getBoundingClientRect();

    const leftBoundary = mainBounds.left;
    const rightBoundary = mainBounds.right;

    // Only create nodes when both side margins have enough space
    if (leftBoundary < 60 || width - rightBoundary < 60) {
        return;
    }

    for (let i = 0; i < networkNodeCount; i++) {
        const useLeftSide = i % 2 === 0;

        let x;

        if (useLeftSide) {
            x = Math.random() * leftBoundary;
        } else {
            x = rightBoundary + Math.random() * (width - rightBoundary);
        }

        networkNodes.push({
            x: x,
            y: Math.random() * height,
            pulseOffset: Math.random() * Math.PI * 2
        });
    }
}

// 4. Draw Matrix Rain
function drawMatrixRain() {
    const width = backgroundCanvas.width;
    const height = backgroundCanvas.height;

    // Fade previous characters gradually
    backgroundContext.fillStyle = "rgba(10, 15, 13, 0.12)";
    backgroundContext.fillRect(0, 0, width, height);

    backgroundContext.fillStyle = "#4ADE80";
    backgroundContext.font = `${fontSize}px monospace`;

    // Keep rain outside the main content area
    const mainElement = document.querySelector("main");
    const mainBounds = mainElement.getBoundingClientRect();

    const leftBoundary = mainBounds.left;
    const rightBoundary = mainBounds.right;

    columns.forEach(function(position, index) {
        const x = index * fontSize;

        // Skip columns overlapping the main content
        if (x >= leftBoundary - fontSize && x <= rightBoundary) {
            return;
        }

        const character = characters.charAt(
            Math.floor(Math.random() * characters.length)
        );

        const y = position * fontSize;

        backgroundContext.fillText(character, x, y);

        // Move character downward
        columns[index] += 0.6 + Math.random() * 0.4;

        // Restart column after it leaves the screen
        if (y > height && Math.random() > 0.975) {
            columns[index] = Math.random() * -30;
        }
    });
}

// 4A. Draw Dark Mode Network Animation
function drawNetworkAnimation(timestamp) {
    const width = backgroundCanvas.width;
    const height = backgroundCanvas.height;

    // Clear the previous network frame
    backgroundContext.clearRect(0, 0, width, height);

    // Convert milliseconds to seconds
    const time = timestamp / 1000;

    // Draw connections between nearby nodes
    networkNodes.forEach(function(node, index) {
        for (let i = index + 1; i < networkNodes.length; i++) {
            const otherNode = networkNodes[i];

            const distance = Math.hypot(
                node.x - otherNode.x,
                node.y - otherNode.y
            );

            if (distance > networkConnectionDistance) {
                continue;
            }

            // Prevent connections crossing the central content
            const mainBounds = document.querySelector("main").getBoundingClientRect();

            const bothLeft =
                node.x < mainBounds.left &&
                otherNode.x < mainBounds.left;

            const bothRight =
                node.x > mainBounds.right &&
                otherNode.x > mainBounds.right;

            if (!bothLeft && !bothRight) {
                continue;
            }

            // Gently brighten and fade each connection
            const pulse = (
                Math.sin(time * 1.2 + node.pulseOffset + otherNode.pulseOffset)
                + 1
            ) / 2;

            const opacity = 0.08 + pulse * 0.32;

            backgroundContext.beginPath();
            backgroundContext.moveTo(node.x, node.y);
            backgroundContext.lineTo(otherNode.x, otherNode.y);

            backgroundContext.strokeStyle = `rgba(125, 211, 252, ${opacity})`;
            backgroundContext.lineWidth = 1;
            backgroundContext.stroke();
        }
    });

    // Draw the network nodes
    networkNodes.forEach(function(node) {
        const pulse = (
            Math.sin(time * 1.2 + node.pulseOffset) + 1
        ) / 2;

        const opacity = 0.3 + pulse * 0.6;
        const radius = 1.5 + pulse * 1;

        backgroundContext.beginPath();
        backgroundContext.arc(node.x, node.y, radius, 0, Math.PI * 2);

        backgroundContext.fillStyle = `rgba(125, 211, 252, ${opacity})`;
        backgroundContext.fill();
    });
}

// 4B. Draw Light Mode Floating Blue Waves
function drawLightWaves(timestamp) {
    const width = backgroundCanvas.width;
    const height = backgroundCanvas.height;

    // Clear the previous frame
    backgroundContext.clearRect(0, 0, width, height);

    // Convert milliseconds to seconds
    const time = timestamp / 1000;

    // Find the boundaries of the main content
    const mainBounds = document.querySelector("main").getBoundingClientRect();

    const leftBoundary = mainBounds.left;
    const rightBoundary = mainBounds.right;

    // Draw waves separately on the left and right sides
    const sideAreas = [
        { start: 0, end: leftBoundary },
        { start: rightBoundary, end: width }
    ];

    sideAreas.forEach(function(area) {
        const sideWidth = area.end - area.start;

        // Draw four gently flowing waves per side
        for (let wave = 0; wave < 4; wave++) {
            backgroundContext.beginPath();

            for (let y = 0; y <= height; y += 5) {
                // Smooth horizontal wave movement
                const movement = Math.sin(
                    y * 0.012 - time * 0.5 + wave * 1.2
                );

                const x =
                    area.start +
                    sideWidth * (0.2 + wave * 0.2) +
                    movement * Math.min(25, sideWidth * 0.08);

                if (y === 0) {
                    backgroundContext.moveTo(x, y);
                } else {
                    backgroundContext.lineTo(x, y);
                }
            }

            // Soft blue lines
            backgroundContext.strokeStyle =
                `rgba(100, 170, 220, ${0.18 + wave * 0.04})`;

            backgroundContext.lineWidth = 1.5;
            backgroundContext.stroke();
        }
    });
}

// 5. Animation Loop
function animateBackground(timestamp) {
    animationFrame = requestAnimationFrame(animateBackground);

    // Respect the visitor's reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        backgroundContext.clearRect(
            0,
            0,
            backgroundCanvas.width,
            backgroundCanvas.height
        );
        return;
    }

    // Limit animation to approximately 30 FPS
    if (timestamp - lastFrameTime < 1000 / 30) {
        return;
    }

    lastFrameTime = timestamp;

    const currentTheme = document.documentElement.getAttribute("data-theme");

    // Hide animation when side margins are too narrow
    const mainBounds = document.querySelector("main").getBoundingClientRect();

    if (
        mainBounds.left < 60 ||
        window.innerWidth - mainBounds.right < 60
    ) {
        backgroundContext.clearRect(
            0,
            0,
            backgroundCanvas.width,
            backgroundCanvas.height
        );
        return;
    }

    // Cyber Mode: Matrix Rain
    if (currentTheme === "cyber") {
        drawMatrixRain();
    }

    // Dark Mode: Pulsing Blue Network
    else if (currentTheme === "dark") {
        drawNetworkAnimation(timestamp);
    }

    // Light Mode: Floating Blue Waves
    else if (currentTheme === "light") {
        drawLightWaves(timestamp);
    }
}


// 6. Initialize Background
resizeBackground();
createNetworkNodes();

window.addEventListener("resize", function() {
    resizeBackground();
    createNetworkNodes();
});

animationFrame = requestAnimationFrame(animateBackground);