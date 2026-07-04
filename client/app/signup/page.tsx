"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const SignupPage = () => {
    const router = useRouter();
    const { setShowAuthModal } = useAppContext();

    useEffect(() => {
        router.replace("/");
        setShowAuthModal(true);
    }, [router, setShowAuthModal]);

    return (
        <div className="min-h-screen bg-[#05010a]" />
    );
};

export default SignupPage;