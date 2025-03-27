"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Signup() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [passError, setPassError] = useState(false);

    const emailVal = () => {
        const regex = /^[^\s@]+@[^@\s]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
        if(pass != pass2){
            setPassError(true)
        } else {
            setPassError(false)
        }
    }
    return (
        <div className="container mx-auto max-w-2xl py-8 px-4">
            {/* Sign Up Page */}
            <Card
                key={0}
                className="overflow-hidden hover:shadow-lg transition-shadow border-green-100 dark:border-green-800"
            >
                <CardContent className="p-6">
                    <h3 className="text-4xl font-bold text-green-800 dark:text-green-300 mb-2 text-center">Sign-up</h3>
                    <div className="flex items-center justify-between">
                        <p className="text-2xl text-green-600 dark:text-green-300 text-center">Email:&nbsp;</p>
                        <Input className="flex items-center text-green-600 dark:text-green-400 text-sm" onChange={(e) => setEmail(e.currentTarget.value)} />
                    </div>
                    {emailError ? <p className="text-red-600 dark:text-red-300">Invalid Email</p> : ""}
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-2xl text-green-600 dark:text-green-300 text-center">Password:&nbsp;</p>
                        <Input className="flex items-center text-green-600 dark:text-green-400 text-sm" onChange={(e) => setPass(e.currentTarget.value)} />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="text-2xl text-green-600 dark:text-green-300 text-center">Re-enter Password:&nbsp;</p>
                        <Input className="flex items-center text-green-600 dark:text-green-400 text-sm" onChange={(e) => setPass2(e.currentTarget.value)} />
                    </div>
                    {passError ? <p className="text-red-600 dark:text-red-300">Password's Do Not Match</p> : ""}
                    <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                        onClick={emailVal}
                    >
                        Create Account
                    </Button>
                </CardContent>
            </Card>
        </div>
    )

}