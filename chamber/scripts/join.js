// Join Page Logic

// 1. Set the hidden timestamp value
const timestampInput = document.querySelector('#timestamp');
if (timestampInput) {
    timestampInput.value = new Date().toISOString();
}

// 2. Modal Logic for Membership Levels
const openButtons = document.querySelectorAll('.open-modal');
const closeButtons = document.querySelectorAll('.close-modal');

// Open modal
openButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal(); // Opens the <dialog>
        }
    });
});

// Close modal
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Closes the specific dialog the button belongs to
        e.target.closest('dialog').close();
    });
});