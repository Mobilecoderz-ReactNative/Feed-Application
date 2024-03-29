import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View ,NativeModules} from 'react-native';
import StackNavigator from './src/Navigation/StackNavigator/StackNavigator';



export default function App() {
  const { StatusBarManager } = NativeModules;
  const STATUSBAR_HEIGHT =  StatusBarManager.HEIGHT;

  return (
  
    <View style={[styles.container, {marginTop:STATUSBAR_HEIGHT}]}>
      <StatusBar   backgroundColor="lightgray" style="dark" />
      <StackNavigator/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
     },
});
