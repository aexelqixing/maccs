import React from "react";
import { Link } from "react-router-dom";

const Student = ({ user }) => {
  return (
    <tr>
      {/* // TODO: change back to profile/${user.id} */}
      <td><Link to={`/profile/${user.id}`}>{user.student}</Link></td>
      <td>{user.firstName + " " + user.lastName}</td>
      <td>{user.gradYear}</td>
      <td>{user.verifiedHours}</td>
      <td>{user.nonApprovedHours}</td>
      <td>
      </td>
    </tr>
  );
};

export default Student;
