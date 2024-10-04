class ContactDetail {
    #detailID;
    type;
    value;
    #isActive;
  
    constructor(detailID, type, value,isActive) {
      this.#detailID = detailID;
      this.type = type;
      this.value = value;
      this.#isActive = true;
    }
  
    getDetailID() {
      return this.#detailID;
    }

    getType(){
        return this.type;
    }

    getValue(){
        return this.value;
    }
    getIsActive(){
      return this.#isActive;
    }

    static createNewDetail(detailID, type, value) {
        try {
          if (typeof detailID !== "number" || detailID < 0) {
            throw new Error("Invalid detail ID.");
          }
          if (typeof type !== "string") {
            throw new Error("Type must be a non-empty string.");
          }
          if (typeof value !== "string") {
            throw new Error("Value must be a non-empty string.");
          }
    
          return new ContactDetail(detailID, type, value);
        } catch (error) {
          console.log(error);
          return null; 
        }}

        
  
    updateDetail(propertyName, newValue) {
      try {
        switch (propertyName) {
          case "type":
            this.type = newValue;
            break;
          case "value":
            this.value = newValue;
            break;
          default:
            throw new Error("Invalid property name.");
        }
      } catch (error) {
        console.log(error);
      }
    }

    deleteDetails(){
      try{
        this.#isActive = false;
      }
      catch(error){
        console.log(error);
      }
    }
  }

  module.exports = ContactDetail;
