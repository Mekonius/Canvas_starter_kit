import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.lifespan = 1000
  }

  draw() {
    c.beginPath()
    c.arc(
      this.x,
      this.y,
      this.radius,
      0, Math.PI * 2, false
      )
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.lifespan--
  }
}

// Implementation
let particles
function init() {
  particles = []


}

let hue = 0
function GenerateRing() {
    const Circleradius = 20
    const nop = 30

    const particleRadius = 4

  setTimeout(GenerateRing, 50)
    for (let i = 0; i < nop; i++) {
    const radian = (Math.PI * 2) / Circleradius
    const x = mouse.x
    const y = mouse.y
    particles.push(
      new Particle(
       x,
         y,
          particleRadius, `hsl(${hue * 2}, 50%, 50%)`, {
            x: Math.cos(radian * i) * Math.cos(radian * i + 1),
            y: Math.sin(radian * i) * Math.sin(radian * i + 1)
          }))
  }
  if (hue == 360) {
    hue--
  }else {
    hue++
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.05)'
  c.fillRect(0,0, canvas.width, canvas.height)




  particles.forEach((particle, i) => {

    if (particle.lifespan < 0){
      particles.splice(i, 1);
    }else {
      particle.update()
    }
  })
}


init()
animate()
GenerateRing()

