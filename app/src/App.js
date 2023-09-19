import { Route, Routes } from "react-router-dom";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import UserList from "./pages/UserList";

function App() {
  return (
    <div className="container mx-auto px-2 max-w-5xl pt-10 ">
      <h1 className="text-center font-bold text-2xl text-gray-700">
        User CRUD with Spring-boot-3/H2-database, React/Redux-toolkit
      </h1>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
