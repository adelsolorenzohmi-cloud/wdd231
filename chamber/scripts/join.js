// Join Page: Set the hidden timestamp value
const timestampInput = document.querySelector('#timestamp');

if (timestampInput) {
    // Captures date and time it was loaded. 
    timestampInput.value = new Date().toISOString();
}