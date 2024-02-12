import Toast from 'react-native-root-toast';

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
 