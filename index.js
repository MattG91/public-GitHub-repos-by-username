
// Build repo url list
function gatherUserRepos(repoArray) {
  return repoArray.map(repo => {
    return repo.url;
  });
}

// Render repo nodes to the DOM
function renderRepoNodes(nodes) {
  $('#results-list').empty();
  for (let i=0; i<nodes.length; i++) {
    $('#results-list').append(`<li><a href="${nodes[i]}">${nodes[i]}</a></li>`);
  }
  $('.queryResultsArea').show();
}

// Fetch the users public repos from the GitHub API
function getRepos(userName) {
  const searchUrl = `https://api.github.com/users/${userName}/repos`;
  fetch(searchUrl)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(response => {
    const repoNodes = gatherUserRepos(response);
    renderRepoNodes(repoNodes);
  })
  .catch(error => {
    alert(`Looks like something went wrong: User ${error.message}`);
  })
}

// Listen for the form submit to start the app and get feedback
function startApp() {
  $('#query-form').submit(event => {
    event.preventDefault();
    const userQueryIpnut = $('#queryInput').val();
    $('#queryInput').text("");
    getRepos(userQueryIpnut);
  })
}

// On page load listen for startApp
$(startApp);