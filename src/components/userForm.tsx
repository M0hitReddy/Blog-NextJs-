"use client";
import axios from "axios";
import { use, useState } from "react";

export default function UserForm() {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/user", user);
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <>
      <form>
        <input
          type="number"
          placeholder="id"
          value={user.id}
          onChange={(e: any) => setUser({ ...user, id: e.target.value })}
        />
        <input
          type="name"
          placeholder="Name"
          value={user.name}
          onChange={(e: any) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e: any) => setUser({ ...user, email: e.target.value })}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}
