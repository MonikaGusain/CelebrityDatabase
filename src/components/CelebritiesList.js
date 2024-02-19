import React, { useState, useRef } from "react";
import {
  BiCheckCircle,
  BiPencil,
  BiTrash,
  BiX,
  BiXCircle,
} from "react-icons/bi";
import "../css/celebrities.css";

const CelebritiesList = (props) => {
  const [ageInput, setAgeInput] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const dialogRef = useRef(null);

  const calculateAge = (dob) => {
    if (dob) {
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
    }
    return 0;
  };

  const genderOptions = [
    "male",
    "female",
    "transgender",
    "Rather not say",
    "Other",
  ];

  const handleOpenDialog = () => {
    dialogRef.current.showModal();
  };

  const handleCloseDialog = () => {
    dialogRef.current.close();
  };
  const handleClick = (index) => {
    if (editIndex !== null) return;
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const onDelete = () => {
    props.handleDelete(activeIndex);
    handleCloseDialog();
    setActiveIndex(null);
  };

  const handleEdit = (index) => {
    if (calculateAge(props.celebrityList[index].dob) < 18) return;
    setEditIndex(index);
    setEditedUser({ ...props.celebrityList[index] });
    console.log(props.celebrityList[index]);
    console.log(calculateAge(props.celebrityList[index]["dob"]));
    setAgeInput(calculateAge(props.celebrityList[index]["dob"]));
  };
  const handleEditCancel = () => {
    setEditIndex(null);
  };
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "age") {
      setAgeInput(value);
    }
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedUser = editedUser;
    const initialAge = calculateAge(editedUser.dob);
    const ageDifference = ageInput - initialAge;
    const yearValue =
      parseInt(editedUser.dob.split("-")[0]) - parseInt(ageDifference);
    updatedUser["dob"] =
      yearValue +
      "-" +
      editedUser.dob.split("-")[1] +
      "-" +
      editedUser.dob.split("-")[2];

    props.handleSave(activeIndex, editedUser);
    setEditIndex(null);
    setEditedUser(null);
  };

  return (
    <>
      <div className="accordion-container">
        {props.celebrityList.map((item, index) => (
          <div key={index} className="accordion-card">
            <div
              onClick={() => handleClick(index)}
              className={`accordion-header ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <img src={item.picture} />
              <p>
                {item.first} {item.last}
              </p>
              <p className="accordion-icon">
                {activeIndex === index ? "-" : "+"}
              </p>
            </div>
            {activeIndex === index && (
              <div className="accordion-content">
                <div className="accordion-row">
                  <span>
                    <strong>Age:</strong>
                    <div>
                      {editIndex === index ? (
                        <input
                          name="age"
                          type="number"
                          value={ageInput}
                          onChange={handleInputChange}
                        />
                      ) : (
                        calculateAge(item.dob)
                      )}
                    </div>
                  </span>
                  <span>
                    <strong>Gender:</strong>
                    <div>
                      {editIndex === index ? (
                        <select
                          name="gender"
                          id="genders"
                          value={editedUser.gender}
                          onChange={handleInputChange}
                        >
                          {genderOptions.map((gender, genderIndex) => (
                            <option value={gender} key={genderIndex}>
                              {gender}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.gender
                      )}
                    </div>
                  </span>
                  <span>
                    <strong>Country:</strong>
                    <div>
                      {editIndex === index ? (
                        <input
                          type="text"
                          name="country"
                          value={editedUser.country}
                          onChange={handleInputChange}
                        />
                      ) : (
                        item.country
                      )}
                    </div>
                  </span>
                </div>
                <div className="accordian-row">
                  <div style={{ alignItems: "start" }}>
                    <strong>Description:</strong>
                    <span>
                      <p>
                        {editIndex === index ? (
                          <textarea
                            name="description"
                            value={editedUser.description}
                            onChange={handleInputChange}
                            style={{ width: "100%" }}
                          />
                        ) : (
                          item.description
                        )}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="accordion-actions">
                  {editIndex === index ? (
                    <>
                      <BiCheckCircle
                        color="green"
                        onClick={handleSave}
                        disabled={!editedUser}
                        style={{ fontSize: "26px", padding: "2px" }}
                      />
                      <BiXCircle
                        color="red"
                        onClick={handleEditCancel}
                        style={{ fontSize: "26px", padding: "2px" }}
                      />
                    </>
                  ) : (
                    <>
                      <BiTrash
                        color="red"
                        onClick={handleOpenDialog}
                        style={{ fontSize: "26px", padding: "2px" }}
                      />
                      <BiPencil
                        color={calculateAge(item.dob) > 18 ? "blue" : "grey"}
                        onClick={() => handleEdit(index)}
                        disabled={calculateAge(item.dob) < 18}
                        style={{ fontSize: "26px", padding: "2px" }}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <dialog ref={dialogRef}>
        <div className="dialog-row">
          Are you sure you want to delete?
          <BiX onClick={handleCloseDialog} className="cancelIcon" />
        </div>
        <div className="dialog-actions">
          <button onClick={handleCloseDialog}>Cancel</button>
          <button onClick={onDelete} style={{ backgroundColor: "orange" }}>
            Delete
          </button>
        </div>
      </dialog>
    </>
  );
};
export default CelebritiesList;