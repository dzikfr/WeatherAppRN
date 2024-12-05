import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, ActivityIndicator, Text } from "react-native-paper";
import * as Location from "expo-location";
import WeatherCard from "./weather-card";
import { useWeather } from "../hooks/useWeather";
import { cities } from "@/data/cities";

const HomeScreen: React.FC = () => {
  const [city, setCity] = useState<string>("Depok");
  const [inputText, setInputText] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<string | null>(null);
  const { weatherData, loading, error } = useWeather(currentCity || city);

  // Get user's location and set current city
  const fetchUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied. Please enable location services."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Fetch current city based on user's location
      const locationResponse = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=0223c19cb80245b1b1085208240512&q=${latitude},${longitude}`
      );
      const locationData = await locationResponse.json();
      setCurrentCity(locationData.location.name); // Update city based on user's location
    } catch (err) {
      Alert.alert("Error", "Unable to fetch location.");
    }
  };

  // Fetch user's location on component mount
  useEffect(() => {
    fetchUserLocation();
  }, []);

  // Memanggil API saat 'city' diperbarui
  useEffect(() => {
    if (city) {
      setCurrentCity(city);
    }
  }, [city]);

  // FIltered Cities
  const filteredCities = cities.filter((cityOption) =>
    cityOption.toLowerCase().includes(inputText.toLowerCase())
  );

  const handleCitySelect = (cityName: string) => {
    setCity(cityName);
    setInputText(cityName);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama Kota"
        value={inputText}
        onChangeText={setInputText}
      />

      {/* Daftar Saran Kota */}
      {inputText && filteredCities.length > 0 && (
        <FlatList
          data={filteredCities}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCitySelect(item)}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={styles.suggestionsList}
        />
      )}

      <Button
        mode="contained"
        onPress={fetchUserLocation}
        style={styles.button}
      >
        Use My Location
      </Button>
      {loading && <ActivityIndicator animating />}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {weatherData && (
          <View>
            {weatherData.forecast.forecastday.map((day: any) => (
              <WeatherCard key={day.date} weather={day} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 16,
    backgroundColor: "#f6f6f6",
    position: "relative",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  suggestion: {
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  suggestionsList: {
    position: "absolute",
    top: 70,
    left: 16,
    right: 16,
    backgroundColor: "#f6f6f6",
    maxHeight: 200,
    zIndex: 99,
  },
  button: {
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default HomeScreen;