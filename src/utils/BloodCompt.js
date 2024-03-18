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
  export const BloodDonorCmpta= async(recipientBloodType)=>{
    switch (recipientBloodType) {
      case 'A+':
        return ['AB+', 'A+'];
      case 'A-':
        return ['AB+', 'AB-','A+','A-'];
      case 'B+':
        return ['AB+', 'B+'];
      case 'B-':
        return ['AB+', 'AB-'];
      case 'O-':
        return ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      case 'AB-':
        return ['AB+','AB-'];
      case 'O+':
        return ['AB+', 'A+','B+','O+'];
      case 'AB+':
        return ['AB+'];
      default:
        return [];
    }
  }
  export default getCompatibleBloodTypes