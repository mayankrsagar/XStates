import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

const LocationSelector = () => {
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [valueCountry, setValueCountry] = useState("Select Country");
  const [valueState, setValueState] = useState("Select State");
  const [valueCity, setValueCity] = useState("Select City");
  const [showAddress, setShowAddress]=useState(false);

  const [loadingCountry, setLoadingCountry] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);



  const fetchDataCountry = async () => {
    try {
      const url = "https://crio-location-selector.onrender.com/countries";
      const response = await axios.get(url);
      setCountry(response.data);
    } catch (error) {
      console.error(`Failed to fetch countries. ${error}`);
    } finally {
      setLoadingCountry(false);
    }
  };

  const fetchDataState = async () => {
    if (valueCountry === "Select Country") return;
    setLoadingState(true);
    try {
      const url = `https://crio-location-selector.onrender.com/country=${valueCountry}/states`;
      const response = await axios.get(url);
      setState(response.data);
    } catch (error) {
      console.error(`Failed to fetch states. ${error}`);
    } finally {
      setLoadingState(false);
    }
  };

  const fetchDataCity = async () => {
    if (valueState === "Select State") return;
    setLoadingCity(true);
    try {
      const url = `https://crio-location-selector.onrender.com/country=${valueCountry}/state=${valueState}/cities`;
      const response = await axios.get(url);
      setCity(response.data);
    } catch (error) {
      console.error(`Failed to fetch cities. ${error}`);
    } finally {
      setLoadingCity(false);
    }
  };

  useEffect(() => {
    fetchDataCountry();
  }, []);

  useEffect(() => {
    fetchDataState();
  }, [valueCountry]);

  useEffect(() => {
    fetchDataCity();
  }, [valueState]);

  if (loadingCountry || loadingState || loadingCity) return <div style={{display:"flex", justifyContent:"center", alignContent:"center",textAlign:"center", fontSize:"6rem"}}><p>Loading... the data</p></div>;

  return (
    <React.Fragment>
        <div style={{display:"flex", flexDirection:"column"}}></div>
      <h1 style={{textAlign:"center"}}>Select Location</h1>
<div style={{display:"flex", justifyContent:"center", gap:"2rem",flexWrap:"wrap"}}>
      <select name="country" id="country" value={valueCountry} onChange={(e) => {
        setValueCountry(e.target.value);
        setValueState("Select State");
        setValueCity("Select City");
        setShowAddress(false)
      }}>
        <option value="Select Country" disabled>Select Country</option>
        {country.map(ele => (
          <option value={ele} key={ele}>{ele}</option>
        ))}
      </select>

      <select name="state" id="state" value={valueState} onChange={(e) => {
        setValueState(e.target.value);
        setValueCity("Select City");
        setShowAddress(false)
      }}>
        <option value="Select State" disabled>Select State</option>
        {state.map(ele => (
          <option value={ele} key={ele}>{ele}</option>
        ))}
      </select>

      <select name="city" id="city" value={valueCity} onChange={(e) =>{ setValueCity(e.target.value); setShowAddress(true)}}>
        <option value="Select City" disabled>Select City</option>
        
        {city.map(ele => (
          <option value={ele} key={ele}>{ele}</option>
        ))}
      </select>
      </div>
      {showAddress && (
  <h1 style={{ textAlign: "center", marginTop: "2rem", }}>
    {`You selected ${valueCity}, ${valueState}, ${valueCountry}`}
    
  </h1>
)}
    </React.Fragment>
  );
};

export default LocationSelector;
