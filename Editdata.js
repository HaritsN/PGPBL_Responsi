import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, RefreshControl, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMusic, faChevronUp, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [dataUser, setDataUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [nama, setNama] = useState('');
  const [rating, setRating] = useState('');
  const [kategori, setKategori] = useState('');
  const [alamat, setAlamat] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [dataUser, searchQuery]);

  const fetchData = () => {
    setRefreshing(true); // Set refreshing to true when the refresh starts
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
        setFilteredData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false)); // Set refreshing to false when the fetch is done
  };

  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => {
        Alert.alert('Data terhapus', 'Data berhasil dihapus.');
        fetchData();
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Data gagal dihapus, silakan coba lagi.');
      });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = dataUser.filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(dataUser);
    }
  };

  const renderCard = (item) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.avatar}>
        <FontAwesomeIcon icon={faMusic} size={40} color="#fff" />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nama}</Text>
        <Text style={styles.cardText}>Rating: {item.rating}</Text>
        <Text style={styles.cardText}>Kategori: {item.kategori}</Text>
        <Text style={styles.cardText}>Alamat: {item.alamat}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert('Hapus Data', 'Yakin ingin menghapus data ini?', [
            { text: 'Batal', style: 'cancel' },
            { text: 'Hapus', onPress: () => deleteData(item.id) },
          ])
        }
      >
        <FontAwesomeIcon icon={faTrash} size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEdit(item)}
      >
        <FontAwesomeIcon icon={faChevronUp} size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNama(item.nama);
    setRating(item.rating);
    setKategori(item.kategori);
    setAlamat(item.alamat);
    setFormVisible(true);
  };

  const handleSave = () => {
    const updatedData = {
      nama,
      rating,
      kategori,
      alamat,
    };
    fetch(`${jsonUrl}/${editingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then(() => {
        Alert.alert('Data berhasil diperbarui');
        fetchData();
        clearForm(); // Clear form after saving
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Data gagal diperbarui, silakan coba lagi.');
      });
  };

  const clearForm = () => {
    setNama('');
    setRating('');
    setKategori('');
    setAlamat('');
    setFormVisible(false);
    setEditingId(null);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://www.nelsonworldwide.com/wp-content/uploads/2021/09/Sweetwater-21-DC-15-Bass.jpg' }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari berdasarkan nama..."
          placeholderTextColor="#fff" // Ubah warna placeholder menjadi putih
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {isFormVisible && (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nama"
              value={nama}
              onChangeText={setNama}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating"
              value={rating}
              onChangeText={setRating}
            />
            <TextInput
              style={styles.input}
              placeholder="Kategori"
              value={kategori}
              onChangeText={setKategori}
            />
            <TextInput
              style={styles.input}
              placeholder="Alamat"
              value={alamat}
              onChangeText={setAlamat}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Simpan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={clearForm}>
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
          </View>
        )}
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        >
          {filteredData.map((item) => renderCard(item))}
        </ScrollView>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  cardContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardText: {
    fontSize: 14,
    color: '#ddd',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#E53935',
    padding: 8,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#FFB300',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  scrollView: {
    paddingBottom: 20,
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#E53935',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Createdata;
