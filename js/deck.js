const decks = document.querySelectorAll('.cdj-deck');
decks.forEach(deck => {
  const button = deck.querySelector('.start-stop');
  const record = deck.querySelector('.record');
  if (button && record) {
    button.addEventListener('click', () => {
      record.classList.toggle('spinning');
    });
  }
});

