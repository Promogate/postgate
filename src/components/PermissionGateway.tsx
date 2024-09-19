import { cookies } from "next/headers";
import { ReactNode } from "react";

type Props = {
  children: ReactNode,
  permissions: string[]
}

export async function PermissionGateway({ children, permissions }: Props) {
  const cookiesStorage = cookies();
  const accessToken = cookiesStorage.get("__postgate.session")?.value;
  const user = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/who_is", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then((response) => response.json());
  const hasRequiredPermissions = (): boolean => {
    return permissions.some((permission) =>
      user.subscriptionLevel.includes(permission)
    )
  }
  if (hasRequiredPermissions()) return <>{children}</>;
}