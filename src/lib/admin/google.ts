import type { Session } from "next-auth";

export const verifyUser = async (session: Session): Promise<boolean> => {
  // User not verified if missing accessToken or email
  if (!session?.accessToken || !session?.user?.email) {
    return false;
  }

  const googleData = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${session.accessToken}`
  ).then((res) => res.json());

  return googleData.email && googleData.email === session.user.email;
};
