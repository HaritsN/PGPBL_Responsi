import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, ImageBackground, RefreshControl, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMusic, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [dataUser, setDataUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
    setRefreshing(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
        setFilteredData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  };

  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, { method: 'DELETE' })
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

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNama(item.nama);
    setRating(String(item.rating)); // Pastikan rating diubah ke string
    setKategori(item.kategori);
    setAlamat(item.alamat);
    setFormVisible(true);
  };

  const handleSave = () => {
    const updatedData = {
      nama,
      rating: parseFloat(rating) || 0, // Konversi kembali ke angka jika perlu
      kategori,
      alamat,
    };

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${jsonUrl}/${editingId}` : jsonUrl;

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(() => {
        Alert.alert(editingId ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
        fetchData();
        clearForm();
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Gagal menyimpan data, silakan coba lagi.');
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
          placeholderTextColor="#fff"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {isFormVisible && (
          <View style={styles.form}>
            <TextInput
              style={styles.darkInput}
              placeholder="Nama"
              placeholderTextColor="#ddd"
              value={nama}
              onChangeText={setNama}
            />
            <TextInput
              style={styles.darkInput}
              placeholder="Rating"
              placeholderTextColor="#ddd"
              value={rating}
              keyboardType="numeric"
              onChangeText={setRating}
            />
            <TextInput
              style={styles.darkInput}
              placeholder="Kategori"
              placeholderTextColor="#ddd"
              value={kategori}
              onChangeText={setKategori}
            />
            <TextInput
              style={styles.darkInput}
              placeholder="Alamat"
              placeholderTextColor="#ddd"
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
          {filteredData.map((item) => (
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
                style={styles.editButton}
                onPress={() => handleEdit(item)}
              >
                <FontAwesomeIcon icon={faChevronUp} size={20} color="#fff" />
              </TouchableOpacity>
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
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  searchInput: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    fontSize: 14,
    color: '#fff',
  },
  form: { padding: 20, backgroundColor: 'rgba(50, 50, 50, 0.9)', borderRadius: 10, margin: 10 },
  darkInput: {
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#333',
    color: '#fff',
  },
  saveButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  saveButtonText: { color: '#fff', textAlign: 'center' },
  cancelButton: { backgroundColor: '#E53935', padding: 10, borderRadius: 5, marginTop: 10 },
  cancelButtonText: { color: '#fff', textAlign: 'center' },
  scrollView: { paddingBottom: 20 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 15, margin: 5, backgroundColor: 'rgba(50, 50, 50, 0.9)', borderRadius: 8 },
  avatar: { justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  cardContent: { flex: 1, paddingHorizontal: 10 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  cardText: { fontSize: 14, color: '#ddd' },
  editButton: { backgroundColor: '#FFB300', padding: 8, borderRadius: 5, marginRight: 5 },
  deleteButton: { backgroundColor: '#E53935', padding: 8, borderRadius: 5 },
});

export default Createdata;
