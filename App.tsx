import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLinkedin, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#3C3C3C', // Warna abu-abu gelap
  };

  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL: ', err)
    );
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1557682250-38c53b23406c?fit=crop&w=1080&q=80',
      }}
      style={styles.backgroundImage}>
      <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{ flex: 1 }}>
          <View style={styles.mainContainer}>
            <View style={[styles.container, { backgroundColor: '#2C2C2C' }]}>
              {/* Foto Profil */}
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: 'https://yt3.googleusercontent.com/zsnyQc1P0yIePVVZvjMs2qRWsGRA0dcX7ckEun9DlG3TnbRt_qYrSFo_3xCdXWQA_DsLiKYE2Uo=s900-c-k-c0x00ffffff-no-rj',
                  }}
                  style={styles.image}
                />
              </View>

              {/* Teks Sambutan */}
              <Text style={styles.welcomeText}>Selamat Datang!</Text>
              <Text style={styles.introText}>
                Perkenalkan, saya <Text style={styles.nameText}>Harits Nuraga Padika</Text>.
                Terima kasih telah mengunjungi aplikasi ini. Selamat menikmati pengalaman Anda!
              </Text>

              {/* Biodata Diri */}
              <Text style={styles.biodataText}>
                NIM: <Text style={styles.biodataValue}>22/494436/SV/20823</Text>
              </Text>

              {/* Judul Media Sosial */}
              <Text style={styles.socialTitle}>Akun Media Sosial Saya</Text>

              {/* Ikon Media Sosial */}
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleOpenURL('https://instagram.com/ragaharits')}>
                  <View style={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faInstagram} size={25} color="#E4405F" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    handleOpenURL('https://www.linkedin.com/in/harits-nuraga-padika-4ab650258/')
                  }>
                  <View style={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faLinkedin} size={25} color="#0077B5" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleOpenURL('https://github.com/HaritsN')}>
                  <View style={styles.iconWrapper}>
                    <FontAwesomeIcon icon={faGithub} size={25} color="#333" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center', // Pastikan container terpusat secara vertikal
    alignItems: 'center', // Pastikan container terpusat secara horizontal
  },
  container: {
    backgroundColor: '#2C2C2C', // Warna abu-abu gelap untuk container
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Pastikan container mengisi seluruh ruang vertikal
    width: '90%', // Menyesuaikan lebar agar tidak terlalu lebar
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#FFB300',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  nameText: {
    fontWeight: 'bold',
    color: '#FFB300',
  },
  biodataText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 10,
  },
  biodataValue: {
    fontWeight: 'bold',
    color: '#FFB300',
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D3D3D3', // Warna abu-abu terang untuk background
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default App;
