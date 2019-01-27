'use strict';

function getUserGithubRepos(userName) {
  const GITHUB_REPO_URL = `https://api.github.com/users/${userName}/repos`;

  fetch(GITHUB_REPO_URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function displayResults(responseJson) {
  console.log(responseJson);
  $('.repos-list').empty();
  responseJson.forEach(obj =>
    $('.repos-list').append(
      `<li><a href='${obj.url}'>${obj.name}</a></li>`
    )
  );
  $('#results').removeClass('hidden');
};




function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const userName = $(".js-query-username").val();
    getUserGithubRepos(userName);
  });
}
$(watchSubmit);
