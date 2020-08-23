/* jshint esversion: 6 */
/* jshint esversion: 8 */

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

 // Passing our joke to VOICERSS API
 function tellMe(joke) {
   VoiceRSS.speech({
            key: '87e6bf6557ab4aef9bb8a03225934f4f',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
 }

// Get jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=religious';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    // Catch errors
    console.log('Whoops error:', error);
  }
}

// Event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
