import React, { useState } from "react";
import accordionData from "../assets/data/celebrities.json";
import '../css/celebrities.css';

const CelebritiesList = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const nowDate = new Date();
    let age = nowDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = nowDate.getMonth() - dobDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && nowDate.getDate() < dobDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const genderOptions = [
    "Male",
    "Female",
    "Transgender",
    "Rather not say",
    "Other",
  ];

  const handleClick = (index) => {
    if (editIndex !== null) return; // Prevent opening another accordion while in edit mode
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEdit = (index) => {
    if (calculateAge(accordionData[index].dob) < 18) return; // Only allow editing if the user is an adult
    setEditIndex(index);
    setEditedUser({ ...accordionData[index] });
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      const updatedData = [...accordionData];
      updatedData.splice(index, 1);
      // Update the state to reflect the deletion
      // For simplicity, I'm assuming that the state is managed outside of this component
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Add your validation logic here
    // For simplicity, let's assume validation passed
    const updatedData = [...accordionData];
    updatedData[editIndex] = editedUser;
    // Update the state to reflect the changes
    // For simplicity, I'm assuming that the state is managed outside of this component
    setEditIndex(null);
    setEditedUser(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedUser(null);
  };

  return (
    <div className="accordion-container">
      {accordionData.map((item, index) => (
        <div key={index} className="accordion-card">
          <div
            onClick={() => handleClick(index)}
            className={`accordion-header ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <img src={item.picture}/>
            <span>
              {item.first} {item.last}
            </span>
            <span className="accordion-icon">
              {activeIndex === index ? "-" : "+"}
            </span>
          </div>
          {activeIndex === index && (
            <div className="accordion-content">
              <div className="row">
                <p>
                  <strong>Age:</strong>

                  <p>{calculateAge(item.dob)}</p>
                </p>
                <p>
                  <strong>Gender:</strong>
                  {editIndex === index ? (
                    <textarea
                      name="gender"
                      value={editedUser.gender}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{item.gender}</p>
                  )}
                </p>
                <p>
                  <strong>Country:</strong>
                  {editIndex === index ? (
                    <textarea
                      name="country"
                      value={editedUser.country}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{item.country}</p>
                  )}
                </p>
                {editIndex === index ? (
                  <>
                    <button onClick={handleSave} disabled={!editedUser}>
                      Save
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    disabled={calculateAge(item.dob) < 18}
                  >
                    <i class="fa-thin fa-pencil"></i>
                  </button>
                )}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
              <div className="row">
                <p>
                  <strong>Description:</strong>
                </p>
                {editIndex === index ? (
                  <textarea
                    name="description"
                    value={editedUser.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{item.description}</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default CelebritiesList;
