import { StyleSheet, Text, View, Button } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'dev-k0t2ygj65qe02827.us.auth0.com', clientId: 'o15EP8PimUJpNmtrrVjvknMoNltbXd86' });

export default function App() {
  const handleAuth = useCallback(async () => {
    console.log('Button pressed!');
    try {
      const credentials = await auth0.webAuth.authorize();
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Preper</Text>
      <Button title="Start Now" onPress={handleAuth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});