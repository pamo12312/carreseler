"use client"
import React, { useState } from 'react';

const CarMakes = () => {
    const [carMakeName, setCarMakeName] = useState('');
    const [carMakes, setCarMakes] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setCarMakeName(e.target.value);
    };

    const fetchCarMakes = () => {
        const url = `https://auto.dev/api/listings?apikey=ZrQEPSkKdHN0YXN0bnk2NThAZ21haWwuY29t`;
        console.log('Fetching URL:', url);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);
                if (data && data.records) {
                    const carMakeRecords = data.records.filter(record =>
                        record.make && record.make.toLowerCase() === carMakeName.toLowerCase()
                    );
                    if (carMakeRecords.length > 0) {
                        setCarMakes(carMakeRecords);
                        setError('');
                    } else {
                        setCarMakes([]);
                        setError('No cars found for this make');
                    }
                } else {
                    setCarMakes([]);
                    setError('No records found');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setCarMakes([]);
                setError('Error fetching data');
            });
    };

    return (
        <div>
            <h1>Find Cars by Make</h1>
            <input
                type="text"
                value={carMakeName}
                onChange={handleInputChange}
                placeholder="Enter Make Name"
            />

            <button onClick={fetchCarMakes}>Fetch Car Makes</button>

            {error && <p>{error}</p>}




            {carMakes.length > 0 && (
                <div>
                    <h2>Car Makes Details</h2>
                    {carMakes.map((car, index) => (
                        <div key={index}>
                            <p><strong>ID:</strong> {car.id}</p>
                            <p><strong>Year:</strong> {car.year}</p>
                            <p><strong>Make:</strong> {car.make}</p>
                            <p><strong>Model:</strong> {car.model}</p>
                            <p><strong>Model:</strong> {car.price}</p>
                            <p><strong>Nájezd:</strong> {car.mileage}</p>
                            <p><strong>Město:</strong> {car.city}</p>
                            <img src={car.photoUrls[0]} alt={`Car ${car.id}`}/>
                            <hr/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarMakes;
