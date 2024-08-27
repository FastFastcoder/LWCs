/**
 * @file fileUpload.js
 * @description LWC component for uploading files to a Salesforce record and displaying a success toast.
 * @author J Kim
 * @date 26th of Aug 2024
 */

import { LightningElement, api } from 'lwc'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; // Importing the ShowToastEvent to show notifications

export default class FileUpload extends LightningElement {
    @api recordId; // The recordId is passed from the parent component or page context

    // Getter method to define accepted file formats for the file upload
    get acceptedFormats() {
        return ['.pdf', '.png', '.jpg', '.jpeg']; // Accepts PDF and image formats
    }

    // Event handler for when the file upload is finished
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = ''; // String to hold the names of uploaded files

        // Loop through the uploaded files to concatenate their names
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }

        // Display a toast message indicating the success of the file upload
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded successfully: ' + uploadedFileNames,
                variant: 'success', // Sets the toast to display as a success message
            }),
        );
    }
}
