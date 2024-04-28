const main = document.getElementById('main')
const plane = document.getElementById('plane')
const meteor = document.getElementById('meteor')
const scoreDisplay = document.getElementById('score')
let styleMeteor = window.getComputedStyle(meteor)
let stylePlane = window.getComputedStyle(plane)

let score = 0
let gameOn = true

document.addEventListener("DOMContentLoaded", () => {
    setBackgroundMoving()
    setMeteorMoving()
    window.addEventListener('keyup', changeDirections)
})

function setBackgroundMoving() {
    if (gameOn) {   
        setTimeout(() => {
            const currentPositionBackground = parseInt(main.style.backgroundPositionY) || 0
            main.style.backgroundPositionY = (currentPositionBackground + 1) + 'px'
            setBackgroundMoving()
        }, 5);
    }
}

function changeDirections(e) {
    if (gameOn) {
        const top = parseInt(stylePlane.marginTop)
        const left = parseInt(stylePlane.marginLeft)
        if (e.key == 'ArrowUp') {
            if (top > 10) {   
                plane.style.marginTop = (top - 10) + 'px'
            }
        } else if (e.key == 'ArrowDown') {
            if (top < 400) {   
                plane.style.marginTop = (top + 10) + 'px'
            }
        } else if (e.key == 'ArrowLeft') {
            if (left > 1) {   
                plane.style.marginLeft = (left - 10) + 'px'
            }
        } else if (e.key == 'ArrowRight') {
            if (left < 331) {   
                plane.style.marginLeft = (left + 10) + 'px'
            }
        }
    }
}

function setMeteorMoving() {
    setTimeout(() => {
        const top = parseInt(styleMeteor.marginTop) || 0
        meteor.style.marginTop = (top + 1) + 'px'

        if (top > 500) {
            meteor.style.marginLeft = (Math.floor(Math.random() * 350)) + 'px'
            meteor.style.marginTop = '-100px'
        }

        const planeRect = plane.getBoundingClientRect()
        const meteorRect = meteor.getBoundingClientRect()

        if (meteorRect.bottom >= planeRect.top &&
            meteorRect.top <= planeRect.bottom &&
            meteorRect.right >= planeRect.left &&
            meteorRect.left <= planeRect.right) {
            console.log('crash');
            alert('Game Over')
            gameOn = false
            return;
        } else {
            setTimeout(() => {
                score += 1
            }, 1000);
            scoreDisplay.innerHTML = score
            setMeteorMoving()
        }
    }, 1);
}
