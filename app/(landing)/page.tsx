"use client"
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const Landing = () => {
    const router = useRouter()

    useEffect(() => {
        router.push("/upload")
    }, []);

    return (
        <section>landing</section>
    )
}

export default Landing;