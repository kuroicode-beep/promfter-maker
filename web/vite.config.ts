import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const key = env.VITE_DEEPSEEK_API_KEY || env.DEEPSEEK_API_KEY || "";
  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_DEEPSEEK_API_KEY": JSON.stringify(key),
    },
    test: {
      environment: "node",
      include: ["src/**/*.test.ts"],
    },
  };
});
