# --------------------------------------------------------------------------
# STAGE 1: Dependency Installation & Application Build
# This stage installs dependencies, builds the Next.js application.
# --------------------------------------------------------------------------
FROM node:20-alpine AS builder

# 1. Set the working directory
WORKDIR /app

# 2. Copy package files first for efficient caching
COPY package.json package-lock.json ./

# 3. Install dependencies
RUN npm install

# 4. Copy the rest of the application source code
COPY . .

# 5. Declare all build-time arguments
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_API_PREFIX
ARG NEXT_PUBLIC_GLOBAL_PUBLIC_KEY
ARG NEXT_PUBLIC_PAYHERE_MERCHANT_ID

# 6. Expose them as environment variables so Next.js picks them up at build time
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_API_PREFIX=$NEXT_PUBLIC_API_PREFIX
ENV NEXT_PUBLIC_GLOBAL_PUBLIC_KEY=$NEXT_PUBLIC_GLOBAL_PUBLIC_KEY
ENV NEXT_PUBLIC_PAYHERE_MERCHANT_ID=$NEXT_PUBLIC_PAYHERE_MERCHANT_ID

# 7. Build the application
RUN npm run build

# --------------------------------------------------------------------------
# STAGE 2: Production Runtime Image (Lean and Secure)
# This stage only copies the necessary files to run the production app.
# --------------------------------------------------------------------------
FROM node:20-alpine AS runner

# 1. Set the working directory
WORKDIR /app

# 2. Copy build artifacts from the builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 3. Declare and set the runtime port
ARG WEBSITE_FRONTEND_PORT
ENV PORT=$WEBSITE_FRONTEND_PORT
EXPOSE $WEBSITE_FRONTEND_PORT

# 4. Start the production server
CMD ["npm", "run", "start"]