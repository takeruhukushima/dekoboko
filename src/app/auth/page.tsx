"use client";

import { useState } from "react";
import { supabase } from "@/hooks/supabaseClient";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.message || "エラーが発生しました。");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1 className="text-2xl font-bold mb-6">
          {isLogin ? "ログイン" : "新規登録"}
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleAuth}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLogin ? "ログイン" : "登録"}
        </button>
        <p className="text-center mt-4">
          {isLogin ? "アカウントをお持ちでない場合" : "すでにアカウントをお持ちの場合"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer ml-1"
          >
            {isLogin ? "新規登録" : "ログイン"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
