import React, { useState } from 'react';
import Datamahasiswa from './data/mahasiswa.json';
import { FlatList, Text, View, TouchableOpacity, Linking, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate, faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

const Mahasiswa = () => {
  const [data, setData] = useState(Datamahasiswa);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Simulasi pengambilan data baru
    setTimeout(() => {
      setData([...data]); // Replace with actual fetch logic if necessary
      setRefreshing(false);
    }, 1500); // Simulate network request delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Mahasiswa</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('google.navigation:q=' + item.latitude + ',' + item.longitude)
            }
          >
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  size={50}
                  color={item.gender === 'male' ? '#4A90E2' : '#E94E77'}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  {item.first_name} {item.last_name}
                </Text>
                <View style={styles.genderContainer}>
                  <FontAwesomeIcon
                    icon={item.gender === 'male' ? faMars : faVenus}
                    color={item.gender === 'male' ? '#4A90E2' : '#E94E77'}
                    size={14}
                  />
                  <Text style={styles.genderText}> {item.gender}</Text>
                </View>
                <Text style={styles.classText}>{item.class}</Text>
                <Text style={styles.emailText}>{item.email}</Text>
                <Text style={styles.locationText}>
                  {item.latitude}, {item.longitude}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.emptyText}>Memuat data...</Text>
          </View>
        }
      />
    </View>
  );
};

export default Mahasiswa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#E3F2FD',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  genderText: {
    fontSize: 14,
    color: '#666',
  },
  classText: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
