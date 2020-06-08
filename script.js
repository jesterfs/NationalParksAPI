'use strict';

const apiKey = 'srDALsQqpL9L206FYaK9N9GNQy8w56pIpccdTTQk'; 



const searchURL = `https://developer.nps.gov/api/v1/parks?stateCode=`;



function getRepos() {
  let searchTerm = $('#js-search-term').val();
  searchTerm = searchTerm.replace(' ','');
  let number = $('#js-max-results').val();
  
  let formattedSearchTerm = encodeURI(searchTerm);
  
  let url = `https://developer.nps.gov/api/v1/parks?stateCode=${formattedSearchTerm}&limit=${number}&api_key=${apiKey}`
  // console.log(formattedSearchTerm);


  fetch(url)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'))
  
  
}

function displayResults(responseJson) {
  let data = responseJson.data;
  console.log(data);
  $('#results-list').empty();
  for (let i = 0; i < data.length; i++){
    
    $('#results-list').append(
      `<li><strong>${data[i].fullName}</strong></li>
      <p><em>${data[i].description}</em></p>
      <p><a href='${data[i].url}' target='_blank'>${data[i].url}</a></p> `
    );
  }

  // $('#results').show();
  // display the results section
  $('#results').removeClass('hidden');
  
}

function watchForm() {
  $('#js-form').submit(event => {
    event.preventDefault();
    getRepos();
    // console.log(maxResults);
  });
}

function main(){
  console.log('App loaded! Waiting for submit!');
  
  watchForm();
};

$(main);