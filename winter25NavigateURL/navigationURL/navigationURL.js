import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class URLNavigation extends NavigationMixin(LightningElement) {
    Name;
    Email;

    handleNameChange(event){
        this.Name = event.detail.value;
    }

    handleEmailChange(event){
        this.Email = event.detail.value;
    }

    navigateToTargetLWC() {

        this[NavigationMixin.Navigate]({
            // Pass in pageReference
            type: 'standard__component',
            attributes: {
                componentName: 'c__navigationURLTarget',
            },
            state: {
                c__name: this.Name,
                c__email: this.Email,
            }
        });
    }
}