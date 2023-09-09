<p align="center">
<h1 align="center">💜 Akeno 💜</h1>

<!-- Badges, and stuff about the GitHub repository -->
<p align="center">
<a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"></a>
</p>


<!-- Self Hosting Guide -->
## 👀 Self Hosting

### Requirements

- **Node.js v18.17**
- **Bot Token**: You'll need to obtain a token from the [Discord Developer Portal](https://discord.com/developers/).

### Steps for Self Hosting

1. **Download the repository**: start by downloading the Akeno bot repository on your machine.

```
git clone https://github.com/akeno-bot/Akeno/
```

2. **Install dependencies**: navigate to the bot's directory and install the required dependencies using npm.

```
cd Akeno
npm install
```

3. **Configure Environment Variables**: 
  - `secret` directory:
    - Rename the `config.example.js` file to `config.js`.
  - Akeno's root directory:
    - Rename the `.env.example` file to `.env.`.
    - Open the newly renamed .env file and add the required information.

4. Run the Bot: once configured, you can run the bot with the following command:

```
npm run akeno
```

And you're good to go!

<!-- Contributing -->
## 💁 Contributing

If you want to contribute on the bot's code or translations, check out our [Contributing to Akeno](CONTRIBUTING.md) guide!
