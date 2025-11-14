"use client";

import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import AppDownload from "@/modules/home/components/AppDownload";
import Hero from "@/modules/home/components/Hero";
import SampleJobListing from "@/modules/home/components/SampleJobListing";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const router = useRouter();

  const { data: session, isLoading } = useUser();

  const clickButtone = () => {

    toast.success("Welcome to Zipher!");
  }



  return (

    <div>

      <Hero />
      <SampleJobListing />
      <AppDownload />
      <Footer />

    </div>
  );
}
