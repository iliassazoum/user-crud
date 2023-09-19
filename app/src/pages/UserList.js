import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { deleteUser, fetchUsers } from "../userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const handleRemoveUser = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <Link to="/add-user">
        <Button>Add User</Button>
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-200 text-gray-700 text-center">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-200 text-gray-700 text-center">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-200 text-gray-700 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="odd:bg-gray-100 hover:bg-gray-300 transition-colors duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-4">
                    <Link to={`edit-user/${user.id}`}>
                      <button className="text-blue-500 hover:text-blue-700 bg-blue-100 px-2 py-1 rounded-full transition-colors duration-300">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleRemoveUser(user.id)}
                      className="text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded-full transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
