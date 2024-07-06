import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const GoogleLoginView = () => {


    async function onGoogleButtonPress() {

        GoogleSignin.configure({
            webClientId:'658645331835-n601h9l7u5nppuetint2bd20ps5s1k30.apps.googleusercontent.com'
        });
        GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                    console.log(JSON.stringify(userInfo))
                }).catch((e) => {
                    console.log("ERROR IS: " + JSON.stringify(e));
                })
            }
        }).catch((e) => {
            console.log("ERROR IS: " + JSON.stringify(e));
        })
        //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        //     return auth().signInWithCredential(googleCredential);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ backgroundColor: 'white', borderRadius: 15, alignItems: 'center', justifyContent: 'center', width: '90%', padding: 20 }}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Please Sigin to Continue Live Chat and Feed</Text>
                <Button title="Google Sign-In" onPress={onGoogleButtonPress} />
            </View>
        </View>
    )
}

export default GoogleLoginView;