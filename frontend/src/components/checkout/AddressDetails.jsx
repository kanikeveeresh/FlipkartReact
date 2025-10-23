import React, { useState } from 'react'
import '../styles/frontendSt.css'
import axios from 'axios';

function AddressDetails({ fetchAddressDetails, closeModel, editDetails }) {
    const { firstName, lastName, pincode, address, city, state, type } = editDetails;
    const [FirstName, setFirstName] = useState(firstName || "");
    const [LastName, setLastName] = useState(lastName || "");
    const [pinCode, setPinCode] = useState(pincode || "");
    const [Address, setAddress] = useState(address || "");
    const [City, setCity] = useState(city || "");
    const [State, setState] = useState(state || "");
    const [Type, setType] = useState(type || "");
    const email = localStorage.getItem("email");

    const handleOutsideClick = (e) => {
        if(e.target.classList.contains("addressPageMainContainer")) {
            closeModel();
        }
    }

    const handleSaveAddress = async (id) => {
        if(!email || !FirstName || !LastName || !pinCode || !Address || !City || !State || !Type) {
            alert("All fields are required");
        }

        else if(editDetails && editDetails._id) {
            try {
                const updatedAddresses = {
                    firstName: FirstName,
                    lastName: LastName,
                    pincode: pinCode,
                    address: Address,
                    city: City,
                    state: State,
                    type: Type
                }
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateaddress`, {
                    email,
                    addressId: id,
                    editDetails: updatedAddresses
                });

                alert("Adress updated successfully!");
                closeModel();
                fetchAddressDetails();
            }
            catch(err) {
                console.log("Internal server error");
            }
        }
        else {
            try {
                const AddressesToSend = {
                    email,
                    addresses: [
                        {
                            firstName: FirstName,
                            lastName: LastName,
                            pincode: pinCode,
                            address: Address,
                            city: City,
                            state: State,
                            type: Type
                        }
                    ]
                }
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addaddress`, AddressesToSend);

                alert("Address added succesfully!");
                closeModel();
                fetchAddressDetails();
            }
            catch(err) {
                console.log("Internal server error...", err);
            }
        }
    }
  return (
    <div className="addressPageMainContainer" onClick={handleOutsideClick}>
        <div className="addressDetailsContainer">
            <h1 style={{textAlign: "center"}}>Enter address details</h1>
            <div className="nameContainer">
                <div style={{position: "relative"}}>
                    <input
                        type="text"
                        placeholder=" "
                        className="addressInputs nameInput"
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label className="addressLabels">First Name</label>
                </div>
                <div style={{position: "relative"}}>
                    <input
                        type="text"
                        placeholder=" "
                        className="addressInputs nameInput"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label className="addressLabels">Last Name</label>
                </div>
            </div>
            <div style={{position: "relative"}}>
                <textarea
                    rows={3}
                    className="textareaInput"
                    placeholder=" "
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                <label className="textareaLabel">Enter Address</label>
            </div>
            <div className="locationContainer">
                <div style={{position: "relative"}}>
                    <input
                        type="text"
                        placeholder=" "
                        className="addressInputs"
                        value={City}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label className="addressLabels">City</label>
                </div>
                <div style={{position: "relative"}}>
                    <input
                        type="text"
                        placeholder=" "
                        className="addressInputs"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                    />
                    <label className="addressLabels">Pin Code</label>
                </div>
                <div style={{position: "relative"}}>
                    <input
                        type="text"
                        placeholder=" "
                        className="addressInputs"
                        value={State}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <label className="addressLabels">State</label>
                </div>
            </div>
            <strong
                onClick={closeModel}
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    translate: "translateY(-50%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    color: "white",
                    width: "30px",
                    height: "30px"
                }}
            >X</strong>
            <div>
                <h5>Address Type:</h5>
                <div className="addressTypeContainer">
                    <label>
                        <input 
                            type="radio"
                            name="addressType"
                            value="Home"
                            checked={Type === "Home"}
                            onChange={(e) => setType(e.target.value)}

                            className="typeInput"
                        />
                        Home (All day)
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="addressType"
                            value="Work"
                            checked={Type === "Work"}
                            onChange={(e) => setType(e.target.value)}
                            
                            className="typeInput"
                        />
                        Work (10AM - 5PM)
                    </label>
                </div>
            </div>
            <div className="addressBtnsContainer">
                <button className="editBtn addressBtns" onClick={() => handleSaveAddress(editDetails?._id)}>Save</button>
                <button onClick={closeModel} className="deleteBtn addressBtns">Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default AddressDetails