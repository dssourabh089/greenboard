document.addEventListener("DOMContentLoaded", () => {

    // --- YOUR PERSONAL GOOGLE SHEETS DEPLOYMENT URL COMPONENT ---
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbzLDvO2i8Yc7sgs7aZiepeJ-R1LB4Z7W8q0Xs0JXLjAYpAsy01uTWuiZr1L1NOoWiTH/exec";

    // Grab form nodes
    const dataForm = document.getElementById('eco-sheets-form');
    const submitButton = document.getElementById('submit-btn');
    const statusSending = document.getElementById('status-sending');
    const statusSuccess = document.getElementById('status-success');

    // Handle asynchronous database submit event
    dataForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop native HTML navigation routine

        // Transition UI elements to working/loading state
        submitButton.disabled = true;
        submitButton.style.opacity = "0.6";
        statusSending.classList.remove('hidden');
        statusSuccess.classList.add('hidden');

        // Capture user input context explicitly
        const payload = {
            name: document.getElementById('form-name').value,
            email: document.getElementById('form-email').value,
            message: document.getElementById('form-message').value
        };

        // Forward structural layout metrics payload downstream to Google Web Engine
        fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors', // Bypasses cross-origin sandboxing limits safely
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(() => {
            // Success Routine
            statusSending.classList.add('hidden');
            statusSuccess.classList.remove('hidden');
            dataForm.reset(); // Clear all form inputs
            
            // Re-enable button state
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
        })
        .catch(error => {
            // Exception Error Handle
            console.error('Data sync interface breakdown details:', error);
            statusSending.classList.add('hidden');
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
            alert("Network routing error encountered. Sheet connection refused.");
        });
    });


    // --- Animated Impact Counter Optimization Engine ---
    const numbers = document.querySelectorAll('.stat-number');
    const durationSpeed = 150;

    const runCounterCycle = () => {
        numbers.forEach(numElement => {
            const computeProgression = () => {
                const upperLimit = parseInt(numElement.getAttribute('data-target'));
                const currentVal = parseInt(numElement.innerText);
                const stepIncrement = Math.ceil(upperLimit / durationSpeed);

                if (currentVal < upperLimit) {
                    numElement.innerText = currentVal + stepIncrement;
                    setTimeout(computeProgression, 1);
                } else {
                    numElement.innerText = upperLimit.toLocaleString() + "+";
                }
            };
            computeProgression();
        });
    };

    // Trigger statistics ticking dynamically upon scrolling into position
    const visualObserver = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entryItem => {
            if (entryItem.isIntersecting) {
                runCounterCycle();
                observerInstance.unobserve(entryItem.target);
            }
        });
    }, { threshold: 0.6 });

    const targetStatsBar = document.getElementById('stats');
    if (targetStatsBar) visualObserver.observe(targetStatsBar);
});