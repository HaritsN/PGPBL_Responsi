import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGraduationCap, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [dataUser, setDataUser] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

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

  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataUser(json);
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
  };

  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  const renderForm = () => (
    <View style={styles.form}>
      <Text style={styles.title}>{selectedUser ? 'Edit Data Mahasiswa' : 'Edit Data Mahasiswa'}</Text>
      <TextInput style={styles.input} placeholder="Nama Depan" value={first_name} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Nama Belakang" value={last_name} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Kelas" value={kelas} onChangeText={setKelas} />
      <TextInput style={styles.input} placeholder="Jenis Kelamin" value={gender} onChangeText={setGender} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title={selectedUser ? "Update" : "Simpan"} onPress={handleSubmit} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderForm}
        data={dataUser}
        onRefresh={refreshPage}
        refreshing={refresh}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectItem(item)}>
            <View style={styles.card}>
              <View style={styles.avatar}>
                <FontAwesomeIcon icon={faGraduationCap} size={40} color="#333" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardtitle}>{item.first_name} {item.last_name}</Text>
                <Text>{item.kelas}</Text>
                <Text>{item.gender}</Text>
                <Text>{item.email}</Text>
              </View>
              <View style={styles.iconEdit}>
                <FontAwesomeIcon icon={faChevronRight} size={20} color="#333" />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardtitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default Createdata;