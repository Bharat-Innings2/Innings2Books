import { useEffect } from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Updates from 'expo-updates';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // Handle error
      console.error(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  const urlToLoad = 'https://books.innings2.com/';

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '100%', padding: 8 }}>
        <WebView source={{ uri: urlToLoad }} onLoad={() => console.log('url loaded!')} />
      </View>
      {Platform.OS === 'android' && (
        <StatusBar
          backgroundColor='default'
          barStyle='dark-content'
        />
      )}
      {Platform.OS === 'ios' && <StatusBar style='dark' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 50 : 28,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
