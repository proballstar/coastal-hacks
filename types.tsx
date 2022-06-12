/* eslint-disable no-unused-vars */
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootTabParamList = {
  SeashellCollections: any;
  DefaultCamera: any;
  // CreatePost: any;
  // ViewPosts: any;
  CreateEvent: any;
  ViewEvent: any;
  UserProfile: any;
  UpdateProfile: any;
};

export type AuthTabParamList = {
  SignIn: any;
  SignUp: any
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Auth: NavigatorScreenParams<AuthTabParamList> | undefined;
  Collect: any;
  Event: any;
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ParamList = {
  Collect: {
    cid: string
  };
  Event: {
    eid: string
  }
};
