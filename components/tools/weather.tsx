import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Thermometer, AlertCircle } from 'lucide-react';


interface WeatherResponse {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        };
        humidity: number;
        wind_kph: number;
    };
}

interface WeatherCardProps {
    isLoading?: boolean;
    weatherData: WeatherResponse | null;
}

const ErrorState = () => (
    <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-red-900 to-red-800 p-6 text-white"
    >
        <div className="flex items-center justify-center space-x-3">
            <AlertCircle className="w-6 h-6" />
            <p className="text-lg">Unable to fetch weather data</p>
        </div>
    </motion.div>
);

const LoadingSkeleton = () => {
    return (
        <div className="max-w-sm mx-auto rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-700">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">

                        <div className="h-8 w-32 bg-gray-700 rounded animate-pulse" />

                        <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
                    </div>

                    <div className="h-12 w-12 bg-gray-700 rounded-full animate-pulse" />
                </div>

                <div className="mt-6">
                    <div className="flex items-center justify-between">

                        <div className="h-12 w-24 bg-gray-700 rounded animate-pulse" />

                        <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">

                        <div className="bg-gray-700/50 p-3 rounded-lg animate-pulse">
                            <div className="h-4 w-16 bg-gray-600 rounded mb-2" />
                            <div className="h-6 w-12 bg-gray-600 rounded" />
                        </div>

                        <div className="bg-gray-700/50 p-3 rounded-lg animate-pulse">
                            <div className="h-4 w-16 bg-gray-600 rounded mb-2" />
                            <div className="h-6 w-12 bg-gray-600 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WeatherCard = ({ isLoading = false, weatherData = null }: WeatherCardProps) => {

    if (!weatherData) {
        return <ErrorState />;
    }

    if ("Error" in weatherData) {
        return <ErrorState />;
    }



    if (isLoading) {
        return <LoadingSkeleton />;
    }


    const getBgColor = (temp: number) => {
        if (temp > 25) return 'from-orange-500 to-yellow-400'; // Hot
        if (temp > 20) return 'from-yellow-400 to-orange-300'; // Warm
        if (temp > 10) return 'from-blue-400 to-purple-400';   // Cool
        return 'from-blue-600 to-blue-400';                    // Cold
    };


    const getWeatherIcon = (condition: string) => {
        const lowerCondition = condition.toLowerCase();
        if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
            return <Sun className="w-12 h-12 text-yellow-300" />;
        } else if (lowerCondition.includes('rain')) {
            return <CloudRain className="w-12 h-12 text-blue-300" />;
        }
        return <Cloud className="w-12 h-12 text-gray-300" />;
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`max-w-sm mx-auto rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br ${getBgColor(weatherData.current.temp_c)}`}
        >
            <div className="p-6 text-white">
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-between items-start"
                >
                    <div>
                        <h2 className="text-3xl font-bold">{weatherData.location.name}</h2>
                        <p className="text-sm opacity-80">{weatherData.location.region}, {weatherData.location.country}</p>
                    </div>
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                        {getWeatherIcon(weatherData.current.condition.text)}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Thermometer className="w-6 h-6 mr-2" />
                            <span className="text-4xl font-bold">{weatherData.current.temp_c}°C</span>
                        </div>
                        <p className="text-lg">{weatherData.current.condition.text}</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/20 p-3 rounded-lg backdrop-blur-sm"
                        >
                            <p className="opacity-80">Humidity</p>
                            <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/20 p-3 rounded-lg backdrop-blur-sm"
                        >
                            <p className="opacity-80">Wind Speed</p>
                            <p className="text-lg font-semibold">{weatherData.current.wind_kph} km/h</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WeatherCard;