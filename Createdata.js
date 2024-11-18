import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';

const Createdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [kelas, setKelas] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  const submit = () => {
    if (!first_name || !last_name || !kelas || !gender || !email) {
      Alert.alert('Error', 'Semua bidang wajib diisi.');
      return;
    }

    const data = {
      first_name,
      last_name,
      kelas,
      gender,
      email,
    };

    fetch(jsonUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        Alert.alert('Berhasil', 'Data berhasil ditambahkan!');
        clearForm();
      })
      .catch(() => {
        Alert.alert('Gagal', 'Terjadi kesalahan, coba lagi.');
      });
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setKelas('');
    setGender('');
    setEmail('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tambah Data Mahasiswa</Text>
      <ScrollView contentContainerStyle={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nama Depan"
          value={first_name}
          onChangeText={setFirstName}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Nama Belakang"
          value={last_name}
          onChangeText={setLastName}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Kelas"
          value={kelas}
          onChangeText={setKelas}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Jenis Kelamin"
          value={gender}
          onChangeText={setGender}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Createdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 15,
    backgroundColor: '#1E88E5',
    marginBottom: 10,
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    elevation: 1,
  },
  button: {
    backgroundColor: '#1E88E5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
