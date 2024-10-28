import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const CountryDetail = ({ route }) => {
  const { country } = route.params;

  const renderDetail = ({ item }) => (
    <View style={styles.detailRow}>
      <MaterialCommunityIcons name={item.icon} size={24} color="#4CAF50" />
      <Text style={styles.detailText}>
        {item.label}: <Text style={styles.valueText}>{item.value}</Text>
      </Text>
    </View>
  );

  const details = [
    { icon: 'city', label: 'Capital', value: country.capital },
    { icon: 'earth', label: 'Region', value: country.region },
    { icon: 'flag', label: 'Languages', value: Object.values(country.languages || {}).join(', ') },
    { icon: 'account-multiple', label: 'Population', value: country.population.toLocaleString() },
    { 
      icon: 'currency-usd', 
      label: 'Currencies', 
      value: Object.values(country.currencies || {}).map(currency => currency.name).join(', ') 
    },
  ];

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&w=1600&fit=max' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Image source={{ uri: country.flags.png }} style={styles.flagImage} />
        <Text style={styles.name}>{country.name.common}</Text>
        <FlatList
          data={details}
          renderItem={renderDetail}
          keyExtractor={item => item.label}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  detailText: {
    fontSize: 18,
    color: '#34495E',
    marginLeft: 12,
  },
  valueText: {
    fontWeight: '600',
    color: '#27AE60',
  },
  flagImage: {
    width: 120,
    height: 80,
    marginBottom: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default CountryDetail;
