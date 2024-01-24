import * as yup from "yup";

const ProfileSchema = yup.object().shape({
    title: yup.string().min(3, "Enter at least three characters for the title").required('Title is required'),
    description: yup.string().min(3, "Enter at least three characters for the description").required('Description is required'),
    location: yup.string().min(3, "Enter at least three characters for the location").required('Location is required'),
    phone: yup.string().matches(/09[\d]{9}$/, "The mobile number is not correct").required('The mobile number is required'),
    price: yup.string().matches(/^[+]?\d+([.]\d+)?$/, "The price must be greater than zero").required('The price is required'),
    realState: yup.string().min(3, "Enter at least three characters for the realState").required('RealState is required'),
    constructionDate: yup.date().nullable().min(new Date(1900, 0, 1), "The date is invalid").required('The date is required'),
    category: yup.string().min(3, "Choose one of the categories").required('Category is required'),
    rules: yup.array().of(yup.string().min(3, "Enter at least three characters for the rules")),
    amenities: yup.array().of(yup.string().min(3, "Enter at least three characters for the amenities")),
});

const ProfileFrontSchema = yup.object().shape({
    title: yup.string().min(3, "Enter at least three characters for the title"),
    description: yup.string().min(3, "Enter at least three characters for the description"),
    location: yup.string().min(3, "Enter at least three characters for the location"),
    phone: yup.string().matches(/09[\d]{9}$/, "The mobile number is not correct"),
    price: yup.string().matches(/^[+]?\d+([.]\d+)?$/, "The price must be greater than zero"),
    realState: yup.string().min(3, "Enter at least three characters for the realState"),
    constructionDate: yup.date().nullable().min(new Date(1900, 0, 1), "The date is invalid"),
    category: yup.string().min(3, "Choose one of the categories"),
    rules: yup.array().of(yup.string().min(3, "Enter at least three characters for the rules,")),
    amenities: yup.array().of(yup.string().min(3, "Enter at least three characters for the amenities,")),
});

export function validateInput(name: string, value: string) {
    try {
        ProfileFrontSchema.validateSyncAt(name, { [name]: value }, { abortEarly: false });
      return '';
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return error.errors.join(', ');
      }
      return 'Validation error';
    }
  }
 

export { ProfileSchema ,ProfileFrontSchema};

