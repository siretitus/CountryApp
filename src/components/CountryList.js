import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CountryList = ({ countries, onSelectCountry }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.cca3} // Ensure unique key for each country
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSelectCountry(item)}
            accessibilityLabel={`View details for ${item.name.common}`} // Accessibility feature for screen readers
          >
            {/* Country flag */}
            <Image
              source={{ uri: `https://flagcdn.com/w320/${item.cca2.toLowerCase()}.png` }}
              style={styles.flag}
              accessibilityLabel={`Flag of ${item.name.common}`} // Accessibility feature for flag images
            />
            {/* Country name */}
            <Text style={styles.countryName}>{item.name.common}</Text>

            {/* Airplane icon */}
            <Icon name="airplane-outline" size={22} color="#007BFF" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  flag: {
    width: 40,
    height: 30,
    marginRight: 15,
  },
  countryName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default CountryList;
