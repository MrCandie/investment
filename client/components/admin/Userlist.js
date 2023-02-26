import { useRouter } from "next/router";
import React from "react";

export default function Userlist({ user }) {
  const router = useRouter();

  return (
    <ul className="list-container">
      {user.map((item) => (
        <li
          onClick={() => router.push(`/admin/user/${item.id}`)}
          className="list"
        >
          <div className="w-[10%]">
            <img src={item.image} className="w-full rounded-full" />
          </div>
          <div className="flex-1">
            <p className="text-base lg:text-lg text-orange-600 font-medium capitalize">
              {item.name}
            </p>
            <p className="text-sm  text-orange-600 font-medium capitalize">
              {item.email}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
