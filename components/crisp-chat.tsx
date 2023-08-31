"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("f5d257a1-1096-42b5-bcc7-0d5191490361");
    }, []);

    return null;
}