export const verifyUser = async (
  accessToken?: string,
  email?: string
): Promise<boolean> => {
  // User not verified if missing accessToken or email
  if (!accessToken || !email) {
    return false;
  }

  const googleData = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  ).then((res) => res.json());

  return googleData.email && googleData.email === email;
};
