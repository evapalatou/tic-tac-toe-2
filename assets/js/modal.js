/**
 * This function (Modal) is handling the welcome instructions.
 * It shows the modal when the page loads, after the index.html page.
 * You have the option to click the 'Start game' button or 'X' to close the modal,
 * If someone clicks anywhere outside the modal, it closes as well.
 */
window.onload = function() {
    const modal = document.getElementById("welcomeModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const spanClose = document.getElementsByClassName("close")[0];

    // Show modal when page loads
    modal.style.display = "block";

    // Close modal when user clicks on "Start Game" button
    closeModalBtn.onclick = function() {
        modal.style.display = "none";
    };

    // Close modal when user clicks on the 'X' (close)
    spanClose.onclick = function() {
        modal.style.display = "none";
    };

    // Close modal if the user clicks anywhere outside the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};