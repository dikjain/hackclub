const { Engine, Render, Runner, Bodies, World, Events, Body } = Matter;

const engine = Engine.create();
const world = engine.world;

engine.world.gravity.y = 1;

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight - 100,
        wireframes: false,
        background: '#333' // Adding a blackish gradient background
        
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

const shapeDefinitions = [
    { type: 'circle', create: (x, y, size, color) => Bodies.circle(x, y, size / 2, { render: { fillStyle: color } }) },
    { type: 'square', create: (x, y, size, color) => Bodies.rectangle(x, y, size, size, { render: { fillStyle: color } }) },
    { type: 'triangle', create: (x, y, size, color) => Bodies.polygon(x, y, 3, size / 2, { render: { fillStyle: color } }) },
    { type: 'star', create: (x, y, size, color) => Bodies.polygon(x, y, 5, size / 2, { render: { fillStyle: color } }) },
    { type: 'heart', create: (x, y, size, color) => Bodies.polygon(x, y, 6, size / 2, { render: { fillStyle: color } }) },
    { type: 'wave', create: (x, y, size, color) => Bodies.rectangle(x, y, size, size / 2, { render: { fillStyle: color } }) },
    { type: 'hexagon', create: (x, y, size, color) => Bodies.polygon(x, y, 6, size / 2, { render: { fillStyle: color } }) },
    { type: 'pentagon', create: (x, y, size, color) => Bodies.polygon(x, y, 5, size / 2, { render: { fillStyle: color } }) },
    { type: 'octagon', create: (x, y, size, color) => Bodies.polygon(x, y, 8, size / 2, { render: { fillStyle: color } }) },
    { type: 'diamond', create: (x, y, size, color) => Bodies.rectangle(x, y, size, size / 2, { render: { fillStyle: color } }) },
    { type: 'parallelogram', create: (x, y, size, color) => Bodies.rectangle(x, y, size, size / 2, { render: { fillStyle: color } }) },
    { type: 'trapezoid', create: (x, y, size, color) => Bodies.trapezoid(x, y, size, size / 2, 0.5, { render: { fillStyle: color } }) },
    { type: 'crescent', create: (x, y, size, color) => Bodies.circle(x, y, size / 2, { render: { fillStyle: color } }) },
    { type: 'cross', create: (x, y, size, color) => Bodies.rectangle(x, y, size, size / 2, { render: { fillStyle: color } }) },
    { type: 'arrow', create: (x, y, size, color) => Bodies.rectangle(x, y, size, size / 2, { render: { fillStyle: color } }) },
    { type: 'ellipse', create: (x, y, size, color) => Bodies.circle(x, y, size / 2, { render: { fillStyle: color } }) },
    { type: 'rhombus', create: (x, y, size, color) => Bodies.rectangle(x, y, size, size / 2, { render: { fillStyle: color } }) },
    { type: 'kite', create: (x, y, size, color) => Bodies.rectangle(x, y, size, size / 2, { render: { fillStyle: color } }) },
    { type: 'spiral', create: (x, y, size, color) => Bodies.circle(x, y, size / 2, { render: { fillStyle: color } }) },
    { type: 'starburst', create: (x, y, size, color) => Bodies.polygon(x, y, 8, size / 2, { render: { fillStyle: color } }) },
    // Adding 10 more smaller shapes
    { type: 'smallCircle', create: (x, y, size, color) => Bodies.circle(x, y, size / 4, { render: { fillStyle: color } }) },
    { type: 'smallSquare', create: (x, y, size, color) => Bodies.rectangle(x, y, size / 2, size / 2, { render: { fillStyle: color } }) },
    { type: 'smallTriangle', create: (x, y, size, color) => Bodies.polygon(x, y, 3, size / 4, { render: { fillStyle: color } }) },
    { type: 'smallStar', create: (x, y, size, color) => Bodies.polygon(x, y, 5, size / 4, { render: { fillStyle: color } }) },
    { type: 'smallHeart', create: (x, y, size, color) => Bodies.polygon(x, y, 6, size / 4, { render: { fillStyle: color } }) },
    { type: 'smallWave', create: (x, y, size, color) => Bodies.rectangle(x, y, size / 2, size / 4, { render: { fillStyle: color } }) },
    { type: 'smallHexagon', create: (x, y, size, color) => Bodies.polygon(x, y, 6, size / 4, { render: { fillStyle: color } }) },
    { type: 'smallPentagon', create: (x, y, size, color) => Bodies.polygon(x, y, 5, size / 4, { render: { fillStyle: color } }) },
    { type: 'smallOctagon', create: (x, y, size, color) => Bodies.polygon(x, y, 8, size / 4, { render: { fillStyle: color } }) },
    { type: 'smallDiamond', create: (x, y, size, color) => Bodies.rectangle(x, y, size / 2, size / 4, { render: { fillStyle: color } }) }
];

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5'];

const bodies = shapeDefinitions.map(def => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight);
    const size = 50 + Math.random() * 100;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const body = def.create(x, y, size, color);
    World.add(world, body);
    return body;
});

const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 50, window.innerWidth, 100, {
    isStatic: true,
    render: {
        visible: false
    }
});

const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, {
    isStatic: true,
    render: {
        visible: false
    }
});

const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, {
    isStatic: true,
    render: {
        visible: false
    }
});

World.add(world, [ground, leftWall, rightWall]);

let attractMode = false;

document.addEventListener('mousemove', (event) => {
    if (!attractMode) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        bodies.forEach(body => {
            const dx = body.position.x - mouseX;
            const dy = body.position.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const forceMagnitude = 0.05 * body.mass;
                const force = {
                    x: (dx / distance) * forceMagnitude,
                    y: (dy / distance) * forceMagnitude
                };
                Body.applyForce(body, body.position, force);
            }
        });
    }
});

document.addEventListener('mousemove', (event) => {
    const cursorBall = document.createElement('div');
    cursorBall.style.width = '40px';
    cursorBall.style.height = '40px';
    cursorBall.style.borderRadius = '50%';
    cursorBall.style.position = 'absolute';
    cursorBall.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    cursorBall.style.pointerEvents = 'none';
    cursorBall.style.left = `${event.clientX - 20}px`;
    cursorBall.style.top = `${event.clientY - 20}px`;
    document.body.appendChild(cursorBall);
    
    setTimeout(() => {
        cursorBall.style.transition = 'width 0.1s, height 0.1s, left 0.1s, top 0.1s';
        cursorBall.style.width = '20px';
        cursorBall.style.height = '20px';
        cursorBall.style.left = `${event.clientX - 20}px`;
        cursorBall.style.top = `${event.clientY - 20}px`;
    }, 0);

    setTimeout(() => {
        cursorBall.remove();
    }, 100);
});

const button = document.createElement('button');
button.textContent = 'Toggle Gravity';
button.style.position = 'absolute';
button.style.top = '10px';
button.style.left = '10px';
button.style.zIndex = '1000';
button.style.padding = '10px 20px';
button.style.fontSize = '16px';
button.style.backgroundColor = 'green';
button.style.color = '#fff';
button.style.border = 'none';
button.style.borderRadius = '5px';
button.style.cursor = 'pointer';
document.body.appendChild(button);
button.addEventListener('click', () => {
    engine.world.gravity.y = engine.world.gravity.y === 0 ? 1 : 0;
    button.style.backgroundColor = engine.world.gravity.y === 1 ? 'green' : '#333';
});

const attractButton = document.createElement('button');
attractButton.textContent = 'Attract Shapes';
attractButton.style.position = 'absolute';
attractButton.style.top = '50px';
attractButton.style.left = '10px';
attractButton.style.zIndex = '1000';
attractButton.style.padding = '10px 20px';
attractButton.style.fontSize = '16px';
attractButton.style.backgroundColor = '#333';
attractButton.style.color = '#fff';
attractButton.style.border = 'none';
attractButton.style.borderRadius = '5px';
attractButton.style.cursor = 'pointer';
document.body.appendChild(attractButton);

attractButton.addEventListener('click', () => {
    attractMode = !attractMode;
    attractButton.style.backgroundColor = attractMode ? 'green' : '#333';
});

document.addEventListener('mousemove', (event) => {
    if (attractMode) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        bodies.forEach(body => {
            const dx = mouseX - body.position.x;
            const dy = mouseY - body.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 1000) {
                const forceMagnitude = 0.04 * body.mass;
                const force = {
                    x: (dx / distance) * forceMagnitude,
                    y: (dy / distance) * forceMagnitude
                };
                Body.setVelocity(body, { x: 0, y: 0 });
                Body.applyForce(body, body.position, force);
            }
        });
    }
});

window.addEventListener('resize', () => {
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight - 100;

    Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight - 50 });
    Body.setVertices(ground, [
        { x: 0, y: window.innerHeight - 100 },
        { x: window.innerWidth, y: window.innerHeight - 100 },
        { x: window.innerWidth, y: window.innerHeight },
        { x: 0, y: window.innerHeight }
    ]);
    

    Body.setPosition(leftWall, { x: -50, y: window.innerHeight / 2 });
    Body.setVertices(leftWall, [
        { x: -100, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: window.innerHeight },
        { x: -100, y: window.innerHeight }
    ]);

    Body.setPosition(rightWall, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
    Body.setVertices(rightWall, [
        { x: window.innerWidth, y: 0 },
        { x: window.innerWidth + 100, y: 0 },
        { x: window.innerWidth + 100, y: window.innerHeight },
        { x: window.innerWidth, y: window.innerHeight }
    ]);
});

// Change shape colors every 2 seconds
setInterval(() => {
    bodies.forEach(body => {
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        body.render.fillStyle = newColor;
        
    });
}, 1000);

const backgroundText = document.createElement('div');
backgroundText.style.boxShadow = '0 0 0px 0 rgba(0, 0, 0, 0.5)';
backgroundText.style.border = '0px';
backgroundText.innerHTML = 'DEVELOPED BY DIKSHIT MAHANOT | INDIA';
backgroundText.style.position = 'absolute';
backgroundText.style.top = '50%';
backgroundText.style.left = '50%';
backgroundText.style.transform = 'translate(-50%, -50%)';
backgroundText.style.fontSize = '24px';
backgroundText.style.color = '#666';
backgroundText.style.zIndex = '0';
backgroundText.style.fontFamily = 'Arial, sans-serif';
backgroundText.style.letterSpacing = '2px';
backgroundText.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.5)';
backgroundText.style.fontWeight = 'bold ';
document.body.appendChild(backgroundText);
