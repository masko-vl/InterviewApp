import React, { useState, useContext, useEffect } from "react";
import Context from "../../context/GasDataImagesContext";

const CamarasSelector = () => {
  const { data } = useContext(Context);
  const { cameras, isLoading } = data;
  const error = false;

  return (
    <div className="metadata-display">
      <h4>CAMERA SELECTOR</h4>
      {isLoading && <p>Loading options...</p>}
      {error && <p>Error loading options: {error}</p>}
      {!isLoading && !error && (
        <select className="custom-select">
          {cameras.map((option) => (
            <option key={option.deviceId} value={option.deviceId}>
              {option.tags.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CamarasSelector;
