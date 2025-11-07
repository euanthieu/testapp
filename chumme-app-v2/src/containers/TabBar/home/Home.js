// Libraries import
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Local import
import ReelsComponent from './ReelsComponent';

export default function Home() {
  const navigation = useNavigation();

  const navigateToChat = () => {
    navigation.navigate('AiChat'); // use StackNav.AiChat if you prefer importing keys
  };

  return (
    <View style={{ flex: 1 }}>
      <ReelsComponent />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#2196F3',
          borderRadius: 30,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
        onPress={navigateToChat}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Chat</Text>
      </TouchableOpacity>
    </View>
  );
}
