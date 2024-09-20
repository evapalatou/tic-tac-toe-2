function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Run confetti on page load to test
window.onload = function() {
    triggerConfetti();
};