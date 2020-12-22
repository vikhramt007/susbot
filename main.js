const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
client.once('ready', () => {
    console.log('AmongUs is online!');
});
let myset = new Set(["red", "pink", "blue", "cyan", "green", "lime", "brown", "yellow", "black", "white", "purple", "orange"]);
let suslist = new Set();
var mode = "lobby";
client.on('message', message =>{
    if(message.author.bot){
        return;
    }
    if(!message.content.startsWith(prefix)){
        if(mode === "ship") message.channel.send("no talking, do tasks");
        return;
    } 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    //commands
    if(command === "ship" || command === "lobby" || command === "meeting"){
        mode = command;
        message.channel.send(mode + " started");
        if(command === "lobby"){
            suslist = new Set();
        }
        return;
    }
    if(command === 'sus'){
        if(mode === "lobby"){
            message.channel.send("match hasn't started yet");
            return;
        }
        if(!args.length){
            var msg = "sus list: ";
            for(const val of suslist){
                msg += val;
                msg += ", ";
            }
            message.channel.send(msg);
        }
        else if(args.length == 1){
            if(myset.has(args[0])){
                if(suslist.has(args[0])) message.channel.send(args[0] + " hella sus");
                else{
                    message.channel.send(args[0] + " is now sus");
                    suslist.add(args[0]);
                } 
            } 
            else message.channel.send("invalid color " + args[0]);
        }
        else message.channel.send("one sus at a time please");
    } 
    else if(command === 'killed'){
        if(args.length!=1 || !myset.has(args[0]) || !suslist.has(args[0])){
            if(args.length==0){
                message.channel.send("!killed <color>")
            }
            return;
        }
        suslist.delete(args[0]);
    }
    else if(command === 'mode'){
        message.channel.send(mode);
    }
    else if(command === 'commands'){
        message.channel.send("ship, lobby, meeting, sus, killed");
    }
    else message.channel.send("unknown command");
});
client.login();
