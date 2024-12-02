# Giai đoạn Build
FROM node:21 AS builder

WORKDIR /var/www/order-service

# Copy package.json và package-lock.json
COPY package*.json ./
# Cài đặt phụ thuộc
RUN npm install

# Copy mã nguồn
COPY . .    
# # Copy script wait-for-it.sh từ thư mục gốc vào Docker image 
# COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh 
# RUN chmod +x /usr/local/bin/wait-for-it.sh
# Build ứng dụng
RUN npm run build

# Giai đoạn Run
FROM node:21-slim

WORKDIR /var/www/gateway

# Copy phụ thuộc từ giai đoạn build
COPY --from=builder /var/www/order-service/node_modules ./node_modules
# Copy build từ giai đoạn build
COPY --from=builder /var/www/order-service/dist ./dist

# Expose cổng dịch vụ
EXPOSE 8085

# Chạy ứng dụng với quyền không phải root
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

# Chạy ứng dụng
CMD ["node", "dist/main"]
