import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGraduationCap, faChevronRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [dataUser, setDataUser] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);

  // States for form inputs
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [dataUser, searchQuery]);

  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
        setFilteredData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const handleSubmit = () => {
    const data = {
      first_name,
      last_name,
      kelas,
      gender,
      email,
    };

    const url = selectedUser ? `${jsonUrl}/${selectedUser.id}` : jsonUrl;
    const method = selectedUser ? 'PATCH' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert(selectedUser ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
        clearForm();
        fetchData();
      })
      .catch((error) => console.error(error));
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setKelas('');
    setGender('');
    setEmail('');
    setSelectedUser(null);
  };

  const selectItem = (item) => {
    setSelectedUser(item);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setKelas(item.kelas);
    setGender(item.gender);
    setEmail(item.email);
    setFormVisible(true);
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

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const renderForm = () => (
    <View style={styles.form}>
      <Text style={styles.formHeader}>Form Data</Text>
      <TextInput style={styles.input} placeholder="Nama Depan" value={first_name} onChangeText={(value) => setFirstName(value)} />
      <TextInput style={styles.input} placeholder="Nama Belakang" value={last_name} onChangeText={(value) => setLastName(value)} />
      <TextInput style={styles.input} placeholder="Kelas" value={kelas} onChangeText={(value) => setKelas(value)} />
      <TextInput style={styles.input} placeholder="Jenis Kelamin" value={gender} onChangeText={(value) => setGender(value)} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(value) => setEmail(value)} />
      <Button title="Simpan" color="#1E88E5" onPress={handleSubmit} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Edit Data</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari data..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity onPress={toggleFormVisibility} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {isFormVisible ? 'Sembunyikan Form' : 'Tampilkan Form'}
        </Text>
        <FontAwesomeIcon
          icon={isFormVisible ? faChevronUp : faChevronDown}
          size={20}
          color="#333"
        />
      </TouchableOpacity>
      {isFormVisible && renderForm()}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => selectItem(item)}>
            <View style={styles.card}>
              <View style={styles.avatar}>
                <FontAwesomeIcon icon={faGraduationCap} size={40} color="#1E88E5" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardtitle}>{item.first_name} {item.last_name}</Text>
                <Text style={styles.cardText}>{item.kelas}</Text>
                <Text style={styles.cardText}>{item.gender}</Text>
                <Text style={styles.cardText}>{item.email}</Text>
              </View>
              <View style={styles.iconEdit}>
                <FontAwesomeIcon icon={faChevronRight} size={20} color="#1E88E5" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#1E88E5',
    padding: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    margin: 10,
    backgroundColor: '#fff',
  },
  form: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    elevation: 2,
  },
  formHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E88E5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEdit: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#1E88E5',
    borderRadius: 8,
    elevation: 2,
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  scrollView: {
    paddingBottom: 20,
  },
});

export default Createdata;
