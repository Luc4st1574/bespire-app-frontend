"use client";
import Spinner from "../Spinner";
import RequestsList from "./RequestsList";
import { useAppContext } from "@/context/AppContext";

export default function RequestMain() {
    const { loadingUser } = useAppContext();
    if (loadingUser) return <Spinner />;
  return (
  <div>
         <RequestsList />
       </div>
  );
}
