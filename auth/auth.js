/**
 * Authentication JavaScript
 * Handles login form validation and interactions
 */

(function() {
  'use strict';

  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('password');
  const emailInput = document.getElementById('email');

  // Form validation
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset previous errors
      clearErrors();
      
      // Validate form
      const isValid = validateForm();
      
      if (isValid) {
        // Show loading state
        const submitButton = loginForm.querySelector('.btn-primary');
        if (submitButton) {
          submitButton.classList.add('loading');
          submitButton.disabled = true;
        }
        
        // Simulate API call (replace with actual authentication)
        setTimeout(() => {
          // Redirect to dashboard (replace with actual redirect logic)
          window.location.href = '/dashboard/dashboard.html';
        }, 1000);
      }
    });

    // Real-time validation
    [emailInput, passwordInput].forEach(input => {
      if (input) {
        input.addEventListener('blur', function() {
          validateField(this);
        });
        
        input.addEventListener('input', function() {
          if (this.classList.contains('error')) {
            validateField(this);
          }
        });
      }
    });
  }

  function validateForm() {
    let isValid = true;
    
    if (emailInput) {
      if (!validateField(emailInput)) {
        isValid = false;
      }
    }
    
    if (passwordInput) {
      if (!validateField(passwordInput)) {
        isValid = false;
      }
    }
    
    return isValid;
  }

  function validateField(field) {
    const fieldId = field.id;
    const errorElement = document.getElementById(`${fieldId}-error`);
    let isValid = true;
    let errorMessage = '';

    // Remove previous error state
    field.classList.remove('error');
    if (errorElement) {
      errorElement.classList.remove('show');
      errorElement.textContent = '';
    }

    // Email validation
    if (fieldId === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!field.value.trim()) {
        errorMessage = 'Email address is required';
        isValid = false;
      } else if (!emailRegex.test(field.value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
      }
    }

    // Password validation
    if (fieldId === 'password') {
      if (!field.value.trim()) {
        errorMessage = 'Password is required';
        isValid = false;
      } else if (field.value.length < 6) {
        errorMessage = 'Password must be at least 6 characters';
        isValid = false;
      }
    }

    // Show error if invalid
    if (!isValid && errorElement) {
      field.classList.add('error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('show');
    }

    return isValid;
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.form-input.error');
    
    errorMessages.forEach(error => {
      error.classList.remove('show');
      error.textContent = '';
    });
    
    errorFields.forEach(field => {
      field.classList.remove('error');
    });
  }
})();

