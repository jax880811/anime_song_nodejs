# 使用 Node.js 官方 Alpine 镜像（輕量化）
FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 以安裝依賴
COPY package*.json ./

# 安裝生產依賴（排除 devDependencies）
RUN npm ci --only=production

# 複製所有源代碼到容器
COPY . .

# 暴露 3000 端口（對應 Express 默認端口）
EXPOSE 3000

# 啟動命令：運行 app.js
CMD ["node", "src/app.js"]