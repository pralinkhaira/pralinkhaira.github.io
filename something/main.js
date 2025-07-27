onload = () => {
    document.body.classList.remove("container");
    
    // Get elements
    const introScreen = document.getElementById('introScreen');
    const flowersContainer = document.getElementById('flowersContainer');
    const clickPrompt = document.getElementById('clickPrompt');
    
    // Function to show flowers
    function showFlowers() {
        // Fade out intro screen
        introScreen.classList.add('fade-out');
        
        // Show flowers after fade out
        setTimeout(() => {
            introScreen.style.display = 'none';
            flowersContainer.style.display = 'block';
            
            // Start flower animations
            document.body.classList.remove("container");
        }, 1000);
    }
    
    // Add click event listeners
    introScreen.addEventListener('click', showFlowers);
    introScreen.addEventListener('touchstart', showFlowers);
    
    // Also allow clicking on the prompt specifically
    clickPrompt.addEventListener('click', showFlowers);
    clickPrompt.addEventListener('touchstart', showFlowers);
};