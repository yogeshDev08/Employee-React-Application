export interface SimpleDialogProps {
    open: boolean;
    data: Object
    onClose: () => void;
}

export interface ExperienceDetail {
    id: number;
    companyName: string;
    experiences: {
      duration: string;
      designation: string;
    };
  }

export interface EmployeeData {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    personalDetails: {
      city: string;
      contactNumber: string;
      email: string;
      firstName: string;
      gender: string;
      lastName: string;
      state: string;
      zipCode: string;
    };
    bankDetails: {
      accountNumber: string;
      bankName: string;
      ifscCode: string;
      panCardNumber: string;
    };
    experienceDetails: {
      id: number;
      companyName: string;
      experiences: {
        duration: string;
        designation: string;
      };
    }[];
  }

  export interface personalDetails {
    city: string;
    contactNumber: string;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    state: string;
    zipCode: string;
  }

  export interface location {
    pathname: string;
    search: string;
    state: any;
    hash: string;
    key?: string;
  }

  export interface FormData {
    city: string;
    contactNumber: string;
    email: string;
    firstName: string;
    gender: string;
    lastName: string;
    state: string;
    zipCode: string;
  }
