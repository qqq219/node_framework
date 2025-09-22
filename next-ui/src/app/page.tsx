'use client'
import { useEffect, useState } from "react";
import { fetchUserInfo } from "./common/utils/access";

export default function Home() {
  const checkLoginInfo = async () => {
      const userInfo = await fetchUserInfo();
      if (userInfo && userInfo.userId) {
          window.location.href = '/system/dashboard';
      }
      else{
        window.location.href = '/login';
      }
  };
  useEffect(() => {
      checkLoginInfo();
  }, []);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <img className="w-50 h-50" src={"/image/loading.gif"}></img>
    </div>
  );
}
