const input = document.getElementById('readerName');
const button = document.getElementById('enterLibrary');

button.addEventListener('click', () => {
  const name = (input.value || 'زائر').trim();
  localStorage.setItem('library_user_name', name);
  window.alert(`مرحباً ${name}، أنت الآن داخل المكتبة.`);
});
