// Keyboard Div
const qwertyDiv = document.querySelector('#qwerty');
// Phrase Div
const phraseDiv = document.querySelector('#phrase');
// Initial Point
let missed = 0;
const scoreboard =  document.querySelector("ol");
// Save hearts as an array
const hearts = scoreboard.children;



/**
 *  Start Game
 *  */
// Target #overlay Div
const overlayDiv = document.querySelector('#overlay');
// Add Event-listener on START button
overlayDiv.addEventListener('click', (e) => {
    if (e.target.className === 'btn__reset') {
        overlayDiv.style.display = 'none';
    }
});

/**
 *  Create Phrase Array
 */
const phrases = [
    "SPEAK OF THE DEVIL",
    "A PIECE OF CAKE",
    "FEAR OF MISSING OUT",
    "BREAK THE ICE",
    "BREAK A LEG",
    "REST IN PEACE",
    "ONCE IN A BLUE MOON",
    "CALL IT A DAY"
]

/**
 * Get a random phrase as array
 */
const getRandomPhraseAsArray = (arr) => {
    //Generate a random number 0-5 to select a phrase from an array
    const randomNumber = Math.floor((Math.random() * arr.length));
    // Pick a random phrase and put the value in randomPhrase
    const randomPhrase = arr[randomNumber];
    return randomPhrase;
}


/** 
 * Set the same display
*/
const addPhraseToDisplay = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const createLi = document.createElement('li');
        createLi.textContent = `${arr[i]}`;
        if (createLi.textContent !== ' ') {
            createLi.className = 'letter';
        } else { 
            createLi.className = 'space';
        }
        phraseDiv.firstElementChild.appendChild(createLi);
    }
}


/**
 * Check Letter
 */

// Loop through all letters in a phrase and match with the button letter
 const checkLetter = (button) => {
     // Does the letter clicked match to one of the existing words?
    let isMatch = false;
    // Target .letters elements
    const letters = document.querySelectorAll('.letter');
    for (let i = 0; i < letters.length; i++) {
        // compare letters to button contents
        if (letters[i].textContent.toLowerCase() === button.textContent.toLowerCase()) {
            isMatch = true;
            // Give a class name 'show'
            letters[i].setAttribute('class', 'letter show');
        }
    }
    if (isMatch == false) {
        // If there's no match, change img source to lostHeart.png
        hearts[missed].firstElementChild.src = './images/lostHeart.png';
        missed += 1;
    }
 }

/**
 * 
 *  Functions for the Event listener for buttons
 * 
 */

// Reset Phrase
const resetPhrase = () => {
    const oldPhrase = phraseDiv.firstElementChild;
    // Remove current 'ul' and append a new 'ul'
    phraseDiv.removeChild(oldPhrase);
    const ul = document.createElement('ul');
    phraseDiv.appendChild(ul);
}

// Reset Buttons
const resetButtons = () => {
    // Remove class 'chosen' from buttons
    const buttons = qwertyDiv.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('class');
        buttons[i].removeAttribute('disabled');
    }
}

// Reset Hearts
const resetHearts = () => {
    // Loop through hearts and change to live hearts
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].firstElementChild.src = './images/liveHeart.png';
        // Return 'missed' value to 0
        missed = 0;
    }
}

// Game Reset function for WIN/LOSE Screen
const gameReset = () => {
    overlayDiv.addEventListener('click', (e) => {
        if (e.target.className === 'btn__reset') {
            resetPhrase();
            resetButtons();
            resetHearts();
            // Add a new phrase
            const newPhraseArray = getRandomPhraseAsArray(phrases);
            addPhraseToDisplay(newPhraseArray);
        }
    });
}

/**
 *  WIN Screen
 */

const winScreen = () => {
    overlayDiv.firstElementChild.textContent = 'You nailed it!';
    overlayDiv.lastElementChild.textContent = 'Play Again!';
    gameReset();
}

/**
 *  LOSE Screen
 */

const loseScreen = () => {
    overlayDiv.firstElementChild.textContent = 'Game Over';
    overlayDiv.lastElementChild.textContent = 'Try Again?';
    gameReset();
}

/**
 * Check Win function
 */
const checkWin = () => {
    // Target .letter elements
    const letters = document.querySelectorAll('.letter');
    // Target .show elements
    const shows = document.querySelectorAll('.show');
    if (letters.length === shows.length) {
        // setTimeout for a smooth transition
        setTimeout( () => {
            overlayDiv.style.display = "";
            overlayDiv.className = "win";
            winScreen();
        }, 1500); 
    }
    if (missed >= 5) {
        setTimeout( () => {
            overlayDiv.style.display = "";
            overlayDiv.className = "lose";
            loseScreen();
        }, 1500);
    }
}

// Pass 'phrases' through the function and store it in a variable
const phraseArray = getRandomPhraseAsArray(phrases);
// Display each words from a random phrase in each 'li' elements
addPhraseToDisplay(phraseArray);

/**
 *  Event listener for buttons (GAME PLAY)
 */

qwertyDiv.addEventListener("click", (e) => {
    if (e.target.type === 'submit') {
    e.target.className = "chosen";
    // Prevent Overlaped Clicks
    e.target.setAttribute('disabled', 'true');
    const button = e.target;
    checkLetter(button);
    checkWin();
    }
});