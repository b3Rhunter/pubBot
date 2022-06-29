const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const ethers = require('ethers');
const abi = require("./abi.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"] });

client.once('ready', async () => {
	console.log('pubBot is online!');

    const network = {
        name: "polygon",
        chainId: 137,
        _defaultProvider: (providers) => new providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/72a9a681cae44857acc33099842a80a5')
      };
    
    const provider = ethers.getDefaultProvider(network);
    const gmn = new ethers.Contract('0xfD18418c4AEf8edcAfF3EFea4A4bE2cC1cF2E580', abi, provider);
    
    const Owner = await gmn.owner();

    const discordChannel = client.channels.cache.get('942141451305893962');
 

    discordChannel.send(
        `Hello ${Owner}`
      );

      console.log({Owner});
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

    const network = {
        name: "polygon",
        chainId: 137,
        _defaultProvider: (providers) => new providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/72a9a681cae44857acc33099842a80a5')
      };
    
    const provider = ethers.getDefaultProvider(network);
    const gmn = new ethers.Contract('0xfD18418c4AEf8edcAfF3EFea4A4bE2cC1cF2E580', abi, provider);

    const Supply = await gmn.totalSupply();
    const Wallet = ethers.Wallet.createRandom();

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	}  else if (commandName === 'supply') {
        await interaction.reply(`GMN Daily Supply: ${Supply}`);
    } else if (commandName === 'wallet') {
        await interaction.reply(`New Wallet Created ${Wallet.address}`);
        console.log(Wallet.address);
    }
});

client.login(token);