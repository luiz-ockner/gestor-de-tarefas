# Usa a imagem oficial do Node.js como base.
FROM node:20-alpine

# Define o diretório de trabalho dentro do container.
WORKDIR /app

# Copia os arquivos package.json e package-lock.json.
COPY package*.json ./

# Instala as dependências.
RUN npm install

# Copia o restante dos arquivos da aplicação.
COPY . .

# Lista os arquivos no diretório de trabalho para depuração
RUN ls -l /app

# Expõe a porta que a aplicação irá rodar.
EXPOSE 5000

# Comando para iniciar a aplicação.
CMD ["npm", "start"]