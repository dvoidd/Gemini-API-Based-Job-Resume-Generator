# Gunakan image Node.js versi resmi
FROM node:20

# Set direktori kerja di container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json jika ada
COPY package*.json ./

# Install semua dependencies
RUN npm install

# Salin seluruh source code ke container
COPY . .

# Set environment variable PORT (Cloud Run menggunakan ini)
ENV PORT=8080

# Ekspos port untuk dokumentasi (Cloud Run otomatis mengatur port)
EXPOSE 8080

# Jalankan aplikasi menggunakan node
CMD [ "node", "app.js" ]
