const discord = require('discord.js')
const client = new discord.Client();
const config = require("./config.json");

const prefix = "!"

// Message bot is on

client.on ("ready", () => {
    client.user.setPresence({ game: { name: 'Site', type: 1, url: 'bloodshell.dev'} });
});

// Boas vindas

client.on("guildMemberAdd", member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === '👋-bem-vindo');
    if(!channel) return;
    channel.send(`Bem-vindo, ${member}!:syringe:`);
    member.send(`Olá ${member}! Seja bem vindo a **Comunidade BloodShell**, não se esqueça de olha as regras no canal <#690762028478103584>. E não se esqueça também de selecionar a linguagem que você mais domina no canal <#692501121763115068>`)
});


client.on('raw', async dados =>{
    if(dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
    if(dados.d.message_id !== "692547518013243444") return

    let servidor = client.guilds.cache.get('689254136784355332')
    let membro = servidor.members.cache.get(dados.d.user_id)

    let cJS = servidor.roles.cache.get('692483591128481812')
        cPy = servidor.roles.cache.get('692483879092748318')
        cPh = servidor.roles.cache.get('692484073255600159')
        cJa = servidor.roles.cache.get('692484210551685230')
        cRe = servidor.roles.cache.get('692484260006854797')
        cRn = servidor.roles.cache.get('692484315044642828')
        cCs = servidor.roles.cache.get('692484443079835698')
        uXu = servidor.roles.cache.get('692538137997606922')
        eDv = servidor.roles.cache.get('692484818704924853')
        dSg = servidor.roles.cache.get('692485079254958133')
        BasicI = servidor.roles.cache.get('691110571508105217')
        InterI = servidor.roles.cache.get('692485954396487750')
        AdvanI = servidor.roles.cache.get('692486269875257415')


    if(dados.t === "MESSAGE_REACTION_ADD") {
        if(dados.d.emoji.name === "📒"){
            membro.roles.add(cJS)
        } else if (dados.d.emoji.name === "📔"){
            membro.roles.add(cPy)
        } else if (dados.d.emoji.name === "📕"){
            membro.roles.add(cPh)
        } else if (dados.d.emoji.name === "📗"){
            membro.roles.add(cJa)
        } else if (dados.d.emoji.name === "📘"){
            membro.roles.add(cRe)
        } else if (dados.d.emoji.name === "📙"){
            membro.roles.add(cRn)
        } else if (dados.d.emoji.name === "📓"){
            membro.roles.add(cCs)
        } else if (dados.d.emoji.name === "🎨"){
            membro.roles.add(uXu)
        } else if (dados.d.emoji.name === "🎥"){
            membro.roles.add(eDv)
        } else if (dados.d.emoji.name === "🖌️"){
            membro.roles.add(dSg)
        } else if (dados.d.emoji.name === "🇧"){
            membro.roles.add(BasicI)
        } else if (dados.d.emoji.name === "🇦"){
            membro.roles.add(AdvanI)
        } else if (dados.d.emoji.name === "🇮"){
            membro.roles.add(InterI)
        }
    }

    if(dados.t === "MESSAGE_REACTION_REMOVE") {
        if(dados.d.emoji.name === "📒"){
            membro.roles.remove(cJS)
        } else if (dados.d.emoji.name === "📔"){
            membro.roles.remove(cPy)
        } else if (dados.d.emoji.name === "📕"){
            membro.roles.remove(cPh)
        } else if (dados.d.emoji.name === "📗"){
            membro.roles.remove(cJa)
        } else if (dados.d.emoji.name === "📘"){
            membro.roles.remove(cRe)
        } else if (dados.d.emoji.name === "📙"){
            membro.roles.remove(cRn)
        } else if (dados.d.emoji.name === "📓"){
            membro.roles.remove(cCs)
        }else if (dados.d.emoji.name === "🎥"){
            membro.roles.remove(eDv)
        } else if (dados.d.emoji.name === "🖌️"){
            membro.roles.remove(dSg)
        } else if (dados.d.emoji.name === "🇧"){
            membro.roles.remove(BasicI)
        } else if (dados.d.emoji.name === "🇦"){
            membro.roles.remove(AdvanI)
        } else if (dados.d.emoji.name === "🇮"){
            membro.roles.remove(InterI)
        }
    }
});


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();


    // Comando ping

    if (comando === "ping") {
        const m = await message.channel.send("Ok!");
        m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latência da API é de ${Math.round(client.ping)}ms`);
    }

    // Comando para apagar mensagens

    if(comando === "apagar") {
        const deleteCount = parseInt(args[0], 10);
        if(!deleteCount || deleteCount < 1 || deleteCount > 100)
            return message.reply("Por favor, forneça um número entre 1 e 100 para o número de mensagens a serem excluídas");

        const fetched =  await message.channel.messages.fetch({limit: deleteCount});
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Não foi possível deletar mensagens devido a: ${error}`));
    }

    // Command ban

    if(comando === "ban") {
        if(!message.member.roles.cache.some(r=>["⚡️ Owner's"].includes(r.name)) )
            return message.reply("Desculpe, você não tem permissão para usar isto!");
        let member = message.mentions.members.first();
        if(!member)
            return message.reply("Por favor mencione um membro deste servidor!")
        if(!member.bannable)
            return message.reply("eu não consigo banir este usuário, ele tem um cargo acima do meu ou eu não tenho permissão para banir?");
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "Nenhuma razão fornecida";
        await member.ban(reason)
            .catch(error => message.reply(`Desculpe ${message.author} não consigo banir este usuário devido ao erro: ${error}`));
        message.reply(`${member.user.tag} foi banido por ${message.author.tag} Motivo: ${reason}`);
    }

    // Command invite
    if (comando === "convite") {
        message.channel.send("https://discord.gg/nmuANZT");
    }
});

client.login(config.token);