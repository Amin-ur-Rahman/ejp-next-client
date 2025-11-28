"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";

const ManageProducts = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="w-full h-screen flex items-center justify-center">
        loading...
      </div>
    );
  //   console.log(session);

  const email = session.user?.email;

  // const {data: list, isLoading} = useQuery({
  //  queryKey:['manage-products'],
  //  queryFn: async ()=> {
  //     const response = await axios.get(`https://ejp-next0server-1.onrender.com?email=${email}`);
  //  }
  // })

  return <div>manage products page</div>;
};

export default ManageProducts;
