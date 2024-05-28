import React, { useState, useContext, useEffect } from "react";
import { Button } from "../../components/StyledComponents/Button";
import Context from "../../context/GasDataImagesContext";
import "./styles.css";
import { FilterToggle } from "../../components/FilterToggle";
import CamarasSelector from "../../components/CamarasSelector";
import styled from "styled-components";

const StyledImage = styled.img`
  display: block;
`;
const SquaresRegionsOfInterest = styled.div`
  position: absolute;
  border: 3px solid red;
  ${(props) => {
    return `
    top: ${props.top}px;
    left: ${props.left}px;
    width: ${props.width}px;
    height: ${props.height}px;
    `;
  }}
`;
const StructureMetaData = styled.div`
  display: grid;
  grid-template-columns: 190px auto;
  gap: 10px;
  max-width: 400px;
  margin: 10px 0px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  span {
    padding: 5px;
    justify-self: start;
  }
  span:first-child {
    font-weight: bold;
  }
`;
const CamaraResults = () => {
  const { data, callEvents, callCameras } = useContext(Context);
  const { images, filterGas, isLoading } = data;
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

  useEffect(() => {
    callEvents();
    callCameras();
  }, []);

  if (isLoading) {
    return <div>IS LOADING CAMERA IMAGES....</div>;
  }

  return (
    <div className="layout-camera-results">
      <div className="title">
        <h1>GAS LEAK DETECTION</h1>
        <FilterToggle />
      </div>
      <div>
        {imagesToDisplay.length > 0 && (
          <div className="container-images">
            <div className="image-wraper">
              <StyledImage src={currentImage.jpg} />
              <div className="count-images">
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
              {currentImage?.detectionsList.map((detection) => (
                <SquaresRegionsOfInterest
                  top={detection.roicoordsList[1]}
                  left={detection.roicoordsList[0]}
                  height={
                    detection.roicoordsList[7] - detection.roicoordsList[1]
                  }
                  width={
                    detection.roicoordsList[2] - detection.roicoordsList[0]
                  }
                />
              ))}
            </div>

            <div className="info-display">
              <div className="metadata-display">
                <h4>METADATA</h4>
                {currentImage?.createdOn && (
                  <StructureMetaData>
                    <span>Scan Timestamp: </span>
                    <span>{currentImage.createdOn}</span>
                  </StructureMetaData>
                )}

                <StructureMetaData>
                  <span>Confidence levels: </span>
                  <span>{currentImage?.overallConf} </span>
                </StructureMetaData>
                <StructureMetaData>
                  <span> Noise floor levels: </span>
                  <span>{currentImage?.noiseFloorMetric} </span>
                </StructureMetaData>
                <StructureMetaData>
                  <span> Number of Detections: </span>
                  <span>{currentImage?.detectionsList.length}</span>
                </StructureMetaData>

                {currentImage?.detectionsList.length > 0 && (
                  <ul>
                    {currentImage?.detectionsList.map((detection) => (
                      <li>Sum Detection: {detection.sumconf}</li>
                    ))}
                  </ul>
                )}
              </div>
              <CamarasSelector />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CamaraResults;
