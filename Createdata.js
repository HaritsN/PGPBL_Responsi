import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview'; // Impor WebView

const posts = [
  {
    id: '1',
    title: 'Gitar Elektrik dan Akustik',
    tags: ['Music', 'Guitar', 'Emotions'],
    summary:
      'Discover how the guitar can express the deepest emotions and tell stories through its strings.',
    image:
      'https://asset.kompas.com/crops/bQ3teedyAkIvVBM9x6ENZcwVeXg=/0x33:1748x1198/750x500/data/photo/2023/03/07/6406e83fcecf3.png',
  },
  {
    id: '2',
    title: 'Piano',
    tags: ['Art', 'Society'],
    summary:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://www.yamaha.com/us/pianos/images/homepageStill.jpg',
  },
  {
    id: '3',
    title: 'Drum dan Perkusi',
    tags: ['Nature', 'Travel'],
    summary:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image:
      'https://lessonsinyourhome.net/wp-content/uploads/2022/03/Drums-vs.-Percussion-Whats-the-difference.jpg',
  },
  {
    id: '4',
    title: 'Alat Musik Elektronik',
    tags: ['Politics', 'Media'],
    summary:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    image:
      'https://www.visittheusa.com/sites/default/files/styles/16_9_1280x720/public/images/hero_media_image/2018-03/1f193ea1be6ff6877e025ed15bc58e04.jpeg?h=2e3eca71&itok=Ec8M_b2j',
  },
];

const Home = ({ navigation }) => {
  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Image
          source={{ uri: item.image }}
          style={styles.imageFrame}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.postSummary}>{item.summary}</Text>
      <View style={styles.tagContainer}>
        {item.tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );

  const handleNavigateToMap = () => {
    navigation.navigate('MapScreen'); // Navigasi ke MapScreen
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: 'https://www.nelsonworldwide.com/wp-content/uploads/2021/09/Sweetwater-21-DC-15-Bass.jpg',
        }}
        style={styles.container}
      >
        {/* Lapisan abu-abu gelap dengan transparansi */}
        <View style={styles.overlay} />

        {/* Header untuk judul */}
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Musik Tangerang</Text>
        </View>

        {/* Deskripsi Singkat dan Button Arahkan ke Peta */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Ayo Jelajahi Peta untuk menemukan lokasi alat musik dan toko-toko
            di sekitar Tangerang yang menyediakan berbagai instrumen musik!
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleNavigateToMap}>
            <Text style={styles.buttonText}>Jelajahi Peta</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList tetap berada di atas bottom nav */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            numColumns={2} // Menampilkan dua kolom untuk grid yang lebih responsif
            contentContainerStyle={styles.gridContainer}
            nestedScrollEnabled={true} // Memungkinkan FlatList untuk scroll di dalam SafeAreaView
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const MapScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={require('./map.html')} // Menggunakan WebView untuk membuka file HTML lokal
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Warna abu-abu gelap dengan transparansi
  },
  titleContainer: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(50, 50, 50, 0.9)',  // Menggunakan sedikit transparansi untuk background
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFB300',  // Ubah warna biru menjadi kuning tua
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  gridContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: 'rgba(50, 50, 50, 0.9)',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    elevation: 5,
    flex: 0.48,
  },
  postHeader: {
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  imageFrame: {
    backgroundColor: '#E0E0E0',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  postSummary: {
    fontSize: 14,
    color: '#FFF',
    marginVertical: 10,
    lineHeight: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    fontSize: 12,
    color: '#FFF',
    backgroundColor: '#FFB300',  // Ubah warna biru menjadi kuning tua
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
});
