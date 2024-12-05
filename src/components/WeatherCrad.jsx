import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <Card style={{ margin: 16 }}>
      <Card.Content>
        <Title>{weather.location.name}, {weather.location.region}</Title>
        <Paragraph>Temperature: {weather.current.temp_c}°C</Paragraph>
        <Paragraph>Condition: {weather.current.condition.text}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default WeatherCard;
