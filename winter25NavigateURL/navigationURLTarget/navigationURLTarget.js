import { LightningElement, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class NavigationURLTarget extends LightningElement {
    name;
    email;

    @wire(CurrentPageReference)
    getPageReferenceParameters(currentPageReference) {
        if (currentPageReference) {
            console.log(currentPageReference);
            let states = currentPageReference.state;
            this.name = states.c__name;
            this.email = states.c__email;
        }
    }
}