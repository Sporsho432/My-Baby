// ============================================================
// CANVAS SETUP
// ============================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width;
let height;

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// ============================================================
// COLORS
// ============================================================

const BACKGROUND = "#190513";

const STEM_COLOR = "#2e8b57";
const LEAF_COLOR = "#238b45";
const LEAF_DARK = "#176b35";

const VASE_COLOR = "#7c4a6e";
const VASE_LIGHT = "#b875a0";


// ============================================================
// TEXT
// ============================================================

const WORD = "my love";


// ============================================================
// SPEED
// ============================================================

// This controls how slowly the flowers bloom.
//
// 0.055 = slower
// 0.04  = medium
// 0.025 = faster
//
// The current value is intentionally slow.

const BLOOM_SPEED = 0.032;


// ============================================================
// RANDOM HELPER
// ============================================================

function random(min, max) {
    return Math.random() * (max - min) + min;
}


// ============================================================
// COORDINATE SYSTEM
// ============================================================
//
// The original Turtle program used coordinates where:
//
//      +Y
//       ↑
//       |
// -X ← 0 → +X
//       |
//       ↓
//      -Y
//
// Canvas uses the opposite Y direction.
//
// These functions convert the bouquet coordinates
// into canvas coordinates.
// ============================================================

function canvasX(x) {
    return width / 2 + x;
}

function canvasY(y) {
    return height / 2 - y;
}


// ============================================================
// PETAL POINTS
// ============================================================

function petalPoints(baseX, baseY, baseAngle, length, width, points = 22) {

    const result = [];

    const cosA = Math.cos(baseAngle);
    const sinA = Math.sin(baseAngle);

    for (let i = 0; i <= points; i++) {

        const theta = i * Math.PI / points;

        const out = length * Math.sin(theta);

        const side =
            width *
            Math.sin(theta) *
            Math.cos(theta);

        const rx =
            out * cosA -
            side * sinA;

        const ry =
            out * sinA +
            side * cosA;

        result.push({
            x: baseX + rx,
            y: baseY + ry
        });
    }

    return result;
}


// ============================================================
// DRAW "MY LOVE"
// ============================================================

function writeLove(x, y, scale = 1) {

    ctx.save();

    ctx.translate(canvasX(x), canvasY(y));

    ctx.fillStyle = "rgba(255,255,255,0.92)";

    ctx.font =
        `${Math.max(5, 7 * scale)}px Arial`;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(WORD, 0, 0);

    ctx.restore();
}


// ============================================================
// DRAW A LEAF
// ============================================================

function drawLeaf(
    base,
    angleDeg,
    length,
    leafWidth,
    color = LEAF_COLOR
) {

    const angle =
        angleDeg * Math.PI / 180;

    const points = petalPoints(
        base.x,
        base.y,
        angle,
        length,
        leafWidth,
        22
    );

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    for (const point of points) {

        writeLove(
            point.x,
            point.y,
            1
        );
    }
}


// ============================================================
// BOUQUET LEAVES
// ============================================================

const leaves = [

    // FAR LEFT

    {
        base: { x: -235, y: -55 },
        angle: 150,
        length: 95,
        width: 42,
        color: LEAF_DARK
    },

    {
        base: { x: -205, y: 0 },
        angle: 125,
        length: 80,
        width: 36,
        color: LEAF_COLOR
    },

    {
        base: { x: -170, y: 45 },
        angle: 160,
        length: 70,
        width: 32,
        color: LEAF_COLOR
    },


    // LEFT SIDE

    {
        base: { x: -145, y: 15 },
        angle: 145,
        length: 85,
        width: 38,
        color: LEAF_DARK
    },

    {
        base: { x: -120, y: 65 },
        angle: 125,
        length: 75,
        width: 34,
        color: LEAF_COLOR
    },

    {
        base: { x: -95, y: 90 },
        angle: 155,
        length: 65,
        width: 30,
        color: LEAF_COLOR
    },


    // BETWEEN LEFT FLOWERS

    {
        base: { x: -80, y: -20 },
        angle: 110,
        length: 70,
        width: 30,
        color: LEAF_DARK
    },

    {
        base: { x: -45, y: 45 },
        angle: 140,
        length: 65,
        width: 28,
        color: LEAF_COLOR
    },


    // FAR RIGHT

    {
        base: { x: 235, y: -55 },
        angle: 30,
        length: 95,
        width: 42,
        color: LEAF_DARK
    },

    {
        base: { x: 205, y: 0 },
        angle: 55,
        length: 80,
        width: 36,
        color: LEAF_COLOR
    },

    {
        base: { x: 170, y: 45 },
        angle: 20,
        length: 70,
        width: 32,
        color: LEAF_COLOR
    },


    // RIGHT SIDE

    {
        base: { x: 145, y: 15 },
        angle: 35,
        length: 85,
        width: 38,
        color: LEAF_DARK
    },

    {
        base: { x: 120, y: 65 },
        angle: 55,
        length: 75,
        width: 34,
        color: LEAF_COLOR
    },

    {
        base: { x: 95, y: 90 },
        angle: 25,
        length: 65,
        width: 30,
        color: LEAF_COLOR
    },


    // BETWEEN RIGHT FLOWERS

    {
        base: { x: 80, y: -20 },
        angle: 70,
        length: 70,
        width: 30,
        color: LEAF_DARK
    },

    {
        base: { x: 45, y: 45 },
        angle: 40,
        length: 65,
        width: 28,
        color: LEAF_COLOR
    },


    // LOWER CENTER

    {
        base: { x: -65, y: -70 },
        angle: 120,
        length: 75,
        width: 34,
        color: LEAF_COLOR
    },

    {
        base: { x: 65, y: -70 },
        angle: 60,
        length: 75,
        width: 34,
        color: LEAF_COLOR
    },

    {
        base: { x: -30, y: -55 },
        angle: 145,
        length: 65,
        width: 28,
        color: LEAF_DARK
    },

    {
        base: { x: 30, y: -55 },
        angle: 35,
        length: 65,
        width: 28,
        color: LEAF_DARK
    }
];


// ============================================================
// FLOWER DEFINITIONS
// ============================================================

const lilyRings = [

    {
        radius: 0,
        count: 4,
        length: 35,
        width: 14,
        color: "#f6a821",
        offset: 45
    },

    {
        radius: 10,
        count: 5,
        length: 45,
        width: 23,
        color: "#ffd27f",
        offset: 0
    },

    {
        radius: 20,
        count: 7,
        length: 65,
        width: 32,
        color: "#ffe9b3",
        offset: 30
    },

    {
        radius: 30,
        count: 9,
        length: 82,
        width: 40,
        color: "#fff6df",
        offset: 15
    },

    {
        radius: 40,
        count: 12,
        length: 100,
        width: 50,
        color: "#fffdf5",
        offset: 0
    }
];


const orchidRings = [

    {
        radius: 0,
        count: 4,
        length: 35,
        width: 14,
        color: "#f7e8ff",
        offset: 45
    },

    {
        radius: 10,
        count: 5,
        length: 45,
        width: 23,
        color: "#e3bbf2",
        offset: 0
    },

    {
        radius: 20,
        count: 7,
        length: 65,
        width: 32,
        color: "#c77dff",
        offset: 30
    },

    {
        radius: 30,
        count: 9,
        length: 82,
        width: 40,
        color: "#9d4edd",
        offset: 15
    },

    {
        radius: 40,
        count: 12,
        length: 100,
        width: 50,
        color: "#7b2cbf",
        offset: 0
    }
];


// ============================================================
// BOUQUET LAYOUT
// ============================================================

const bouquet = [

    // Back-left orchid

    {
        x: -250,
        y: 80,
        scale: 0.52,
        rings: orchidRings
    },

    // Back-right lily

    {
        x: 240,
        y: 85,
        scale: 0.52,
        rings: lilyRings
    },

    // Middle-left lily

    {
        x: -145,
        y: 135,
        scale: 0.60,
        rings: lilyRings
    },

    // Middle-right orchid

    {
        x: 140,
        y: 140,
        scale: 0.60,
        rings: orchidRings
    },

    // Center-left orchid

    {
        x: -55,
        y: 185,
        scale: 0.64,
        rings: orchidRings
    },

    // Center-right lily

    {
        x: 55,
        y: 190,
        scale: 0.64,
        rings: lilyRings
    }
];


// ============================================================
// DRAW STEMS
// ============================================================

function drawStems() {

    const vaseTop = {
        x: 0,
        y: -205
    };

    const flowerStems = [

        { x: -250, y: 80 },
        { x: -175, y: 115 },
        { x: -90, y: 155 },
        { x: 45, y: 165 },
        { x: 140, y: 115 },
        { x: 240, y: 85 }

    ];

    ctx.lineWidth = 4;
    ctx.strokeStyle = STEM_COLOR;
    ctx.lineCap = "round";

    flowerStems.forEach((flower, i) => {

        ctx.beginPath();

        ctx.moveTo(
            canvasX(vaseTop.x),
            canvasY(vaseTop.y)
        );

        const steps = 40;

        for (let j = 1; j <= steps; j++) {

            const t = j / steps;

            const curve =
                Math.sin(t * Math.PI) *
                (i - 2.5) *
                22;

            const x =
                vaseTop.x +
                (flower.x - vaseTop.x) * t +
                curve;

            const y =
                vaseTop.y +
                (flower.y - vaseTop.y) * t;

            ctx.lineTo(
                canvasX(x),
                canvasY(y)
            );
        }

        ctx.stroke();
    });

    ctx.lineWidth = 1;
}


// ============================================================
// DRAW LEAVES
// ============================================================

function drawAllLeaves() {

    for (const leaf of leaves) {

        drawLeaf(
            leaf.base,
            leaf.angle,
            leaf.length,
            leaf.width,
            leaf.color
        );
    }
}


// ============================================================
// FLOWER BLOOM STATE
// ============================================================

const flowers = bouquet.map(flower => {

    return {
        ...flower,
        progress: 0
    };

});


// ============================================================
// DRAW ONE FLOWER
// ============================================================

function drawFlower(flower) {

    const {
        x: cx,
        y: cy,
        scale,
        rings,
        progress
    } = flower;

    let totalPetals = 0;

    rings.forEach(ring => {
        totalPetals += ring.count;
    });

    const totalProgress =
        progress * totalPetals;

    let completedPetals =
        Math.floor(totalProgress);

    let currentPetalProgress =
        totalProgress - completedPetals;

    let petalNumber = 0;


    // Draw ring-by-ring

    for (const ring of rings) {

        for (let i = 0; i < ring.count; i++) {

            if (petalNumber > completedPetals) {
                return;
            }

            const angle =
                (
                    360 / ring.count
                ) * i +
                ring.offset;

            const angleRad =
                angle * Math.PI / 180;

            const baseX =
                cx +
                ring.radius *
                scale *
                Math.cos(angleRad);

            const baseY =
                cy +
                ring.radius *
                scale *
                Math.sin(angleRad);


            // ====================================================
            // Petal growth
            // ====================================================

            let petalProgress = 1;

            if (petalNumber === completedPetals) {

                petalProgress =
                    currentPetalProgress;
            }

            // Smooth blooming curve

            const eased =
                1 -
                Math.pow(
                    1 - petalProgress,
                    3
                );

            const length =
                ring.length *
                scale *
                eased;

            const leafWidth =
                ring.width *
                scale *
                eased;


            if (length > 0.5) {

                const points =
                    petalPoints(
                        baseX,
                        baseY,
                        angleRad,
                        length,
                        leafWidth,
                        22
                    );

                for (const point of points) {

                    writeLove(
                        point.x,
                        point.y,
                        1
                    );
                }
            }

            petalNumber++;
        }
    }
}


// ============================================================
// VASE
// ============================================================

function drawVase() {

    // Vase body

    ctx.fillStyle = "#542846";
    ctx.strokeStyle = VASE_COLOR;
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(
        canvasX(-105),
        canvasY(-225)
    );

    ctx.lineTo(
        canvasX(-95),
        canvasY(-280)
    );

    ctx.lineTo(
        canvasX(-65),
        canvasY(-315)
    );

    ctx.lineTo(
        canvasX(65),
        canvasY(-315)
    );

    ctx.lineTo(
        canvasX(95),
        canvasY(-280)
    );

    ctx.lineTo(
        canvasX(105),
        canvasY(-225)
    );

    ctx.closePath();

    ctx.fill();
    ctx.stroke();


    // Vase rim

    ctx.fillStyle = "#6b3558";
    ctx.strokeStyle = VASE_LIGHT;

    ctx.beginPath();

    ctx.moveTo(
        canvasX(-115),
        canvasY(-220)
    );

    ctx.lineTo(
        canvasX(115),
        canvasY(-220)
    );

    ctx.lineTo(
        canvasX(108),
        canvasY(-238)
    );

    ctx.lineTo(
        canvasX(-108),
        canvasY(-238)
    );

    ctx.closePath();

    ctx.fill();
    ctx.stroke();


    // Vase highlight

    ctx.strokeStyle = "#c987ad";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.arc(
        canvasX(-5),
        canvasY(-260),
        60,
        Math.PI * 0.55,
        Math.PI * 0.95
    );

    ctx.stroke();

    ctx.lineWidth = 1;
}


// ============================================================
// HEARTS
// ============================================================

const hearts = [];

const flowerCenters = bouquet.map(
    flower => ({
        x: flower.x,
        y: flower.y
    })
);


for (let i = 0; i < 25; i++) {

    let x;
    let y;

    let valid = false;

    while (!valid) {

        x = random(-430, 430);
        y = random(-180, 300);

        valid =
            flowerCenters.every(
                center =>
                    Math.hypot(
                        x - center.x,
                        y - center.y
                    ) > 90
            );
    }

    hearts.push({
        x,
        y,
        size: random(8, 13)
    });
}


function drawHearts() {

    ctx.fillStyle = "#ff99cc";

    hearts.forEach(heart => {

        ctx.save();

        ctx.translate(
            canvasX(heart.x),
            canvasY(heart.y)
        );

        ctx.font =
            `${heart.size}px Courier`;

        ctx.fontWeight = "bold";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
            "<3",
            0,
            0
        );

        ctx.restore();
    });
}


// ============================================================
// BACKGROUND
// ============================================================

function drawBackground() {

    ctx.fillStyle = BACKGROUND;

    ctx.fillRect(
        0,
        0,
        width,
        height
    );
}


// ============================================================
// MAIN ANIMATION
// ============================================================

let lastTime = 0;

function animate(timestamp) {

    if (!lastTime) {
        lastTime = timestamp;
    }

    const delta =
        timestamp - lastTime;

    lastTime = timestamp;


    // Background

    drawBackground();


    // Stems

    drawStems();


    // Leaves

    drawAllLeaves();


    // ========================================================
    // BLOOM ALL FLOWERS TOGETHER
    // ========================================================

    let finished = true;

    flowers.forEach(flower => {

        if (flower.progress < 1) {

            flower.progress +=
                BLOOM_SPEED *
                (delta / 16.67);

            if (flower.progress > 1) {
                flower.progress = 1;
            }
        }

        if (flower.progress < 1) {
            finished = false;
        }

        drawFlower(flower);
    });


    // Vase

    drawVase();


    // Hearts appear after flowers are finished

    if (finished) {
        drawHearts();
    }


    // Continue animation

    requestAnimationFrame(animate);
}


// ============================================================
// START
// ============================================================

requestAnimationFrame(animate);


// ============================================================
// CLICK
// ============================================================

canvas.addEventListener("click", () => {

    // Restart the entire animation when clicked.

    flowers.forEach(
        flower => flower.progress = 0
    );

    lastTime = 0;
});


// Also works nicely on phones/tablets

canvas.addEventListener(
    "touchstart",
    () => {

        flowers.forEach(
            flower => flower.progress = 0
        );

        lastTime = 0;
    },
    { passive: true }
);
