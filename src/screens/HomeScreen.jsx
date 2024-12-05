import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Button, ActivityIndicator, Text } from "react-native-paper";
import WeatherCard from "../components/WeatherCard";
import useWeather from "../hooks/useWeather";

const HomeScreen = () => {
  const [city, setCity] = useState("Jakarta");
  const { weatherData, loading, error } = useWeather(city);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button mode="contained" onPress={() => useWeather(city)} style={styles.button}>
        Get Weather
      </Button>
      {loading && <ActivityIndicator animating={true} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && <WeatherCard weather={weatherData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default HomeScreen;
