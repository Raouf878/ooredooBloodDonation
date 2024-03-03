import Toast from 'react-native-root-toast';
import { SafeAreaView } from 'react-native-safe-area-context';

export default showToast = (message) => {

    Toast.show(message, {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };
 