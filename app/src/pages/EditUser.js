import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { updateUser } from "../userSlice";
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [editedUser, setEditedUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const userToEdit = users.find((user) => user.id === parseInt(id, 10));

    if (userToEdit) {
      setEditedUser({ name: userToEdit.name, email: userToEdit.email });
    }
  }, [users, id]);

  const handleEditUser = () => {
    dispatch(updateUser({ id: parseInt(id, 10), ...editedUser }));
    navigate("/");
  };

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Name"
        value={editedUser.name}
        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
        inputProps={{ type: "text", placeholder: "John Doe" }}
      />
      <br />
      <TextField
        label="Email"
        value={editedUser.email}
        onChange={(e) =>
          setEditedUser({ ...editedUser, email: e.target.value })
        }
        inputProps={{ type: "email", placeholder: "johndoe@mail.com" }}
      />
      <Button onClick={handleEditUser}>Save Changes</Button>
    </div>
  );
};

export default EditUser;
