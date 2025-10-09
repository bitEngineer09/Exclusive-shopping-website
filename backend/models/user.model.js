import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        // required: true,
    },
    dob: {
        type: Date,
        // required: true,
    },
    gender: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1,
            },
            sizes: [
                {
                    type: String,
                }
            ],
            price: {
                type: Number,
                required: true,
            }
        },
    ],
    wishList: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            }
        }
    ]
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

