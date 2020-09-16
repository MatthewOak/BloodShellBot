const discord = require('discord.js')
const client = new discord.Client();
const config = require("./config.json");

const prefix = "s!"

// Message bot is on

client.on ("ready", () => {
    console.log(`Estou pronto capitão! Com o total de ${client.users.cache.size} usuários, em ${client.guilds.cache.size} servidores.`);
    client.user.setActivity("dev by: _mathxx#0101")
});

// Boas vindas

client.on("guildMemberAdd", member => {
    //const channel = member.guild.channels.cache.find(ch => ch.name === '👋-bem-vindo');
    //if(!channel) return;
    //channel.send(`Bem-vindo, ${member}!:syringe:`);
    member.send(`Olá ${member}! Seja bem-vindo a loja BloodShell, fique a vontade pra verificar nossos produtos!`)
});


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();


    // Comando Suporte

    if (comando === "suporte") {

        const support = new discord.MessageEmbed()
        .setColor('#F61F60')
        .setTitle('Suporte Supra Tokyo')
        .setURL('https://discord.gg/B5Y6RQc')
        .setDescription('Selecione abaixo qual problema você está enfrentando:')
        .addFields(
            { name: '1️⃣ - Limbo/Crashs', value: 'Caso seu problema seja com limbos ou crashs.' },
            { name: '2️⃣ - Denuncia contra Anti-RP', value: 'Caso seu problema seja com Anti-RP de algum player.' },
            { name: '3️⃣ - Falar com Staff', value: 'Caso deseje conversar com um pessoalmente com um Staff.' },
            // espaço { name: '\u200B', value: '\u200B' },
        )
        .setTimestamp()
        .setFooter('Obrigado por jogar no Supra Tokyo Roleplay');

        let msg = await message.channel.send(`Olá, ${message.author} sou o Zequinha e estou aqui para te ajudar com seus problemas!` , support);
        const filter = (reaction, user) => {
            return reaction.emoji.name === '1️⃣', '2️⃣', '3️⃣' && user.id === message.author.id;
        };

        const collector = msg.createReactionCollector(filter, { time: 10000 });
        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === '1️⃣') {
                message.channel.send(`Calma ai, ${message.author} que estarei te ajudando.`);
                message.author.send("Observe este artigo que ele vai te ajudar com seu problema ;)!")
            } else if (reaction.emoji.name === '2️⃣') {
                message.channel.send(`Olá ${message.author}, peço que por gentileza envie provas como, vídeo ou foto no canal <#741068685929873410>, lá você enviará as provas para nossa Staff, para que possam verificar o ocorrido.`);
            } else if (reaction.emoji.name === '3️⃣') {
                message.channel.send(`Peço que entre no canal Aguardando, para que um amigo meu possa lhe ajudar! Valeu xx)`)
            }
        })           
        // reações 
        await msg.react('1️⃣')
        await msg.react('2️⃣')
        await msg.react('3️⃣')
    } 
    

    // Comando ping

    if (comando === "ping") {
        const m = await message.channel.send("Ok!");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latência da API é de ${Math.round(client.ping)}ms`);
    }

    // Comando para apagar mensagens

    if(comando === "apagar") {
        if(!message.member.roles.cache.some(r=>["✰ | C. Discord"].includes(r.name)) )
            return message.reply("desculpe, mas você não tem permissão para usar este comando, entre em contato com um superior!");
        const deleteCount = parseInt(args[0], 10);
        if(!deleteCount || deleteCount < 1 || deleteCount > 300)
            return message.reply("Por favor, forneça um número entre 1 e 100 para o número de mensagens a serem excluídas");

        const fetched =  await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
    }

    // Command ban

    if(comando === "ban") {
        if(!message.member.roles.cache.some(r=>["✰ | C. Discord"].includes(r.name)) )
            return message.reply("desculpe, mas você não tem permissão para usar este comando, entre em contato com um superior para banir este usuário!");
        let member = message.mentions.members.first();
        if(!member)
            return message.reply("Por favor mencione um membro deste servidor!")
        if(!member.bannable)
            return message.reply("eu não posso banir este usuário pois ele tem um cargo acima do meu. Entre em contato com um superior pra prosseguir com esta ação!");
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "Nenhuma razão fornecida";
        await member.ban(reason)
            .catch(error => message.reply(`Desculpe ${message.author} não consigo banir este usuário devido ao erro: ${error}`));
        message.reply(`${member.user.tag} foi banido por ${message.author.tag} Motivo: ${reason}`);
    }

    // Command invite
    if (comando === "convite") {
        message.channel.send("https://discord.gg/B5Y6RQc");
    }
});

client.login(config.token);