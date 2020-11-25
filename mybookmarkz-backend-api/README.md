# mybookmarkz backend API

## .env

```
NODE_ENV=dev
PORT=8080
GOOGLE_API_CLIENT_ID=<TBD>
AUTH_PRIVATE_KEY_FILE=./dev.key
AUTH_PUBLIC_KEY_FILE=./dev-pub.key
```

## Setup auth module

### private key:

```
ssh-keygen -t rsa -b 4096 -m PEM -P "" -f dev.key
```

### public key:

```
ssh-keygen -e -m PEM -f dev.key > dev-pub.key
```
