import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Linking,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMusic, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const Listdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    setLoading(true);
    return fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
        setFilteredData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshPage = () => {
    setRefresh(true);
    fetchData().finally(() => setRefresh(false));
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredData(dataUser);
    } else {
      const filtered = dataUser.filter((item) =>
        item.nama.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.error("Couldn't load maps", err));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://www.nelsonworldwide.com/wp-content/uploads/2021/09/Sweetwater-21-DC-15-Bass.jpg' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari berdasarkan nama..."
          placeholderTextColor="#fff" // Ubah warna placeholder menjadi putih
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {isLoading ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.cardtitle}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            onRefresh={refreshPage}
            refreshing={refresh}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View style={styles.card}>
                  <View style={styles.avatar}>
                    <FontAwesomeIcon icon={faMusic} size={50} color={item.color || '#fff'} />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.cardtitle}>{item.nama}</Text>
                    <Text style={styles.cardText}>Rating: {item.rating}</Text>
                    <Text style={styles.cardText}>Kategori: {item.kategori}</Text>
                    <Text style={styles.cardText}>Alamat: {item.alamat}</Text>
                  </View>
                  <View style={styles.actionContainer}>
                    <TouchableOpacity
                      style={styles.routeButton}
                      onPress={() => openGoogleMaps(item.latitude, item.longitude)}
                    >
                      <FontAwesomeIcon icon={faLocationArrow} size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Pastikan gambar memenuhi layar
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Warna abu-abu gelap dengan transparansi
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Transparansi untuk menambahkan kesan "overlay"
  },
  searchInput: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: 'rgba(50, 50, 50, 0.9)', // Abu-abu gelap transparansi 90%
    borderRadius: 8,
  },
  avatar: {
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardText: {
    color: '#ddd',
  },
  actionContainer: {
    flexDirection: 'column', // Menyusun tombol "Lokasi" secara vertikal
    alignItems: 'center',
    marginRight: 10,
  },
  routeButton: {
    backgroundColor: '#FFB300',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 10,
  },
});

export default Listdata;
