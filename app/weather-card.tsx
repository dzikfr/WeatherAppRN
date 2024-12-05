import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

interface WeatherCardProps {
  weather: any;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{weather.date}</Title>
        <View style={styles.row}>
          <Text style={styles.text}>Temperature: {weather.day.avgtemp_c}°C</Text>
          <Image
            style={styles.icon}
            source={{
              uri: `https:${weather.day.condition.icon}`,
            }}
          />
        </View>
        <Paragraph>{weather.day.condition.text}</Paragraph>
        <Text>Max Temp: {weather.day.maxtemp_c}°C</Text>
        <Text>Min Temp: {weather.day.mintemp_c}°C</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 16,
  },
});

export default WeatherCard;
