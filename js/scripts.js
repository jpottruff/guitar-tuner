// After page has loaded
document.addEventListener('DOMContentLoaded', function () {
  // 1. Get all the notes from the document
  const notes = document.querySelectorAll('.note');

  // 2. Add event Listeners
  window.addEventListener('keydown', handleKeydown);
  notes.forEach((note) => note.addEventListener('click', handleClick));
  notes.forEach((note) =>
    note.addEventListener('transitionend', removeTransition)
  );
});

// Functions

function handleClick(e) {
  playSound(e.target.getAttribute('data-key'));
}

function handleKeydown(e) {
  playSound(e.keyCode);
}

function playSound(keyCode) {
  // 1. Define the audio that needs to be played based off the key code
  let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!audio) {
    audio = document.querySelector(`audio[data-key-alt="${keyCode}"]`);
  }

  // If there's no audio to play return
  if (!audio) return;

  // 2. Selecting the Note that was pressed so it can be animated
  let note = document.querySelector(`.note[data-key="${keyCode}"]`);
  if (!note) {
    note = document.querySelector(`.note[data-key-alt="${keyCode}"]`);
  }

  // 3. Play the audio and add a class of 'playing'
  audio.currentTime = 0; // allows the button to be pressed and trigger again without waiting for sound to finish
  audio.play();
  note.classList.add('playing');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}
