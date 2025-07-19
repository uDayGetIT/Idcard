const form = document.getElementById('cardForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const profileDisplay = document.getElementById('profileDisplay');
const nameDisplay = document.getElementById('nameDisplay');
const idNumber = document.getElementById('idNumber');
const mobileNumber = document.getElementById('mobileNumber');
const emergencyContact = document.getElementById('emergencyContact');
const uploadArea = document.getElementById('uploadArea');
const photoInput = document.getElementById('photoInput');
const generateBtn = document.getElementById('generateBtn');

let uploadedPhoto = null;

// File Upload Handling
uploadArea.addEventListener('click', () => photoInput.click());
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = '#667eea';
  uploadArea.style.background = 'rgba(102, 126, 234, 0.1)';
});
uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.borderColor = '#cbd5e0';
  uploadArea.style.background = '#f8f9fa';
});
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = '#cbd5e0';
  uploadArea.style.background = '#f8f9fa';
  const files = e.dataTransfer.files;
  if (files.length > 0) handlePhotoUpload(files[0]);
});
photoInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) handlePhotoUpload(e.target.files[0]);
});
function handlePhotoUpload(file) {
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedPhoto = e.target.result;
      updateProfilePhoto();
      uploadArea.innerHTML = `
        <div class="upload-icon">✓</div>
        <div class="upload-text">Photo uploaded successfully</div>
        <input type="file" class="file-input" accept="image/*">
      `;
      // Re-attach event listener
      const newInput = uploadArea.querySelector('.file-input');
      newInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) handlePhotoUpload(e.target.files[0]);
      });
    };
    reader.readAsDataURL(file);
  }
}
function updateProfilePhoto() {
  if (uploadedPhoto) {
    profileDisplay.innerHTML = `<img src="${uploadedPhoto}" alt="Profile Photo">`;
  }
}

firstNameInput.addEventListener('input', updateName);
lastNameInput.addEventListener('input', updateName);
function updateName() {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  nameDisplay.textContent = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : 'Student Name';
}

function generateRandomData() {
  const prefixes = ['ME', 'BE'];
  const randomPrefix = prefixes[Math.floor(Math.random()*prefixes.length)];
  const randomNumber = Math.floor(Math.random() * 900) + 100;
  idNumber.textContent = `${randomPrefix}2024${randomNumber}`;
  mobileNumber.textContent = Math.floor(Math.random() * 9000000000) + 1000000000;
  emergencyContact.textContent = '+91 ' + (Math.floor(Math.random() * 9000000000) + 1000000000);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  generateBtn.classList.add('generating');
  generateBtn.textContent = 'Generating...';
  setTimeout(() => {
    generateCard();
    generateBtn.classList.remove('generating');
    generateBtn.textContent = 'Generate ID Card';
  }, 1000);
});
function generateCard() {
  nameDisplay.textContent = `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`;
  generateRandomData();
}

window.addEventListener('load', () => {
  generateRandomData();
  nameDisplay.textContent = 'Uday K';
});
