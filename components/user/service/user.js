const Contact = require("../../contact/service/contact.js");
class User {
    static #allAdmins = [];
    static #allStaffs = [];
    static #allUserID = 0;
  
    #userID;
  
    constructor(userID, firstName, lastName, isAdmin, isActive, contacts) {
      this.#userID = userID;
      this.firstName = firstName;
      this.lastName = lastName;
      this.isAdmin = isAdmin;
      this.isActive = isActive;
      this.contacts = contacts;
    }
  
    getUserID() {
      return this.#userID;
    }
  
    static getAllAdmins() {
      return this.#allAdmins;
    }
  
    static getAllStaffs() {
      let allStaffs = User.#allStaffs;
    let staffList = [];
    for (let staff of allStaffs) {
      if (staff.isActive) {
        staffList.push(staff);
      }
    }
    return staffList;
    }
  
    getIsAdmin() {
      return this.isAdmin;
    }
  
    getIsActive() {
      return this.isActive;
    }
  
    static newAdmin(firstName, lastName) {
      try {
        if (typeof firstName !== "string") throw new Error("Invalid first name");
        if (typeof lastName !== "string") throw new Error("Invalid last name");
  
        const userID = User.#allUserID++;
        const admin = new User(userID, firstName, lastName, true, true, []);
        User.#allAdmins.push(admin);
        return admin;
      } catch (error) {
        console.log(error);
      }
    }
  
    newStaff(firstName, lastName) {
      try {
        if (!this.isAdmin) throw new Error("Only admins can create staff.");
        if (typeof firstName !== "string") throw new Error("Invalid first name");
        if (typeof lastName !== "string") throw new Error("Invalid last name");
  
        const userID = User.#allUserID++;
        const staff = new User(userID, firstName, lastName, false, true, []);
        User.#allStaffs.push(staff);
        return staff;
      } catch (error) {
        console.log(error);
      }
    }
  
    static getUserByID(userID) {
        try {
          if (userID < 0 || userID >= User.#allUserID || isNaN(userID)) {
            throw new Error("Invalid user ID");
          }
      
          
          for (let i = 0; i < User.#allAdmins.length; i++) {
            const user = User.#allAdmins[i];
            if (user.getUserID() === userID && user.getIsActive()) {
              return user; 
            }
          }
      
          
          for (let i = 0; i < User.#allStaffs.length; i++) {
            const user = User.#allStaffs[i];
            if (user.getUserID() === userID && user.getIsActive()) {
              return user;
            }
          }
      
          throw new Error("User does not exist or is inactive.");
        } catch (error) {
          console.log(error);
        }
      }

      getStaffByID(staffID) {
        try {
          
          if (!this.getIsAdmin()) {
            throw new Error("Only admins can access this function.");
          }
          // if(typeof staffID !== "number")
          //   throw new Error("invalid staff id");
          
          for (let i = 0; i < User.#allStaffs.length; i++) {
            const user = User.#allStaffs[i];
            if (user.getUserID() === staffID && user.getIsActive()) {
              console.log(user);
              return user;
            }}   
        } catch (error) {
          console.log(error);
        }
      }


      static updateUserByID(userID,propertyName,newValue){
          try{
            tempUser = User.getUserByID(userID);
            switch (propertyName) {
              case "firstName":
                tempUser.firstName = newValue;
                break;
              case "lastName":
                tempUser.lastName = newValue;
                break;
              default:
                throw new Error("Invalid property name.");
            }
            return true;

          }
          catch(error){
            console.log(error);
          }
      }
      
      
  
      updateStaffByID(staffID, propertyName, newValue) {
        try {
          const staff = this.getStaffByID(staffID);
      
          switch (propertyName) {
            case "firstName":
              staff.updateFirstName(newValue);
              break;
            case "lastName":
              staff.updateLastName(newValue);
              break;
            default:
              throw new Error("Invalid property name.");
          }
        } catch (error) {
          console.log(error);
        }
      }
      
      updateFirstName(newValue) {
        try {
          if (typeof newValue !== "string") throw new Error("Invalid first name.");
          this.firstName = newValue;
        } catch (error) {
          console.log(error);
        }
      }
      
      updateLastName(newValue) {
        try {
          if (typeof newValue !== "string") throw new Error("Invalid last name.");
          this.lastName = newValue;
        } catch (error) {
          console.log(error);
        }
      }


      static deleteUserByID(userID) {
        try {
          const user = User.getUserByID(userID);
          
    
          if (!user.getIsActive()) {
            throw new Error("User is already inactive.");
          }
    
          
          user.isActive = false; 
          console.log(`User with ID ${userID} has been deleted.`);
        } catch (error) {
          console.log(error);
        }
      }
      
      
  
      deleteStaffByID(staffID) {
        try {
          if (!this.getIsAdmin()) {
            throw new Error("Only admins can delete staffs.");
          }
      
          const staff = this.getStaffByID(staffID);
          
      
          if (!staff.getIsActive()) {
            throw new Error("User is already inactive.");
          }
      
          staff.isActive = false;
          console.log(`User with ID ${staff.getUserID()} has been deleted.`);
          return true;
        } catch (error) {
          console.log(error);
        }
      }
      
      
  

    createContact(firstName, lastName) {
      try {
        if (this.isAdmin) throw new Error("Admins cannot create contacts.");
        if (!this.getIsActive()) throw new Error("Inactive user cannot create contacts.");
        const contactID = this.contacts.length;
        const newContact = Contact.newContact(contactID, firstName, lastName);
        this.contacts.push(newContact);
        return newContact;
      } catch (error) {
        console.log(error);
      }
    }
  
    getContactByID(contactID) {
        try {
          if (this.isAdmin) throw new Error("Admins cannot access contacts.");
          if (!this.getIsActive()) throw new Error("Inactive user cannot access contacts.");
          if (contactID < 0 || contactID >= this.contacts.length || isNaN(contactID)) throw new Error("Invalid contact ID.");
          
          for (let i = 0; i < this.contacts.length; i++) {
            const contact = this.contacts[i];
            if (contact.getContactID() === contactID && contact.getIsActive()) {
              return contact;
            }
          }
      
          throw new Error("Contact not found or inactive.");
        } catch (error) {
          console.log(error);
        }
      }

      getAllContacts(){
        try{
          if (this.isAdmin) throw new Error("Admins cannot access contacts.");
          if (!this.getIsActive()) throw new Error("Inactive user cannot access contacts.");
          let allContacts = [];
        for (let contact of this.contacts) {
      if (contact.getIsActive()) {
        allContacts.push(contact);
      }
    }
    return allContacts;
        }
        catch(error){
          console.log(error);
        }
      }
      
  
    updateContactByID(contactID, propertyName, newValue) {
      try {
        const contact = this.getContactByID(contactID);
        
  
        contact.updateContact(propertyName, newValue);
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  
    deleteContactByID(contactID) {
      try {
        const contact = this.getContactByID(contactID);
        
  
        contact.deleteContact();
        console.log(`Contact with ID ${contactID} has been deleted.`);
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  

    addContactDetail(contactID, type, value) {
      try {
        const contact = this.getContactByID(contactID);
        if (!contact) throw new Error("Contact not found.");
  
        contact.addDetail(type, value);
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  
    getContactDetailByID(contactID, detailID) {
      try {
        const contact = this.getContactByID(contactID);
        return contact.getDetailByID(detailID);
      } catch (error) {
        console.log(error);
      }
    }

    getAllContactDetailsByContactID(contactID){
      try{
        const contact = this.getContactByID(contactID);
        return contact.getAllDetails();
      }
      catch(error){
        console.log(error);
      }
    }
  
    updateContactDetailByID(contactID, detailID, propertyName, newValue) {
      try {
        const contact = this.getContactByID(contactID);
        contact.updateDetailByID(detailID, propertyName, newValue);
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  
    deleteContactDetailByID(contactID, detailID) {
      try {
        const contact = this.getContactByID(contactID);
        contact.deleteDetailByID(detailID);
        console.log(`Detail with ID ${detailID} has been deleted from contact ${contactID}.`);
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
  

module.exports = User;


  


