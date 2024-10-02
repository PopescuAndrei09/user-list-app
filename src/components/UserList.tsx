// UserList.tsx
import React, { useState, useEffect } from "react";
import "./UserList.css";

// Define the interface for the user object
interface User {
  // TO DO: Define the properties of the user object
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// TO DO: Define any other interfaces required to access all properties of the user object

const API_URL = "https://jsonplaceholder.typicode.com/users";

const UserList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Function for fetching users from the API
  const fetchUsers = async () => {
    // TO DO: Fetch users from the API, handle loading and error states
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Call fetchUsers when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  };

  //   console.log(users, "users");

  // Render the component
  return (
    <div className="content">
      <div className="container-list">
        {isLoading && <p>Loading users...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Street</th>
                <th>Suite</th>
                <th>City</th>
                <th>Zipcode</th>
                <th>Lat</th>
                <th>Lng</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Company Name</th>
                <th>CatchPhrase</th>
                <th>BS</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.address.street}</td>
                  <td>{user.address.suite}</td>
                  <td>{user.address.city}</td>
                  <td>{user.address.zipcode}</td>
                  <td>{user.address.geo.lat}</td>
                  <td>{user.address.geo.lng}</td>
                  <td>{user.phone}</td>
                  <td>{user.website}</td>
                  <td>{user.company.name}</td>
                  <td>{user.company.catchPhrase}</td>
                  <td>{user.company.bs}</td>
                  <td>
                    <button onClick={() => handleSelectUser(user)}>
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedUser && (
        <div className="container-select">
          <h2>Selected User</h2>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Street: {selectedUser.address.street}</p>
          <p>Suite: {selectedUser.address.suite}</p>
          <p>City: {selectedUser.address.city}</p>
          <p>Zipcode: {selectedUser.address.zipcode}</p>
          <p>Latitude: {selectedUser.address.geo.lat}</p>
          <p>Longitude: {selectedUser.address.geo.lng}</p>
          <p>Phone: {selectedUser.phone}</p>
          <p>Website: {selectedUser.website}</p>
          <p>Company: {selectedUser.company.name}</p>
          <p>CatchPhrase: {selectedUser.company.catchPhrase}</p>
          <p>BS: {selectedUser.company.bs}</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
