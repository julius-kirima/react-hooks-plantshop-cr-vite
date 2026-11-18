import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  function addPlant(plant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plant),
    })
      .then((response) => response.json())
      .then((newPlant) => {
        setPlants([...plants, newPlant]);
      });
  }

  function updateStock(id) {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, inStock: false } : plant
      )
    );
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />

      <Search search={search} onSearch={setSearch} />

      <PlantList
        plants={filteredPlants}
        onUpdateStock={updateStock}
      />
    </main>
  );
}

export default PlantPage;