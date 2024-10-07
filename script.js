// // Basic Three.js Setup
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('three-container').appendChild(renderer.domElement);

// // Function to create a cube shape with the specified color
// function createCube() {
//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshStandardMaterial({ color: '#003cff' }); // Set color to #003cff
//     return new THREE.Mesh(geometry, material);
// }

// // Create a fixed number of shapes
// const shapes = [];
// const shapeCount = 15; // Set the number of shapes you want

// for (let i = 0; i < shapeCount; i++) {
//     const shape = createCube();
//     shape.position.x = (Math.random() - 0.5) * 10; // Random x position
//     shape.position.y = (Math.random() - 0.5) * 10; // Random y position
//     shape.position.z = (Math.random() - 0.5) * 10; // Random z position
//     shapes.push(shape);
//     scene.add(shape);
// }

// camera.position.z = 5; // Initial camera position

// // Lighting
// const light = new THREE.PointLight(0xffffff, 1, 100);
// light.position.set(5, 5, 5);
// scene.add(light);

// // Handle mouse movement for interaction
// document.addEventListener('mousemove', (event) => {
//     const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//     const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

//     shapes.forEach((shape, index) => {
//         shape.rotation.x += (mouseY * 0.1) * (index + 1) * 0.01; // Rotate based on mouse Y
//         shape.rotation.y += (mouseX * 0.1) * (index + 1) * 0.01; // Rotate based on mouse X
//     });
// });

// // Remove the scroll event listener for zoom effect
// // window.addEventListener('scroll', () => {
// //     const scrollY = window.scrollY;
// //     shapes.forEach(shape => {
// //         shape.scale.set(1, 1, 1); // No scaling effect on scroll
// //     });
// // });

// // Animation function
// function animate() {
//     requestAnimationFrame(animate);

//     // Update rendering
//     renderer.render(scene, camera);
// }

// animate();

// // Adjust canvas on window resize
// window.addEventListener('resize', () => {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     renderer.setSize(width, height);
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
// });


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

camera.position.z = 20; // Move camera back to fit more objects

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

// Track mouse movement
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Load a font for TextGeometry
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const shapes = [];

    // Function to create 3D text geometry for symbols like {}, ;
    function createTextShape(text, x, y, z) {
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: 2,
            height: 0.3,
            curveSegments: 12
        });

        const textMaterial = new THREE.MeshStandardMaterial({ color: '#003cff' });
        const mesh = new THREE.Mesh(textGeometry, textMaterial);

        mesh.position.set(x, y, z);
        scene.add(mesh);
        shapes.push(mesh);
    }

    // Create multiple instances of shapes and position them randomly
    const symbols = ['{ }', 'c++', ';', 'if()', '[ ]', 'js', 'Error', "else", '*'];
    for (let i = 0; i < 30; i++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const x = Math.random() * 40 - 20;
        const y = Math.random() * 30 - 15;
        const z = Math.random() * 20 - 10;
        createTextShape(symbol, x, y, z);
    }

    // Animation function
    function animate() {
        requestAnimationFrame(animate);

        // Update shape rotations based on mouse movement
        shapes.forEach((shape) => {
            shape.rotation.x += 0.02 * mouseY; // Rotate more based on mouse Y position
            shape.rotation.y += 0.02 * mouseX; // Rotate more based on mouse X position
        });

        renderer.render(scene, camera);
    }

    animate();
});

// Adjust canvas on window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

//===========================================

document.addEventListener('DOMContentLoaded', function () {
    const serviceItems = document.querySelectorAll('.service-item');
    const skillItems = document.querySelectorAll('.skills-list li');
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('left')) {
                    entry.target.classList.add('scroll-in-left');
                } else if (entry.target.classList.contains('right')) {
                    entry.target.classList.add('scroll-in-right');
                }
            }
        });
    }, observerOptions);

    // Observe service items
    serviceItems.forEach(item => {
        observer.observe(item);
    });

    // Observe skill items, alternate between left and right
    skillItems.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('left');
        } else {
            item.classList.add('right');
        }
        observer.observe(item);
    });

    // Observe testimonial items, alternate between left and right
    testimonialItems.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('left');
        } else {
            item.classList.add('right');
        }
        observer.observe(item);
    });
});



