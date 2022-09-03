/* eslint-disable jsx-a11y/alt-text */
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from 'app/features/home/screen'
import { UserDetailScreen } from 'app/features/user/detail-screen'
import { View, Image, ScrollView } from 'dripsy'
import HeroImage from './assets/bg-mobile-light.jpg'

const Stack = createNativeStackNavigator<{
  home: undefined
  'user-detail': {
    id: string
  }
}>()

const Home = () => (
  <ScrollView
    contentContainerSx={{
      minHeight: '100%',
      pb: 60
    }}
  >
    <View sx={{ position: 'absolute', width: '100%' }}>
      <Image source={HeroImage} sx={{ width: '100%' }} />
    </View>
    <HomeScreen />
  </ScrollView>
)

export function NativeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'Home',
          header: () => null
        }}
      />
      <Stack.Screen
        name="user-detail"
        component={UserDetailScreen}
        options={{
          title: 'User',
        }}
      />
    </Stack.Navigator>
  )
}
