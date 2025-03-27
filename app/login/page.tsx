"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    return (
        <div className="container mx-auto max-w-2xl py-8 px-4">
            {/* Login Page */}
                <Card
                    key={0}
                    className="overflow-hidden hover:shadow-lg transition-shadow border-green-100 dark:border-green-800"
                >
                    <CardContent className="p-6">
                        <h3 className="text-4xl font-bold text-green-800 dark:text-green-300 mb-2 text-center">Login</h3>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-2xl text-green-600 dark:text-green-300 text-center">Email:&nbsp;</p>
                            <Input className="flex items-center text-green-600 dark:text-green-400 text-sm padding-bottom-2px">

                            </Input>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-2xl text-green-600 dark:text-green-300 text-center">Password:&nbsp;</p>
                            <Input className="flex items-center text-green-600 dark:text-green-400 text-sm padding-bottom-2px">

                            </Input>
                        </div>

                        <Button
                            className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
                        >
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
    )

}