# Giai đoạn Build
FROM node:21 AS builder

WORKDIR /var/www/gateway

# Copy package.json và package-lock.json
COPY package*.json ./
# Cài đặt phụ thuộc
RUN npm install

# Copy mã nguồn
COPY . .
# Build ứng dụng
RUN npm run build

# Giai đoạn Run
FROM node:21-slim

WORKDIR /var/www/gateway

# Copy phụ thuộc từ giai đoạn build
COPY --from=builder /var/www/gateway/node_modules ./node_modules
# Copy build từ giai đoạn build
COPY --from=builder /var/www/gateway/dist ./dist

# Expose cổng dịch vụ
EXPOSE 8080

# Chạy ứng dụng với quyền không phải root
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

# Chạy ứng dụng
CMD ["node", "dist/main"]