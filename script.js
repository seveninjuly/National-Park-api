'use strict';

const apiKey = '8gFinU6RH85931bPMoeQYXpJDjs6FxI21tDYEdwx';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getNpData(query, limit = 10) {
    const params = {
        api_key: apiKey,
        stateCode: query,
        limit
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            alert('Nothing found, please try again!');
        });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('.result').empty();
    $('.hidden').show();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.result').append(
            `<ul>
            <li><p>${responseJson.data[i].fullName}</p>
      <p>${responseJson.data[i].description}</p>
      <p>Website:<a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></p>
      <p>Address: ${responseJson.data[i].latLong}</p>
      </li>
      </ul>`
        );
    }
    console.log('Displaying results works!');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchCode = $('#code').val();
        const maxResults = $('#max-results').val();
        getNpData(searchCode, maxResults);
    });
}

$(function () {
    console.log('App loaded! Waiting for submit!');
    $('.hidden').hide();
    watchForm();
})