import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true, required: true },
  password: { type: String, required: true },
  uuid: { type: String, required: true }
});

// Создаём индекс на email, если он ещё не создан
userSchema.index({ email: 1 }, { unique: true, sparse: true });

export default mongoose.model("User", userSchema);