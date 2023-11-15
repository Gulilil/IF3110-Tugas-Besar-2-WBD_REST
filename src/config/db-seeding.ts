import { DataSource, Repository } from "typeorm";
import { Client } from "../models/client-model";
import { Follow } from "../models/follow-model";
import { Forum } from "../models/forum-model";
import { Post } from "../models/post-model";

export const LoremIpsum_3Paragraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna molestie at elementum eu. Aliquam sem fringilla ut morbi tincidunt augue. Eget velit aliquet sagittis id. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. A diam maecenas sed enim ut. Nisl purus in mollis nunc sed. Elit scelerisque mauris pellentesque pulvinar pellentesque. Dolor purus non enim praesent elementum facilisis leo vel fringilla. Amet risus nullam eget felis. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Congue eu consequat ac felis. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Ipsum a arcu cursus vitae congue. Vel quam elementum pulvinar etiam non quam lacus suspendisse. Sagittis eu volutpat odio facilisis mauris. Quis auctor elit sed vulputate mi sit amet mauris. Sodales ut etiam sit amet nisl purus in. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus.

Risus commodo viverra maecenas accumsan lacus vel. Id semper risus in hendrerit gravida rutrum. Sit amet porttitor eget dolor morbi non arcu. Fames ac turpis egestas sed tempus urna. Dolor sit amet consectetur adipiscing elit duis. Quis auctor elit sed vulputate mi. Et odio pellentesque diam volutpat commodo. Duis at tellus at urna. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Quisque sagittis purus sit amet volutpat consequat mauris. Ut venenatis tellus in metus vulputate eu scelerisque felis. Proin sed libero enim sed faucibus turpis in eu mi. Pulvinar etiam non quam lacus suspendisse.

Feugiat vivamus at augue eget arcu dictum. Sociis natoque penatibus et magnis. Adipiscing vitae proin sagittis nisl rhoncus mattis. Molestie a iaculis at erat. Tristique senectus et netus et malesuada. Viverra mauris in aliquam sem fringilla ut. Commodo viverra maecenas accumsan lacus vel facilisis. Lectus sit amet est placerat in egestas erat imperdiet sed. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Vitae tortor condimentum lacinia quis vel. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Diam donec adipiscing tristique risus. Urna duis convallis convallis tellus id. Et ligula ullamcorper malesuada proin. Tortor id aliquet lectus proin nibh. Nunc sed augue lacus viverra. Lobortis feugiat vivamus at augue eget arcu dictum. Velit euismod in pellentesque massa placerat duis ultricies lacus.
`;

export const LoremIpsum_1Paragraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna molestie at elementum eu. Aliquam sem fringilla ut morbi tincidunt augue. Eget velit aliquet sagittis id. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. A diam maecenas sed enim ut. Nisl purus in mollis nunc sed. Elit scelerisque mauris pellentesque pulvinar pellentesque. Dolor purus non enim praesent elementum facilisis leo vel fringilla. Amet risus nullam eget felis. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Congue eu consequat ac felis. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Ipsum a arcu cursus vitae congue. Vel quam elementum pulvinar etiam non quam lacus suspendisse. Sagittis eu volutpat odio facilisis mauris. Quis auctor elit sed vulputate mi sit amet mauris. Sodales ut etiam sit amet nisl purus in. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus.`;

export const LoremIpsum_1Sentence = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

const MULTIPLIER = 3;
const CLIENT_AMOUNT = 20;
const FOLLOW_AMOUNT = CLIENT_AMOUNT * MULTIPLIER;
const FORUM_AMOUNT = 40;
const POST_AMOUNT = FORUM_AMOUNT* MULTIPLIER;


function seedClient(){

  for (let i = 1; i <= CLIENT_AMOUNT; i++){
    let c = new Client();
    // c.id = i;
    c.email = "client"+(i.toString())+"@gmail.com";
    c.username = "client"+(i.toString());
    c.password = "password";
    c.image = "";
    c.linked = false;
    c.follower_count = 0;

    async () => {
      await c.save();
    }
  }
}

function seedFollow(){
  for (let i = 1; i <= FOLLOW_AMOUNT; i++){
    let f = new Follow();
    // f.id = i;
    f.followee_id = Math.floor(i/2)+1;
    f.follower_id = i;
    if (f.followee_id == f.follower_id){
      f.followee_id = FOLLOW_AMOUNT - i;
    }

    async () => {
      await f.save();
    }
  }
}

function seedForum(){
  for (let i = 1;i <= FORUM_AMOUNT; i++){
    let f = new Forum();
    // f.id = i;
    f.title = LoremIpsum_1Sentence;
    f.author_id = Math.ceil(Math.random()*CLIENT_AMOUNT);
    f.created_at = (new Date());
    f.post_count = 0;

    async () => {
      await f.save();
    }
  }
}

function seedPost(){
  for (let i = 1;i <= POST_AMOUNT; i++){
    let p = new Post();
    // p.id = i;
    p.author_id = Math.ceil(Math.random()*CLIENT_AMOUNT);
    p.post_id = Math.ceil(i/MULTIPLIER);
    p.forum_id = i % MULTIPLIER;
    p.created_at = new Date();
    p.updated_at = new Date();
    let temp = Math.floor(Math.random() * 3);
    if (temp == 0){
      p.content = LoremIpsum_1Paragraph;
    } else if (temp == 1){
      p.content = LoremIpsum_1Sentence;
    } else {
      p.content = LoremIpsum_3Paragraph;
    }

    async () => {
      await p.save();
    }
  }
}

export function seedDatabase(){
  seedClient();
  seedFollow();
  seedForum();
  seedPost();
  console.log("Successfully seed database");
}