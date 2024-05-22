import React, { useContext } from "react";
import Context from "../../context/GasDataImagesContext";
import "./styles.css";
export const FilterToggle = () => {
  const { data, dispatch } = useContext(Context);

  const handleChange = (e) => {
    dispatch({ type: "SET_FILTER_LEAK_GAS", payload: e.target.checked });
  };

  return (
    <div className="container ">
      <h4>Filter Gas Leak</h4>
      <label class="switch">
        <input type="checkbox" onChange={handleChange} value={data.filterGas} />
        <span class="slider"></span>
      </label>
    </div>
  );
};
