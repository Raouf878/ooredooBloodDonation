const sendPushNotification = async (pushToken, message) => {
    try {
      // Prepare notification object
      const notification = {
        to: pushToken,
        sound: 'default',
        title: message.title,
        body: message.body,
        data:message.data
      };
  
      // Send notification
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });
  
      console.log('Notification sent successfully to:', pushToken);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };



  export default sendPushNotification