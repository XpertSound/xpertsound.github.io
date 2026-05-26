
// EmailJS Configuration
// Remplacez par vos vraies clés EmailJS
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Feature cards hover effect
document.querySelectorAll('.feature').forEach(card=>{
  card.addEventListener('mouseenter', ()=>{
    card.style.boxShadow='0 0 25px rgba(255,215,0,.25)';
  });
  
  card.addEventListener('mouseleave', ()=>{
    card.style.boxShadow='none';
  });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formMessage = document.getElementById('formMessage');
  const submitButton = this.querySelector('button');
  
  // Disable button during submission
  submitButton.disabled = true;
  submitButton.textContent = 'Envoi en cours...';
  
  // Prepare form data
  const templateParams = {
    from_name: this.nom.value,
    from_email: this.email.value,
    message: this.message.value,
    reply_to: this.email.value
  };
  
  // Send email via EmailJS
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function(response) {
      // Success
      formMessage.textContent = '✅ Message envoyé avec succès ! Nous vous contacterons bientôt.';
      formMessage.style.color = '#00ff00';
      document.getElementById('contactForm').reset();
      
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = 'Envoyer';
      
      // Clear message after 5 seconds
      setTimeout(() => {
        formMessage.textContent = '';
      }, 5000);
    })
    .catch(function(error) {
      // Error
      console.error('Erreur EmailJS:', error);
      formMessage.textContent = '❌ Erreur lors de l\'envoi. Veuillez réessayer.';
      formMessage.style.color = '#ff0000';
      
      // Reset button
      submitButton.disabled = false;
      submitButton.textContent = 'Envoyer';
    });
});
