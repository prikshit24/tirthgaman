import React, { useEffect, useState } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import AccountSettings from './components/AccountSettings.js';
import Dashboard from './components/Dashboard.js';
import Details from './components/Details.js';
import ForgotPassword from './components/ForgotPassword.js';
import Home from './components/Home.js';
import Login from './components/Login.js';
import NewPassword from './components/NewPassword.js';
import OTP from './components/OTP.js';
import PujariDetail from './components/PujariDetail.js';
import Register from './components/Register.js';
import ResetPassword from './components/ResetPassword.js';
import SearchPoojariGrid from './components/SearchPoojariGrid.js';
import SearchPoojariList from './components/SearchPoojariList.js';
import SearchTempleGrid from './components/SearchTempleGrid.js';
import SearchTempleList from './components/SearchTempleList.js';
import Step2 from './components/Step2.js';
import Step3 from './components/Step3.js';
import Step4 from './components/Step4.js';
import Step5 from './components/Step5.js';
import Step7 from './components/Step7.js';
import Step8 from './components/Step8.js';
import TempleDetail from './components/TempleDetail.js';
import UserProfile from './components/UserProfile.js';
import createPoojari from './components/createPoojari.js';
import createPoojariStep2 from './components/createPoojariStep2.js';
import createPoojariStep3 from './components/createPoojariStep3.js';
import createPoojariStep4 from './components/createPoojariStep4.js';
import createPoojariStep5 from './components/createPoojariStep5.js';
import createPoojariStep7 from './components/createPoojariStep7.js';
import createPoojariStep8 from './components/createPoojariStep8.js';
import pujaRequest from './components/pujaRequest.js';
import Appoinment from './components/Appoinment.js';
import holyTour from './components/holyTour.js';
import Donation from './components/Donation.js';
import ChangePassword from './components/ChangePassword.js';
import createPoojariStep6 from './components/createPoojariStep6';
import UpdateUserProfile from './components/UpdateUserProfile.js';
import UpdateSocialLinks from './components/UpdateSocialLinks.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EnquiresList from './components/EnquiresList.js';
import reviewPublic from './components/reviewPublic.js';
import step6 from './components/Step6.js';
import CreateTemplePreview from './components/CreateTemplePreview';
import RequiredData from './components/RequiredData.js';
import { Alert, BackHandler } from 'react-native';
import OTPRegister from './components/OTPRegister.js';
import CharDhaam from './components/CharDhaam.js';
import Jyotirlinga from './components/Jyotirlinga.js';
import Shaktipeeth from './components/Shaktipeeth.js';
import Kumbh from './components/Kumbh.js';

const Routes = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setToken(token);
      } catch (error) {
        console.error('error', error);
      }
    })();
  }, []);

  useEffect(() => {
    // back handle exit app
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.remove('hardwareBackPress', handleBackButton);
    };
  }, []);

  handleBackButton = () => {
    if (Actions.currentScene === 'dashboard') {
      Alert.alert(
        'Exit App',
        'Exiting the application?', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }, {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
        },], {
        cancelable: false
      }
      )
      return true;
    }
  }

  return (
    <Router>
      <Scene key="root">
        <Scene key="home" component={Home} title="Home" hideNavBar={true} initial={true} />
        <Scene
          key="login"
          component={Login}
          title="Login"
          hideNavBar={true}
        />
        <Scene
          key="register"
          component={Register}
          title="Register"
          hideNavBar={true}
        />
        <Scene key="otp" component={OTP} title="OTP" hideNavBar={true} />
        <Scene key="otpRegister" component={OTPRegister} title="OTP" hideNavBar={true} />
        <Scene
          key="requiredData"
          component={RequiredData}
          title="Required Data"
          hideNavBar={true}
        />
        <Scene
          key="forgotpassword"
          component={ForgotPassword}
          title="ForgotPassword"
          hideNavBar={true}
        />
        <Scene
          key="dashboard"
          component={Dashboard}
          title="Dashboard"
          hideNavBar={true}
        />
        <Scene
          key="charDhaam"
          component={CharDhaam}
          title="Char Dhaam"
          hideNavBar={true}
        />
        <Scene
          key="jyotirlinga"
          component={Jyotirlinga}
          title="Jyotirlinga"
          hideNavBar={true}
        />
        <Scene
          key="shaktipeeth"
          component={Shaktipeeth}
          title="Shaktipeeth"
          hideNavBar={true}
        />
        <Scene
          key="kumbh"
          component={Kumbh}
          title="Kumbh"
          hideNavBar={true}
        />
        <Scene
          key="userprofile"
          component={UserProfile}
          title="UserProfile"
          hideNavBar={true}
        />
        <Scene
          key="accountsettings"
          component={AccountSettings}
          title="AccountSettings"
          hideNavBar={true}
        />
        <Scene
          key="searchpoojarigrid"
          component={SearchPoojariGrid}
          title="Search Pujari Grid"
          hideNavBar={true}
        />
        <Scene
          key="searchpoojarilist"
          component={SearchPoojariList}
          title="Search Pujari List"
          hideNavBar={true}
        />
        <Scene
          key="searchtemplegrid"
          component={SearchTempleGrid}
          title="Search Temple Grid"
          hideNavBar={true}
        />
        <Scene
          key="searchtemplelist"
          component={SearchTempleList}
          title="Search Temple List"
          hideNavBar={true}
        />
        <Scene
          key="templedetail"
          component={TempleDetail}
          title="Temple Detail"
          hideNavBar={true}
        />
        <Scene
          key="pujariDetail"
          component={PujariDetail}
          title="Pujari Detail"
          hideNavBar={true}

        />
        <Scene
          key="createPoojari"
          component={createPoojari}
          title="Create Pujari"
          hideNavBar={true}
        />
        <Scene
          key="createPoojariStep2"
          component={createPoojariStep2}
          title="Create Pujari Step2"
          hideNavBar={true}

        />
        <Scene
          key="createPoojariStep3"
          component={createPoojariStep3}
          title="Create Pujari Step3"
          hideNavBar={true}
        />
        <Scene
          key="createPoojariStep4"
          component={createPoojariStep4}
          title="Create Pujari Step4"
          hideNavBar={true}
        />
        <Scene
          key="createPoojariStep5"
          component={createPoojariStep5}
          title="Create Pujari Step5"
          hideNavBar={true}
        />
        <Scene
          key="createPoojariStep6"
          component={createPoojariStep6}
          title="Create Pujari Step6"
          hideNavBar={true}
        />
        <Scene
          key="createPoojariStep7"
          component={createPoojariStep7}
          title="Create Pujari Step7"
          hideNavBar={true}
        />
        <Scene
          key="createPoojariStep8"
          component={createPoojariStep8}
          title="Create Poojari Step8"
          hideNavBar={true}

        />
        <Scene
          key="details"
          component={Details}
          title="Details"
          hideNavBar={true}
        />
        <Scene
          key="ResetPassword"
          component={ResetPassword}
          title="ResetPassword"
          hideNavBar={true}
        />
        <Scene
          key="newpassword"
          component={NewPassword}
          title="NewPassword"
          hideNavBar={true}
        />
        <Scene
          key="changepassword"
          component={ChangePassword}
          title="ChangePassword"
          hideNavBar={true}
        />
        <Scene
          key="updateuserprofile"
          component={UpdateUserProfile}
          title="UpdateUserProfile"
          hideNavBar={true}
        />
        <Scene
          key="updatesociallinks"
          component={UpdateSocialLinks}
          title="UpdateSocialLinks"
          hideNavBar={true}
        />
        <Scene key="step2" component={Step2} title="Step2" hideNavBar={true}
        />
        <Scene key="step3" component={Step3} title="Step3" hideNavBar={true} />
        <Scene key="step4" component={Step4} title="Step4" hideNavBar={true} />
        <Scene key="step5" component={Step5} title="Step5" hideNavBar={true} />
        <Scene key="step6" component={step6} title="Step6" hideNavBar={true} />
        <Scene key="step7" component={Step7} title="Step7" hideNavBar={true} />
        <Scene key="step8" component={Step8} title="Step8" hideNavBar={true} />
        <Scene key="createTemplePreview" component={CreateTemplePreview} title="CreateTemplePreview" hideNavBar={true} />
        <Scene
          key="pujaRequest"
          component={pujaRequest}
          title="pujaRequest"
          hideNavBar={true}
        />
        <Scene
          key="Appoinment"
          component={Appoinment}
          title="Appoinment"
          hideNavBar={true}
        />
        <Scene
          key="holyTour"
          component={holyTour}
          title="holyTour"
          hideNavBar={true}
        />
        <Scene
          key="Donation"
          component={Donation}
          title="Donation"
          hideNavBar={true}

        />
        <Scene
          key="enquires"
          component={EnquiresList}
          title="EnquiresList"
          hideNavBar={true}
        />
        <Scene
          key="reviewPublic"
          component={reviewPublic}
          title="review Public"
          hideNavBar={true}
        />
      </Scene>
    </Router>
  );
};
export default Routes;
