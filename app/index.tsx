// index.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Share,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'native' | 'webview'>('native');
  const [webviewUrl, setWebviewUrl] = useState('https://www.example.com');

  const handleSharePress = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome website!',
        url: webviewUrl,
        title: 'Share Website'
      }, {
        // iOS-specific options
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToFacebook',
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderNativeView = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Native View</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setCurrentView('webview')}
      >
        <Text style={styles.buttonText}>Open WebView</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  const renderWebView = () => (
    <View style={styles.container}>
      <View style={styles.webviewHeader}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setCurrentView('native')}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.shareButton} 
          onPress={handleSharePress}
        >
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: webviewUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );

  return currentView === 'native' 
    ? renderNativeView() 
    : renderWebView();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  webviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F2F2F7',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  shareButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
  },
  webview: {
    flex: 1,
  },
});

export default App;