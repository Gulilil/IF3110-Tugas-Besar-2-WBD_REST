import { executeQuery } from "./db-setup";

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


export function seedClient(){
  let q = `INSERT INTO client (email, username, password, image, linked, follower_count) VALUES `;
  for (let i = 1; i <= CLIENT_AMOUNT; i++){
    let email = "client"+(i.toString())+"@gmail.com";
    let username = "client"+(i.toString());
    let password = "password";
    let image = "";
    let linked = false;
    let follower_count = 0;

    q += `('${email}', '${username}', '${password}', '${image}', ${linked}, ${follower_count})`;
    if (i == CLIENT_AMOUNT){
      q += `;`;
    } else {
      q +=`, `;
    }
  }
  executeQuery(q);
}

export function seedFollow(){
  let q = `INSERT INTO follow (followee_id, follower_id) VALUES `
  for (let i = 1; i <= FOLLOW_AMOUNT; i++){
    let followee_id = Math.ceil(i/MULTIPLIER);
    let follower_id = Math.ceil(Math.random()*CLIENT_AMOUNT);
    while (followee_id == follower_id){
      follower_id = Math.ceil(Math.random()*CLIENT_AMOUNT);
    }

    q += `(${followee_id}, ${follower_id})`
    if (i == FOLLOW_AMOUNT){
      q += `;`;
    } else {
      q += `, `;
    }
  }
  executeQuery(q);
}

export function seedForum(){
  let q = `INSERT INTO forum (title, author_id, created_at, post_count) VALUES `
  for (let i = 1;i <= FORUM_AMOUNT; i++){
    let title = LoremIpsum_1Sentence;
    let author_id = Math.ceil(Math.random()*CLIENT_AMOUNT);
    let created_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    let post_count = 0;

    q += `('${title}', ${author_id}, '${created_at}', ${post_count})`;
    if (i == FORUM_AMOUNT){
      q += `;`;
    } else {
      q += `, `;
    }
  }
  executeQuery(q);
}

export function seedPost(){
  let q = `INSERT INTO post (post_id, forum_id, author_id, created_at, updated_at, content) VALUES `
  for (let i = 1;i <= POST_AMOUNT; i++){
    let author_id = Math.ceil(Math.random()*CLIENT_AMOUNT);
    let forum_id =  Math.ceil(i/MULTIPLIER);
    let post_id = (i % MULTIPLIER) + 1;
    let created_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    let updated_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
    let temp = Math.floor(Math.random() * 3);
    let content = "";
    if (temp == 0){
      content = LoremIpsum_1Paragraph;
    } else if (temp == 1){
      content = LoremIpsum_1Sentence;
    } else {
      content = LoremIpsum_3Paragraph;
    }

    q += `(${post_id}, ${forum_id}, ${author_id}, '${created_at}', '${updated_at}', '${content}')`;
    if (i == POST_AMOUNT){
      q += `;`;
    } else {
      q += `, `;
    }
  }
  executeQuery(q);
}

export function seedDatabase(){
  seedClient();
  seedFollow();
  seedForum();
  seedPost();
}