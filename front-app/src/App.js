import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'react-apexcharts';

const App = () => {
  const [cityDistributionData, setCityDistributionData] = useState([]);
  const [pmrFamilyRoomCorrelationData, setPmrFamilyRoomCorrelationData] = useState({});
  const [etablissementsParVilleData, setEtablissementsParVilleData] = useState([]);
  const [servicesParChambreData, setServicesParChambreData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/city-distribution')
      .then((response) => response.json())
      .then((data) => setCityDistributionData(data))
      .catch((error) => console.error('Error fetching city distribution data:', error));

    fetch('http://localhost:3000/pmr-family-room-correlation')
      .then((response) => response.json())
      .then((data) => setPmrFamilyRoomCorrelationData(data))
      .catch((error) => console.error('Error fetching PMR family room correlation data:', error));

    fetch('http://localhost:3000/etablissements-par-ville')
      .then((response) => response.json())
      .then((data) => setEtablissementsParVilleData(data))
      .catch((error) => console.error('Error fetching etablissements par ville data:', error));

      fetch('http://localhost:3000/services-par-chambre')
      .then((response) => response.json())
      .then((data) => setServicesParChambreData(data))
      .catch((error) => console.error('Error fetching services par chambre data:', error));
  }, []);

  const renderCityDistributionChart = () => {
    if (!cityDistributionData || cityDistributionData.length === 0) {
      return <p>Loading city distribution data...</p>;
    }

    const options = {
      labels: cityDistributionData.map((entry) => entry.ville),
    };
    const series = cityDistributionData.map((entry) => entry.count);

    return (
      <div>
        <h2>City Distribution Chart</h2>
        <Chart options={options} series={series} type="pie" height={350} />
      </div>
    );
  };

  const renderPmrFamilyRoomCorrelationChart = () => {
    if (!pmrFamilyRoomCorrelationData || !pmrFamilyRoomCorrelationData[0]) {
      return <p>Loading PMR family room correlation data...</p>;
    }
  
    const options = {
      xaxis: { categories: ['Average PMR Rooms', 'Average Family Rooms'] },
    };
  
    const series = [
      {
        name: 'Average PMR Rooms',
        data: [parseFloat(pmrFamilyRoomCorrelationData[0].average_pmr_rooms)],
      },
      {
        name: 'Average Family Rooms',
        data: [parseFloat(pmrFamilyRoomCorrelationData[0].average_family_rooms)],
      },
    ];
  
    return (
      <div>
        <h2>PMR Family Room Correlation Chart</h2>
        {/* Assuming you're using a chart library like ApexCharts */}
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    );
  };
  

  const renderEtablissementsParVilleChart = () => {
    if (!etablissementsParVilleData || etablissementsParVilleData.length === 0) {
      return <p>Loading etablissements par ville data...</p>;
    }

    const options = {
      xaxis: { categories: etablissementsParVilleData.map((entry) => entry.ville) },
    };

    const series = [
      {
        name: 'Number of Etablissements',
        data: etablissementsParVilleData.map(() => 1), // Assuming each entry represents one establishment
      },
    ];

    return (
      <div>
        <h2>Nb Etablissements Par Ville Chart</h2>
        <Chart options={options} series={series} type="bar" height={350} />
      </div>
    );
  };

  const renderServicesParChambreChart = () => {
    if (!servicesParChambreData || servicesParChambreData.length === 0) {
      return <p>Loading services par chambre data...</p>;
    }
  
    // Group data by room name and sum the number of services
    const groupedData = servicesParChambreData.reduce((accumulator, entry) => {
      const roomName = entry.nom_de_la_chambre || 'Unknown';
      accumulator[roomName] = (accumulator[roomName] || 0) + entry.nombre_de_services;
      return accumulator;
    }, {});
  
    const options = {
      xaxis: { categories: Object.keys(groupedData) },
    };
  
    const series = [
      {
        name: 'Number of Services',
        data: Object.values(groupedData),
      },
    ];
  
    return (
      <div>
        <h2>Services Par Chambre Chart</h2>
        <Chart options={options} series={series} type="line" height={350} />
      </div>
    );
  };
  

    
  
  return (
    <div>
      {renderCityDistributionChart()}
      {renderPmrFamilyRoomCorrelationChart()}
      {renderEtablissementsParVilleChart()}
      {renderServicesParChambreChart()}
    </div>
  );
};

export default App;
