document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const continueURL = urlParams.get('continue_uri');

  const form = document.getElementById('login-form');

  const action = new URL(form.action);
  action.searchParams.set('continue_uri', continueURL);

  form.action = action;

  const signUpLink = document.querySelector('.signup-link a');

  signUpLink.href = signUpLink.href + '?continue_uri=' + continueURL;
});
