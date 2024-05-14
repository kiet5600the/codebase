export enum NavigationStackNames {
  AuthStack = 'AuthStack',
  MainStack = 'MainStack',
}

export enum AuthStack {
  SignInScreen = 'SignInScreen',
  SignUpScreen = 'SignUpScreen',
  ForgotPassStack = 'ForgotPassStack',
  OtpScreen = 'OtpScreen',
}

export enum HomeTab {
  HomeScreen = 'Home',
}

export enum ForgotPassStack {
  ForgotPassScreen = 'ForgotPassScreen',
  OtpScreen = 'OtpScreen',
  ResetPassScreen = 'ResetPassScreen',
}
const routeNames = {
  Stacks: NavigationStackNames,
  AuthStack: AuthStack,
  HomeTab: HomeTab,
}

export default routeNames
