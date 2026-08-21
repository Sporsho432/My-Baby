// ============================================================
// CANVAS SETUP
// ============================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width;
let height;

// Original Turtle design size
const DESIGN_WIDTH = 1000;
const DESIGN_HEIGHT = 700;

let drawingScale = 1;


// ============================================================
// RESPONSIVE CANVAS
// ============================================================

function resizeCanvas() {

    const dpr = window.devicePixelRatio || 1;

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Scale the original 1000 x 700 Turtle composition
    // proportionally so it fits phones, tablets and computers.

    drawingScale = Math.min(
        width / DESIGN_WIDTH,
        height / DESIGN_HEIGHT
    );
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
// BLOOM SPEED
// ============================================================
//
// Your original Python version reveals individual points of
// every petal. This JS version does the same.
//
// Smaller number = slower.
//
// 0.002 = very slow
// 0.003 = slow / romantic
// 0.004 = medium
//
// Starting at 0.003.
//

const BLOOM_SPEED = 0.003;


// ============================================================
// RANDOM
// ============================================================

function random(min, max) {
    return Math.random() * (max - min) + min;
}


// ============================================================
// ORIGINAL TURTLE → RESPONSIVE CANVAS COORDINATES
// ============================================================

function canvasX(x) {

    return (
        width / 2 +
        x * drawingScale
    );
}


function canvasY(y) {

    return (
        height / 2 -
        y * drawingScale
    );
}


// ============================================================
// PETAL GEOMETRY
// ============================================================

function petalPoints(
    baseX,
    baseY,
    baseAngle,
    length,
    leafWidth,
    points = 22
) {

    const result = [];

    const cosA = Math.cos(baseAngle);
    const sinA = Math.sin(baseAngle);

    for (let i = 0; i <= points; i++) {

        const theta =
            i * Math.PI / points;

        const out =
            length *
            Math.sin(theta);

        const side =
            leafWidth *
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
//
// The important difference from the previous JS:
//
// The color is supplied to this function.
//
// Therefore:
// - lilies retain their yellow/cream colors
// - orchids retain their purple colors
// - leaves retain their green colors
//

function writeLove(
    x,
    y,
    color,
    fontScale = 1
) {

    ctx.save();

    ctx.translate(
        canvasX(x),
        canvasY(y)
    );

    ctx.fillStyle = color;

    ctx.font =
        `${Math.max(
            4,
            7 * drawingScale * fontScale
        )}px Arial`;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        WORD,
        0,
        0
    );

    ctx.restore();
}


// ============================================================
// DRAW LEAF
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

    const points =
        petalPoints(
            base.x,
            base.y,
            angle,
            length,
            leafWidth,
            22
        );

    for (const point of points) {

        writeLove(
            point.x,
            point.y,
            color
        );
    }
}


// ============================================================
// BOUQUET LEAVES
// ============================================================

const leaves = [

    // --------------------------------------------------------
    // FAR LEFT
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // LEFT SIDE
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // BETWEEN LEFT FLOWERS
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // FAR RIGHT
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // RIGHT SIDE
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // BETWEEN RIGHT FLOWERS
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // LOWER CENTER
    // --------------------------------------------------------

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
// LILY PALETTE
// ============================================================
//
// Same colors as heart.py:
//
// golden-apricot throat
// soft ivory
// white tips
//

const lilyRings = [

    {
        radius: 0,
        count: 4,
        length: 40,
        width: 15,
        color: "#f6a821",
        offset: 45
    },

    {
        radius: 10,
        count: 5,
        length: 50,
        width: 25,
        color: "#ffd27f",
        offset: 0
    },

    {
        radius: 20,
        count: 7,
        length: 70,
        width: 35,
        color: "#ffe9b3",
        offset: 30
    },

    {
        radius: 30,
        count: 9,
        length: 90,
        width: 45,
        color: "#fff6df",
        offset: 15
    },

    {
        radius: 40,
        count: 12,
        length: 110,
        width: 55,
        color: "#fffdf5",
        offset: 0
    }
];


// ============================================================
// ORCHID PALETTE
// ============================================================
//
// Same colors as heart.py:
//
// pale lavender
// rich purple
// deep magenta-purple
//

const orchidRings = [

    {
        radius: 0,
        count: 4,
        length: 40,
        width: 15,
        color: "#f7e8ff",
        offset: 45
    },

    {
        radius: 10,
        count: 5,
        length: 50,
        width: 25,
        color: "#e3bbf2",
        offset: 0
    },

    {
        radius: 20,
        count: 7,
        length: 70,
        width: 35,
        color: "#c77dff",
        offset: 30
    },

    {
        radius: 30,
        count: 9,
        length: 90,
        width: 45,
        color: "#9d4edd",
        offset: 15
    },

    {
        radius: 40,
        count: 12,
        length: 110,
        width: 55,
        color: "#7b2cbf",
        offset: 0
    }
];


// ============================================================
// BOUQUET LAYOUT
// ============================================================

const bouquet = [

    {
        x: -250,
        y: 80,
        scale: 0.52,
        rings: orchidRings
    },

    {
        x: 240,
        y: 85,
        scale: 0.52,
        rings: lilyRings
    },

    {
        x: -145,
        y: 135,
        scale: 0.60,
        rings: lilyRings
    },

    {
        x: 140,
        y: 140,
        scale: 0.60,
        rings: orchidRings
    },

    {
        x: -55,
        y: 185,
        scale: 0.64,
        rings: orchidRings
    },

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

    ctx.lineWidth =
        Math.max(
            1,
            4 * drawingScale
        );

    ctx.strokeStyle =
        STEM_COLOR;

    ctx.lineCap = "round";

    flowerStems.forEach(
        (flower, i) => {

            ctx.beginPath();

            ctx.moveTo(
                canvasX(vaseTop.x),
                canvasY(vaseTop.y)
            );

            const steps = 40;

            for (
                let j = 1;
                j <= steps;
                j++
            ) {

                const t =
                    j / steps;

                const curve =
                    Math.sin(
                        t * Math.PI
                    ) *
                    (i - 2.5) *
                    22;

                const x =
                    vaseTop.x +
                    (flower.x -
                        vaseTop.x) *
                    t +
                    curve;

                const y =
                    vaseTop.y +
                    (flower.y -
                        vaseTop.y) *
                    t;

                ctx.lineTo(
                    canvasX(x),
                    canvasY(y)
                );
            }

            ctx.stroke();
        }
    );

    ctx.lineWidth = 1;
}


// ============================================================
// DRAW ALL LEAVES
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
// CREATE FLOWER ANIMATION
// ============================================================
//
// Instead of using a simple percentage,
// this creates every individual point of every petal.
//
// This closely follows the generator approach in heart.py.
//

function createFlowerAnimation(flower) {

    const points = [];

    const cx = flower.x;
    const cy = flower.y;

    for (const ring of flower.rings) {

        for (
            let i = 0;
            i < ring.count;
            i++
        ) {

            const angle =
                (360 / ring.count) *
                i +
                ring.offset;

            const angleRad =
                angle *
                Math.PI /
                180;

            const baseX =
                cx +
                ring.radius *
                flower.scale *
                Math.cos(angleRad);

            const baseY =
                cy +
                ring.radius *
                flower.scale *
                Math.sin(angleRad);

            const petal =
                petalPoints(
                    baseX,
                    baseY,
                    angleRad,
                    ring.length *
                        flower.scale,
                    ring.width *
                        flower.scale,
                    26
                );

            for (const point of petal) {

                points.push({
                    x: point.x,
                    y: point.y,
                    color: ring.color
                });
            }
        }
    }

    return points;
}


// ============================================================
// CREATE ALL FLOWERS
// ============================================================

const flowers =
    bouquet.map(
        flower => {

            return {
                ...flower,

                points:
                    createFlowerAnimation(
                        flower
                    ),

                currentPoint: 0
            };
        }
    );


// ============================================================
// DRAW FLOWERS
// ============================================================

function drawFlowers() {

    let allFinished = true;

    for (const flower of flowers) {

        // Reveal only a small number of points
        // on each animation frame.

        const pointsToDraw =
            Math.max(
                1,
                Math.floor(
                    flower.points.length *
                    BLOOM_SPEED
                )
            );

        for (
            let i = 0;
            i < pointsToDraw;
            i++
        ) {

            if (
                flower.currentPoint >=
                flower.points.length
            ) {

                break;
            }

            const point =
                flower.points[
                    flower.currentPoint
                ];

            writeLove(
                point.x,
                point.y,
                point.color
            );

            flower.currentPoint++;
        }

        if (
            flower.currentPoint <
            flower.points.length
        ) {

            allFinished = false;
        }
    }

    return allFinished;
}


// ============================================================
// VASE
// ============================================================

function drawVase() {

    ctx.fillStyle =
        "#542846";

    ctx.strokeStyle =
        VASE_COLOR;

    ctx.lineWidth =
        Math.max(
            1,
            2 * drawingScale
        );

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


    // --------------------------------------------------------
    // VASE RIM
    // --------------------------------------------------------

    ctx.fillStyle =
        "#6b3558";

    ctx.strokeStyle =
        VASE_LIGHT;

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


    // --------------------------------------------------------
    // VASE HIGHLIGHT
    // --------------------------------------------------------

    ctx.strokeStyle =
        "#c987ad";

    ctx.lineWidth =
        Math.max(
            1,
            2 * drawingScale
        );

    ctx.beginPath();

    ctx.arc(
        canvasX(-5),
        canvasY(-260),
        60 * drawingScale,
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

const flowerCenters =
    bouquet.map(
        flower => ({
            x: flower.x,
            y: flower.y
        })
    );


for (
    let i = 0;
    i < 25;
    i++
) {

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

    ctx.fillStyle =
        "#ff99cc";

    hearts.forEach(
        heart => {

            ctx.save();

            ctx.translate(
                canvasX(heart.x),
                canvasY(heart.y)
            );

            ctx.font =
                `${Math.max(
                    7,
                    heart.size *
                    drawingScale
                )}px Courier`;

            ctx.fontWeight = "bold";

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(
                "<3",
                0,
                0
            );

            ctx.restore();
        }
    );
}


// ============================================================
// BACKGROUND
// ============================================================

function drawBackground() {

    ctx.fillStyle =
        BACKGROUND;

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

function animate() {

    // --------------------------------------------------------
    // Background
    // --------------------------------------------------------

    drawBackground();


    // --------------------------------------------------------
    // Stems
    // --------------------------------------------------------

    drawStems();


    // --------------------------------------------------------
    // Leaves
    // --------------------------------------------------------

    drawAllLeaves();


    // --------------------------------------------------------
    // Flowers
    // --------------------------------------------------------

    const finished =
        drawFlowers();


    // --------------------------------------------------------
    // Vase
    // --------------------------------------------------------

    drawVase();


    // --------------------------------------------------------
    // Hearts
    // --------------------------------------------------------

    if (finished) {

        drawHearts();
    }


    // Continue animation

    requestAnimationFrame(
        animate
    );
}


// ============================================================
// START ANIMATION
// ============================================================

requestAnimationFrame(
    animate
);


// ============================================================
// CLICK / TOUCH TO RESTART
// ============================================================

function restartAnimation() {

    flowers.forEach(
        flower => {

            flower.currentPoint = 0;
        }
    );
}


canvas.addEventListener(
    "click",
    restartAnimation
);


canvas.addEventListener(
    "touchstart",
    restartAnimation,
    {
        passive: true
    }
);
