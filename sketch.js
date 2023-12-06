let blocks = [];
let draggingBlock = null;
let offsetX = 0;
let offsetY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  // Define colors and labels for the blocks
  const colors = ['#37B6FF', '#FF942A', '#F1C40F', '#FF6EB2', '#00CC66','#FF9077' ,'#00CCB8', '#FFFD99'];
  const labels = ['Price', 'Quality', 'Availability', 'Selection', 'Functionality', 'Service', 'Partnership', 'Brand'];

  // Determine block positioning based on screen size
  let blockX = 50;
  let blockY = 50;
  const blockWidth = 100;
  const blockHeight = 100;
  const spaceBetweenBlocks = 20; // Space between blocks

  for (let i = 0; i < 8; i++) {
    // Check if the screen is narrow (like a phone)
    if (windowWidth < 600) {
      // Stack blocks vertically for narrow screens
      blockX = (windowWidth - blockWidth) / 2; // Center blocks horizontally
      blockY = i * (blockHeight + spaceBetweenBlocks) + 50;
    } else {
      // Place blocks side by side for wider screens
      blockX = i * (blockWidth + spaceBetweenBlocks) + 50;
      blockY = 50;
    }

    // Create the blocks with labels
    blocks.push({
      x: blockX, 
      y: blockY, 
      width: blockWidth, 
      height: blockHeight, 
      color: colors[i % colors.length], 
      label: labels[i]
    });
  }
}


function draw() {
  background(255);

  // Draw the blocks with labels
  for (let block of blocks) {
    fill(block.color);
    rect(block.x, block.y, block.width, block.height);

    // Voeg tekst toe aan het blok
    fill(0); // Zwart voor tekstkleur
    textSize(16);
    textAlign(CENTER, CENTER);
    text(block.label, block.x + block.width / 2, block.y + block.height / 2);
  }
}

function mousePressed() {
  console.log("Mouse pressed");
  // Check if the mouse is over any block
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];
    if (mouseX >= block.x && mouseX <= block.x + block.width &&
        mouseY >= block.y && mouseY <= block.y + block.height) {
      draggingBlock = block;
      offsetX = mouseX - block.x;
      offsetY = mouseY - block.y;
      break;
    }
  }
}

function mouseReleased() {
  console.log("Mouse released");
  draggingBlock = null;
}

function mouseDragged() {
  console.log("Mouse dragged");
  if (draggingBlock) {
    draggingBlock.x = mouseX - offsetX;
    draggingBlock.y = mouseY - offsetY;
    redraw();  // Redraw the canvas to update the block position
  }
}
