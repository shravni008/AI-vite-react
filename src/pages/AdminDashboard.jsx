import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      await updateDoc(doc(db, "users", userId), { role: newRole });
      // Update UI immediately
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-slate-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-4 text-sm font-bold text-slate-600">Name</th>
                <th className="p-4 text-sm font-bold text-slate-600">Email</th>
                <th className="p-4 text-sm font-bold text-slate-600">Role</th>
                <th className="p-4 text-sm font-bold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-100">
                  <td className="p-4 text-slate-900 font-medium">
                    {user.name}
                  </td>
                  <td className="p-4 text-slate-600">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {user.role ? user.role.toUpperCase() : "USER"}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleRole(user.id, user.role)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      {user.role === "admin"
                        ? "Demote to User"
                        : "Promote to Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
