
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, SafeAreaView, ActivityIndicator, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { fetchCountries } from '../utils/api';
import CountryList from '../components/CountryList';
import { debounce } from 'lodash';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setCountries(sortedData);
      setFilteredCountries(sortedData);
      setLoading(false);
    };
    getCountries();
  }, []);

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(results);
  }, 300);

  const handleSelectCountry = (country) => {
    navigation.navigate('CountryDetail', { country });
  };

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&w=1600&fit=max' }}
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.gradientOverlay} />

        <KeyboardAvoidingView 
          style={styles.container} 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <SafeAreaView style={styles.innerContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search for a country..."
              onChangeText={handleSearch}
              accessibilityLabel="Search countries"
              clearButtonMode="while-editing"
            />
            
            {loading ? (
              <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
            ) : (
              <>
                {filteredCountries.length === 0 ? (
                  <Text style={styles.noResultsText}>No countries found.</Text>
                ) : (
                  <CountryList countries={filteredCountries} onSelectCountry={handleSelectCountry} />
                )}
              </>
            )}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    resizeMode: 'cover',
    opacity: 0.8,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
    padding: 20,
  },
  searchBar: {
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    marginHorizontal: 10,
  },
  loader: {
    marginTop: 20,
  },
  noResultsText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default HomeScreen;
