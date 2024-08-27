/**
 * @file DictionaryApp.js
 * @description LWC component that fetches and displays word meanings using a dictionary API.
 * @author J Kim
 * @date 26th of Aug 2024
 */

import { LightningElement } from 'lwc';

export default class DictionaryApp extends LightningElement {
    meaningData = false; // Boolean to track whether meaning data is available

    // Method to handle the search action when a user searches for a word
    handleSearch() {
        const searchText = this.refs.word.value; // Get the value of the input field (searched word)
        let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + searchText; // Construct the URL for the dictionary API

        // Fetch data from the dictionary API
        fetch(url)
            .then(response => {
                // Check if the response is successful (status code 200-299)
                if (response.ok) {
                    this.meaningData = true; // Set meaningData to true if data is found
                    return response.json(); // Parse the JSON response
                } else {
                    // If the response is not successful, handle the error
                    this.meaningData = false; // No data found
                    // Display an error message to the user
                    this.refs.meaningDiv.innerHTML = 'Unable To Find The Meaning Of <b>"' + searchText + '"</b>. Please, Try To Search For Another Word.';
                    this.refs.audioDiv.innerHTML = null; // Clear any previous audio
                    throw Error(response); // Throw an error to stop further execution
                }
            })
            .then(datas => {
                let meaningList = '';
                const meanings = datas[0].meanings[0].definitions; // Extract definitions from the response

                // Loop through the definitions and build a list of meanings
                meanings.forEach((meaning, ind) => {
                    meaningList += '<br/><p>&#x2022; ' + meaning.definition + '</p>'; // Add each definition to the list
                });

                // Display the meanings in the UI
                this.refs.meaningDiv.innerHTML = meaningList;
                // Display the pronunciation audio in the UI
                this.refs.audioDiv.innerHTML = '<audio src="' + datas[0].phonetics[0].audio + '" controls>';
            })
            .catch(error => console.log(error)); // Log any errors to the console
    }
}
