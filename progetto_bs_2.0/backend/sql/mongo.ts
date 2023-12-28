import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { types } from "util";

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: false,
    },

    user_surname: {
        type: String,
        required: true,
        unique: false,
    },

    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true,
    },

    password: {
        type: String,
        enum: ["admin, "types"],

    }

})


