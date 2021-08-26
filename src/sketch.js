/**
 * Title
 * Started: 8/22/21
 * By: Art See Clarke
 * Twitter: https://twitter.com/thecodemedium
 * GitHub: https://github.com/codemedium
 * Personal website: https://codemedium.com
 *
 * 		 "Any sufficiently advanced technology is indistinguishable from magic"
 * 		 - Arthur C. Clarke
 *
 * Description: 
 */

/**
 * Main brush
 */
main = {
  strokeWeight: 1
}

/**
 * Color palettes
 */
// VSCode Shades of purple editor colors
colors = ['#ffffff', '#ff628c', '#FF9D00', '#fad000', '#2ca300', '#2EC4B6', '#5D37F0']
bgColor = [0, 25, 60]

/**
 * Sketch entry point
 */
function setup() {
  params = Object.assign({
    maxDepth: 6
  }, getURLParams())

	createCanvas(windowWidth, windowHeight)

  background(bgColor)
  main.obj = new BinarySpacePartition()
}

function draw() {
  main.obj
}

/**
 * Returns a color in colors
 */
function getColor (transparent = '') {
  return colors[Math.floor(random(colors.length))] + transparent
}

/**
 * Creates a new binary space partition
 */
class BinarySpacePartition {
  constructor () {
    this.x = 0
    this.y = 0
    this.width = windowWidth
    this.height = windowHeight
    this.recreate()
    this.draw()
  }

  recreate () {
    this.children = this.subdivide(0, this)
  }

  /**
   * Draw once
   */
  draw () {    
    this.updateChildren(this.children)
  }
  
  /**
   * Recursive method that subdivides the rectangle
   */
  subdivide (depth = 0, parent) {
    const divisions = [{}, {}, {}, {}]
    
    // Setup properties and maybe create children
    divisions.forEach((division, i) => {
      divisions[i].isDivided = random() > Math.min(depth / 10 + .1, .9)
      divisions[i].fill = getColor()
      divisions[i].width = parent.width / 2
      divisions[i].height = parent.height / 2
    })
    
    // NW
    divisions[0].x = parent.x
    divisions[0].y = parent.y
    // NE
    divisions[1].x = parent.x + parent.width / 2
    divisions[1].y = parent.y
    // SE
    divisions[2].x = parent.x + parent.width / 2
    divisions[2].y = parent.y + parent.height / 2
    // SW
    divisions[3].x = parent.x
    divisions[3].y = parent.y + parent.height / 2
    
    // Setup children
    ++depth
    divisions.forEach((division, i) => {
      if (divisions[i].isDivided && depth < params.maxDepth) {
        divisions[i].children = this.subdivide(depth, divisions[i])
      }
    })
    
    return divisions
  }
    
  /**
   * Recursively update children
   */
  updateChildren (children) {
    children.forEach(child => {
      strokeWeight(main.strokeWeight)
      stroke(100)
      fill(child.fill)
      rect(child.x, child.y, child.width, child.height)

      // Draw children or...
      if (child.children) {
        this.updateChildren(child.children)
      // ... Maybe draw a shape
      } else {
        if (random() > .7) {
          let size = Math.min(child.width, child.height)
          noStroke()
          fill(getColor())
          let size = Math.min(child.width, child.height) * .35
          star(child.x + child.width / 2, child.y + child.height / 2, size / 2, size, Math.floor(random(3, 10)))
        }
      }
    })
  }
}



/**
 * Creates a star
 * @see https://p5js.org/examples/form-star.html
 */
function star (x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints
  let halfAngle = angle / 2.0
  beginShape()

  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2
    let sy = y + sin(a) * radius2
    vertex(sx, sy)
    sx = x + cos(a + halfAngle) * radius1
    sy = y + sin(a + halfAngle) * radius1
    vertex(sx, sy)
  }
  
  endShape(CLOSE)
}










/**
 * Handle keypressed across multiple files
 */
 function keyPressed () {
  keypressFn.forEach(fn => fn())
}

/**
 * Split keypressed into multiple functions
 * - On my localhost I have another file to record the canvas into a video,
 *   but on OpenProcessing.org this file is not. Locally, the other file
 *   adds another function that starts recording if space is pressed
 * 
 * @see https://github.com/CodeMedium/subdivided-starships
 */
const keypressFn = [function () {
  switch (keyCode) {
    // Space
    case 32:
      main.obj.recreate()
      main.obj.draw()
      break
    // 1
    case 49:
      break
    // 2
    case 50:
      break
    // 3
    case 51:
      break
    // 4
    case 52:
      break
    // 5
    case 53:
      break
  }
}]
