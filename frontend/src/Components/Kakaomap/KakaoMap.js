/* global kakao */
import React, { useEffect, useState } from "react";
import { apiInstance } from "../../api/index";
import Dropdown from "../Common/Dropdown";
import "./css/KakaoMap.css";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import cityJson from "./city.json";
import schoolJson from "./school.json";
import markerImg from "../../asset/image/marker.png";

function KakaoMap() {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    center: { lat: 35.19919101818564, lng: 126.87300478078876 },
    isPanto: false,
    level: 7,
  });

  const [selected, setSelected] = useState({
    localCity: "",
    localSchool: "",
  });
  const [preSchool, setPreSchool] = useState("");

  async function getData() {
    try {
      const res = await apiInstance().get("spot/workingDriver");
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  setInterval(() => {
    getData();
    console.log(new Date());
  }, 30000);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(selected);
    console.log(state);
    console.log(preSchool);
    for (let i = 0; i < cityJson.length; i++) {
      if (cityJson[i].localCity == selected.localCity) {
        setState((prev) => {
          return {
            ...prev,
            center: {
              lat: cityJson[i].center.lat,
              lng: cityJson[i].center.lng,
            },
            level: cityJson[i].level,
          };
        });
        if (preSchool == selected.localSchool) {
          break;
        }
        for (let j = 0; j < schoolJson.length; j++) {
          if (schoolJson[j].localSchool == selected.localSchool) {
            console.log(selected.localSchool);
            setState((prev) => {
              return {
                ...prev,
                center: {
                  lat: schoolJson[j].center.lat,
                  lng: schoolJson[j].center.lng,
                },
                level: schoolJson[j].level,
              };
            });
            setPreSchool(selected.localSchool);
            break;
          }
        }
        break;
      }
    }
  }, [selected]);

  return (
    <div className="map-container">
      <div className="map-label">????????? ???????????? ??????</div>
      <div className="pickers">
        <Dropdown selected={selected} setSelected={setSelected} />
      </div>
      <Map
        center={state.center}
        isPanto={state.isPanto}
        level={state.level}
        style={{ width: "100%", height: "80vh" }}
        
      >
        
        {data.map((driver, index) => (
          <>
            <CustomOverlayMap // ????????? ??????????????? ????????? Container
              // ????????? ??????????????? ????????? ???????????????
              position={{
                lat: driver.lat,
                lng: driver.lon,
              }}
            >
              {/* ????????? ??????????????? ????????? ??????????????? */}
              <div className="label" style={{ color: "#0e1737" }}>
                <span className="label-span">{driver.userName}</span>
              </div>
            </CustomOverlayMap>
            <MapMarker
              key={`${driver.userName}`}
              position={{
                lat: driver.lat,
                lng: driver.lon,
              }} // ????????? ????????? ??????
              image={{
                src: markerImg,
                size: {
                  width: 24,
                  height: 35,
                },
              }}
              title={driver.userName} // ????????? ?????????, ????????? ???????????? ????????? ???????????? ???????????????
            ></MapMarker>
          </>
        ))}
        
      </Map>
    </div>
  );
}
export default KakaoMap;
