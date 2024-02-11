import { db } from "@/app/lib/firebase/admin";
import { UserType } from "@/app/type/user";
import { convertUserType } from "@/app/lib/convert-user-type";
import { User } from "firebase/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const rawUserData: User = await request.json();
  cookies().set("learnstream-user", rawUserData.uid);

  const docRef = db.doc(`user/${rawUserData.uid}`);
  const doc = await docRef.get();

  if (doc.exists) {
    return Response.json(doc.data());
  }

  const user: UserType = convertUserType(rawUserData);

  docRef.set(user);

  return Response.json(user);
}
