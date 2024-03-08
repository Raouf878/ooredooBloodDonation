const getCompatibleBloodTypes = async (recipientBloodType) => {
    switch (recipientBloodType) {
      case 'A+':
        return ['O-', 'O+','A-','A+'];
      case 'A-':
        return ['O-', 'A-'];
      case 'B+':
        return ['B+', 'B-','O+','O-'];
      case 'B-':
        return ['B-', 'O-'];
      case 'O-':
        return ['O-'];
      case 'AB-':
        return ['O-', 'B-','A-','AB-'];
      case 'O+':
        return ['O-', 'O+'];
      case 'AB+':
        return ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      default:
        return [];
    }
  };
  export default getCompatibleBloodTypes