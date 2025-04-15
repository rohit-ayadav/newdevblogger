// import User from '@/models/users.models';
// import { connectDB } from '@/utils/db'
// import React from 'react'

// const page = () => {
//     const createUser = async () => {
//         await connectDB();
//         console.log("Connected to database")

//         const newUser = {
//             name: "Mr. Rahul",
//             email: "1@1",
//             password: "123456",
//             image: "https://example.com/image.jpg",

//         }
//         try {
//             const user = await User.create(newUser)
//             console.log("User created:", user)

//         } catch (error) {
//             console.error("Error creating user:", error)

//         }
//     }
//     createUser()
//     console.log("User created")
//     return (
//         <div>
//             hello Mr. Rahul
//         </div>
//     )
// }

// export default page
