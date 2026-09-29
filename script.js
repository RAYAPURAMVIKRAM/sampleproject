/**
 * ==============================================================================
 * Modern Counter Application - JavaScript Logic
 * 
 * This script handles:
 * 1. Tracking the counter state (starts at 0)
 * 2. Listening to user interactions (Button clicks & Keyboard shortcuts)
 * 3. Updating the display number and styling dynamically
 * ==============================================================================
 */

// Step 1: Initialize the state variable
// We use a simple integer variable `count` to store the current number.
let count = 0;

// Step 2: Select DOM elements needed for the counter
// We find elements by their unique IDs defined in index.html.
const counterValueEl = document.getElementById('counterValue');
const counterBadgeEl = document.getElementById('counterBadge');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const increaseBtn = document.getElementById('increaseBtn');

/**
 * Step 3: Function to update the User Interface (UI)
 * This function synchronizes the HTML display with the `count` variable.
 * It also applies color highlights and a pop/bump animation.
 */
function updateUI() {
  // Update the text content of the counter number
  counterValueEl.textContent = count;

  // Reset existing state classes
  counterValueEl.classList.remove('is-positive', 'is-negative');
  counterBadgeEl.classList.remove('is-positive', 'is-negative');

  // Check the value and apply relevant styles and labels
  if (count > 0) {
    counterValueEl.classList.add('is-positive');
    counterBadgeEl.classList.add('is-positive');
    counterBadgeEl.textContent = 'Positive (+' + count + ')';
  } else if (count < 0) {
    counterValueEl.classList.add('is-negative');
    counterBadgeEl.classList.add('is-negative');
    counterBadgeEl.textContent = 'Negative (' + count + ')';
  } else {
    // When count is 0
    counterBadgeEl.textContent = 'Zero';
  }

  // Trigger a smooth bounce/bump animation on number change
  // Removing and re-adding the 'bump' class restarts the CSS animation
  counterValueEl.classList.remove('bump');
  // Trigger DOM reflow to allow animation replay
  void counterValueEl.offsetWidth;
  counterValueEl.classList.add('bump');
}

/**
 * Step 4: Define Core Counter Operations
 */

// Function to increment the count by 1
function handleIncrease() {
  count += 1;
  updateUI();
}

// Function to decrement the count by 1
function handleDecrease() {
  count -= 1;
  updateUI();
}

// Function to reset the count to 0
function handleReset() {
  count = 0;
  updateUI();
}

/**
 * Step 5: Attach Event Listeners to Buttons
 * We listen for the 'click' event on each button and run the corresponding function.
 */
increaseBtn.addEventListener('click', handleIncrease);
decreaseBtn.addEventListener('click', handleDecrease);
resetBtn.addEventListener('click', handleReset);

/**
 * Step 6: Add Keyboard Support (Accessibility & Power-user bonus)
 * Allows users to control the counter without a mouse:
 * - ArrowUp or "+" key: Increase
 * - ArrowDown or "-" key: Decrease
 * - "r" or "R" key: Reset
 */
window.addEventListener('keydown', (event) => {
  // Ignore keyboard shortcuts if the user is typing in an input or textarea
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    return;
  }

  switch (event.key) {
    case '+':
    case '=':
    case 'ArrowUp':
      event.preventDefault();
      handleIncrease();
      // Provide visual feedback by briefly focusing the button
      increaseBtn.focus();
      break;

    case '-':
    case '_':
    case 'ArrowDown':
      event.preventDefault();
      handleDecrease();
      decreaseBtn.focus();
      break;

    case 'r':
    case 'R':
      event.preventDefault();
      handleReset();
      resetBtn.focus();
      break;

    default:
      break;
  }
});

// Run once on page load to ensure initial state is displayed correctly
updateUI();
