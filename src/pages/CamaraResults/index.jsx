import React, { useState, useContext, useEffect } from "react";
import { Button } from "../../components/StyledComponents/Button";
import Context from "../../context/GasDataImagesContext";
import "./styles.css";
import { FilterToggle } from "../../components/FilterToggle";

export const CamaraResults = () => {
  const { data } = useContext(Context);
  const { images, filterGas } = data;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesToDisplay, setImagesToDisplay] = useState(images);
  const currentImage = imagesToDisplay[currentImageIndex];

  const handlePrevious = () => {
    const previousIndex = currentImageIndex > 0 ? currentImageIndex - 1 : 0;
    setCurrentImageIndex(previousIndex);
  };

  const handleNext = () => {
    const nextIndex =
      currentImageIndex < imagesToDisplay.length - 1
        ? currentImageIndex + 1
        : imagesToDisplay.length - 1;
    setCurrentImageIndex(nextIndex);
  };
  useEffect(() => {
    if (filterGas) {
      const filteredData = images.filter(
        (image) => image.detectionsList && image.detectionsList.length > 0
      );
      setImagesToDisplay(filteredData);
      setCurrentImageIndex(0);
    } else if (images.length !== filterGas.length) {
      setImagesToDisplay(images);
      setCurrentImageIndex(0);
    }
  }, [images, filterGas]);

  return (
    <div className="layout">
      <h1>Camara Images</h1>

      {imagesToDisplay.length > 0 ? (
        <div>
          <FilterToggle />
          <div className="container-images">
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              ></div>
              {imagesToDisplay.length > 0 && <img src={currentImage.jpg} />}
              {currentImage?.createdOn && (
                <div> Scan Timestamp: {currentImage.createdOn} </div>
              )}

              <div>Confidence levels: {currentImage?.overallConf} </div>
              <div>Noise floor levels: {currentImage?.noiseFloorMetric} </div>
              <div>
                {" "}
                Number of Detections: {currentImage?.detectionsList.length}{" "}
              </div>
              {currentImage?.detectionsList.length > 0 && (
                <ul>
                  {currentImage?.detectionsList.map((detection) => (
                    <li>Sum Detection: {detection.sumconf}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              {" "}
              {currentImageIndex + 1} of {imagesToDisplay.length}{" "}
            </div>
            <div>
              <Button
                type="button"
                disabled={setCurrentImageIndex === 0 ? true : false}
                onClick={handlePrevious}
              >
                <i class="fa fa-chevron-left"></i>
              </Button>
              <Button
                type="button"
                disabled={currentImageIndex === imagesToDisplay.length - 1}
                onClick={handleNext}
              >
                <i class="fa fa-chevron-right"></i>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div> TODO: DATA NOT FOUND, LOADING.. </div>
      )}
    </div>
  );
};
