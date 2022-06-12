/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// eslint-disable-next-line no-use-before-define
import React from 'react'
import { ColorSchemeName } from 'react-native'
import CollectionsScreen from '../screens/Collections'
import CreateEventScreen from '../screens/CreateEvent'
import CreatePostScreen from '../screens/CreatePost'
import DefaultCameraScreen from '../screens/DefaultCameraSCreen'
import UserProfileScreen from '../screens/UserProfile'
import ViewEventsScreen from '../screens/ViewEvents'
import ViewPostScreen from '../screens/ViewPost'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'

import { RootStackParamList, RootTabParamList, AuthTabParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import Signup from '../screens/Signup'
import Signin from '../screens/Signin'
import SaveItemScreen from '../screens/SaveItem';
import UpdateProfile from '../screens/UpdateProfile';
import ViewEvent from '../screens/ViewEvent'

export default function Navigation ({ colorScheme, auth }: { colorScheme: ColorSchemeName, auth: boolean }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator auth={auth} />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator ({ auth }: { auth: boolean}) {
  return (
    <Stack.Navigator>
      {auth
        ? (
          <>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Collect" component={SaveItemScreen} />
            <Stack.Screen name="Event" component={ViewEvent} />
          </>
          )
        : <Stack.Screen name="Auth" component={AuthTabNavigator} />
      }
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()
const AuthTab = createBottomTabNavigator<AuthTabParamList>()

function AuthTabNavigator () {
  const colorScheme = useColorScheme()

  return (
    <AuthTab.Navigator
      initialRouteName='SignUp'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint
      }}
    >
      <AuthTab.Screen
        name="SignUp"
        component={Signup}
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      <AuthTab.Screen
        name="SignIn"
        component={Signin}
        options={{
          title: 'Sign In',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
    </AuthTab.Navigator>
  )
}

function BottomTabNavigator () {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="SeashellCollections"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint
      }}>
      <BottomTab.Screen
        name="SeashellCollections"
        component={CollectionsScreen}
        options={{
          title: 'Seashell Collections',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      <BottomTab.Screen
        name="DefaultCamera"
        component={DefaultCameraScreen}
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      {/* <BottomTab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: 'Create Post',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      <BottomTab.Screen
        name="ViewPosts"
        component={ViewPostScreen}
        options={{
          title: 'Posts',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      /> */}
      <BottomTab.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          title: 'Create an Event',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      <BottomTab.Screen
        name="ViewEvent"
        component={ViewEventsScreen}
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      <BottomTab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
      <BottomTab.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          title: 'Update Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
