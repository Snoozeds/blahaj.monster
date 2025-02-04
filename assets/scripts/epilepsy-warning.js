document.addEventListener('DOMContentLoaded', () => {
    const warningContainer = document.getElementById('epilepsy-warning-container');

    // Check if user has already seen the warning
    if (localStorage.getItem('epilepsyWarningDismissed') === 'true') {
        return;
    }

    fetch('/assets/components/epilepsy-warning.html')
        .then(response => response.text())
        .then(html => {
            warningContainer.innerHTML = html;

            // Wait a brief moment to ensure DOM is updated
            setTimeout(() => {
                const warning = document.getElementById('epilepsy-warning');
                const continueButton = document.getElementById('continue-button');
                const motionToggle = document.getElementById('warning-motion-toggle');
                const pageMotionToggle = document.getElementById('motion-toggle');

                if (continueButton && warning) {
                    continueButton.addEventListener('click', () => {
                        // Mark warning as dismissed in localStorage
                        localStorage.setItem('epilepsyWarningDismissed', 'true');

                        // Apply reduced motion if toggle is checked and element exists
                        if (motionToggle.checked && pageMotionToggle) {
                            pageMotionToggle.checked = true;

                            // Trigger change event to apply reduced motion styles
                            const changeEvent = new Event('change');
                            pageMotionToggle.dispatchEvent(changeEvent);
                        }
                        warning.style.display = 'none';
                    });
                }
            }, 0);
        })
});