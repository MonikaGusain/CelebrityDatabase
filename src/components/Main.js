import CelebritiesList from "./CelebritiesList";
import { useState } from "react";
import CelebrityData from "../assets/data/celebrities.json";
import { BiSearch } from "react-icons/bi";
import "../css/main.css";

function Main() {
  const [celebrityList, setCelebrityList] = useState(CelebrityData);
  const handleSearch = (e) => {
    var searchText = e.target.value;
    if (searchText) {
      const updatedList = CelebrityData.filter((celebrity) => {
        var celebrityName =
          celebrity.first.toLowerCase() + " " + celebrity.last.toLowerCase();
        return celebrityName.includes(searchText.toLowerCase());
      });
      setCelebrityList(updatedList);
    }
  };
  const handleDelete = (index) => {
    const updatedList = celebrityList.filter(
      (celebrity, celebrityIndex) => celebrityIndex != index
    );
    setCelebrityList(updatedList);
  };
  const handleSave = (index, editedUser) => {
    const updatedList = celebrityList;
    updatedList[index] = editedUser;
    setCelebrityList(updatedList);
  };

  return (
    <div className="main">
      <div className="searchRow">
        <input
          type="search"
          id="searchInput"
          placeholder="Search Celebrity"
          onInput={handleSearch}
        />
      </div>
      <div className="listRow">
        <CelebritiesList
          celebrityList={celebrityList}
          handleDelete={handleDelete}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}

export default Main;