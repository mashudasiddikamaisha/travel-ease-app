import axios from "axios";
import { useEffect, useState } from "react";

const useVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);

        axios('http://localhost:3000/vehicles')
            .then((data) => setVehicles(data.data))
            .catch((err) => setError(err))
            .finally(() => {
                setTimeout(() => setLoading(false), 500);
            });
    }, []);

    return { vehicles, loading, error };
};

export default useVehicles;