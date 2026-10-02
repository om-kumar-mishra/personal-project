import { LoadingOverlay } from "@mantine/core";
import { useMemo } from "react";
import lodash from "lodash";
import { useSelector } from "react-redux";
import { UserDetails, UserRoles } from "../lib/services/hdfc_login/dataTypes";
import { selectUserPermissions } from "../lib/services/hdfc_login/selectors";
// import { NotFoundPage } from "../modules/Components/NotFound";

export const HasPermission = (props: { permissions: string[]; children?: JSX.Element; fallback?: JSX.Element }) => {
  const permissionsArray = useSelector(selectUserPermissions);

  const hasPermission = lodash.intersection(permissionsArray, props.permissions).length > 0;
  if (hasPermission) {
    return <>{props.children}</>;
  }
  if (props.fallback) {
    return <>{props.fallback}</>;
  }
  return null;
};

export const ProtectedRoute = (props: {
  rolesAllowed: UserRoles[];
  rolePermissions: string[];
  userDetails: UserDetails | null | undefined;
  permissionsArray: string[] | null | undefined;
  children: JSX.Element;
}) => {
  const hasRolePermission = useMemo(() => {
    return props?.userDetails && props.rolesAllowed.includes(props?.userDetails?.TemplateRoleName);
  }, [props?.userDetails]);
  const hasPagePermission = props.rolePermissions.length > 0 ? lodash.intersection(props?.permissionsArray, props.rolePermissions).length > 0 : true;

  if (props?.userDetails === null || props?.permissionsArray === null) {
    return <LoadingOverlay visible={!hasRolePermission || !hasPagePermission} />;
  }

  if (hasRolePermission && hasPagePermission) {
    return <>{props.children}</>;
  }

  return null;
};

export const withProtectedRoute = (
  rolesAllowed: UserRoles[],
  rolePermissions: string[],
  userDetails: UserDetails,
  permissionsArray: string[],
  ChildComponent: React.FC,
) => {
  return (
    <ProtectedRoute rolesAllowed={rolesAllowed} rolePermissions={rolePermissions} userDetails={userDetails} permissionsArray={permissionsArray}>
      <ChildComponent />
    </ProtectedRoute>
  );
};

// export const CheckPermissionBasedOnUserRoles = (props: { rolesAllowed: UserRoles[]; children?: JSX.Element; fallback?: JSX.Element }) => {
//   const { rolesAllowed } = props;
//   const userDetails = useSelector(selectUserDetails) as UserDetails;
//   const hasPermission = rolesAllowed.includes(userDetails?.TemplateRoleName);

//   if (hasPermission) {
//     return <>{props.children}</>;
//   }

//   if (props.fallback) {
//     return <>{props.fallback}</>;
//   } else {
//     return <NotFoundPage />;
//   }
// };
