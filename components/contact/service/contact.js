const ContactDetail = require("../../contactDetails/service/contactDetails.js");
class Contact {
    #contactID;
    #isActive;
    contactDetails = [];
  
    constructor(contactID, firstName, lastName) {
      this.#contactID = contactID;
      this.firstName = firstName;
      this.lastName = lastName;
      this.#isActive = true;
    }
  
    getContactID() {
      return this.#contactID;
    }

    getIsActive() {
        return this.#isActive;
      }


      getAllContactDetails() {
        if (!this.getIsActive()) {
          console.log("Inactive users cannot access contact details.");
          return;
        }
        
        if (this.contactDetails.length > 0) {
          return this.contactDetails;
        } else {
          return "No contact details available.";
        }
      }  

      getAllDetails(){
        try{
          let allInfo = [];
          for(let detail of this.contactDetails){
            if(detail.getIsActive())
              allInfo.push(detail);
          }
          return allInfo;
        }
        catch(error){
          console.log(error);
        }
      }
  
    static newContact(contactID, firstName, lastName) {
      try {
        if (typeof firstName !== "string") throw new Error("Invalid first name");
        if (typeof lastName !== "string") throw new Error("Invalid last name");
  
        return new Contact(contactID, firstName, lastName);
      } catch (error) {
        console.log(error);
      }
    }
  
    updateContact(propertyName, newValue) {
      try {
        switch (propertyName) {
          case "firstName":
            if (typeof newValue !== "string") throw new Error("Invalid first name.");
            this.firstName = newValue;
            break;
          case "lastName":
            if (typeof newValue !== "string") throw new Error("Invalid last name.");
            this.lastName = newValue;
            break;
          default:
            throw new Error("Invalid property name.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    addDetail(type, value) {
        try {
          const detailID = this.contactDetails.length;
          const newDetail = ContactDetail.createNewDetail(detailID, type, value);
          this.contactDetails.push(newDetail);
        } catch (error) {
          console.log(error);
        }
      }
  
    getDetailByID(detailID) {
        try {
          if (detailID < 0 || isNaN(detailID)) throw new Error("Invalid detail ID.");
      
          for (let i = 0; i < this.contactDetails.length; i++) {
            const detail = this.contactDetails[i];
            if (detail.getDetailID() === detailID ) {
              if(!detail.getIsActive())
                throw new Error("Detail does not exist.");
              return detail; 
            }
          }
      
          throw new Error("Detail not found.");
        } catch (error) {
          console.log(error);
        }
      }
  
    updateDetailByID(detailID, propertyName, newValue) {
      try {
        const detail = this.getDetailByID(detailID);
        detail.updateDetail(propertyName, newValue);
      } catch (error) {
        console.log(error);
      }
    }
  
    deleteDetailByID(detailID) {
      try {
        if (detailID < 0 || detailID >= this.contactDetails.length || isNaN(detailID)) throw new Error("Invalid detail ID.");
        const detail = this.getDetailByID(detailID);
        detail.deleteDetails();
      } catch (error) {
        console.log(error);
      }
    }
  
    deleteContact() {
        try {
          if (!this.getIsActive()) {
            throw new Error("Contact is already inactive.");
          }
      
          this.#isActive = false;
          console.log(`Contact with ID ${this.getContactID()} has been deleted.`);
        } catch (error) {
          console.log(error);
        }
      }
  
      getContactDetails() {
        try {
          if (!this.getIsActive()) {
            throw new Error("Inactive users cannot access contact details.");
          }
          
          return this.contactDetails;
        } catch (error) {
          console.log(error);
        }
      }
  }

  module.exports = Contact;