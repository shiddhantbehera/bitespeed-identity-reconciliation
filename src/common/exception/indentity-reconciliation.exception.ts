export const emailAddressOrPhoneNumberNotProvided = (
  email?: string,
  phoneNumber?: string,
) => ({
  error: 'Email Address or Phone Number not provided',
  details: {
    email,
    phoneNumber,
  },
});

export const primaryContactNotFound = (
  email?: string,
  phoneNumber?: string,
) => ({
  error: 'Primary contact not found',
  details: {
    email,
    phoneNumber,
  },
});
