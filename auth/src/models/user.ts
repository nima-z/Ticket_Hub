import mongoose from "mongoose";
//============================================================================
import { passwordHasher } from "../services/password";
//============================================================================

//input from user
interface UserAttrs {
  email: string;
  password: string;
}

// saved data
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// the reason that we have two seperate interfaces for userattrs and userdoc,
// is that creating a new item might be different than the actual final item.

// model to build data based on user input
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await passwordHasher(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
