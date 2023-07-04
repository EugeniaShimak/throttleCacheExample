import { memo } from "react";
import { User } from "./User.types";

interface IUserInfoProps {
  user: User | null;
}

const UserInfo = memo(function UserInfo({ user }: IUserInfoProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user?.name}</td>
          <td>{user?.phone}</td>
        </tr>
      </tbody>
    </table>
  );
});

export default UserInfo;
