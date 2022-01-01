import "reflect-metadata";
import {
  createConnection,
  Connection,
  MoreThan,
  LessThanOrEqual,
} from "typeorm";
import { Group } from "./entity/Group";
import { Post } from "./entity/Post";
import { PostMetadata } from "./entity/PostMetadata";
import { User } from "./entity/User";

createConnection()
  .then(async (connection) => {
    await createPost(connection);
  })
  .catch((error) => console.log(error));

async function createUser(connection: Connection) {
  console.log("Inserting a new user into the database...");
  const user = new User();
  user.firstName = "Timber";
  user.lastName = "Saw";
  user.age = 25;
  await connection.manager.save(user);
  console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await connection.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Here you can setup and run express/koa/any other framework.");
}

async function createPost(connection: Connection) {
  let userRepo = connection.getRepository(User);
  let postRepo = connection.getRepository(Post);
  let groupRepo = connection.getRepository(Group);

  // query builder
  const x = await userRepo
    .createQueryBuilder("user")
    .innerJoinAndSelect("user.posts", "post")
    .orderBy("post.id", "ASC")
    .getMany();
  console.log(x);
}

const addPostMetadata = async (connection: Connection, id: number) => {
  const postRepo = connection.getRepository(Post);
  const metaRepo = connection.getRepository(PostMetadata);

  const post = await postRepo.findOne(id);

  const metaData = new PostMetadata();
  metaData.createdAt = new Date().toDateString();
  metaData.post = post;

  return await metaRepo.save(metaData);
};

// const user = await userRepo.findOne(1);
// const group = new Group();
// group.name = "Rust-js";
// group.members = [user];

// await groupRepo.save(group);

// const post = await postRepo.findOne({
//   where: { likes: LessThanOrEqual(35) },
// });
// await userRepo.save(
//   userRepo.create({
//     firstName: "James",
//     lastName: "Quinson",
//     age: 27,
//     groups: [],
//     posts: [post],
//   })
// );

// const groups = await groupRepo.find({ relations: ["members"] });
// console.log(groups);

// const post = new Post();
// post.title = "Get rusty";
// post.description = "Get rusty or I'll make u dusty ;)";
// post.likes = 1200;

// const metadata = new PostMetadata();
// metadata.createdAt = new Date().toDateString();
// metadata.post = post;

// post.user = user;
// post.metadata = metadata;

// const saved = await postRepo.save(post);

// console.log("new post", saved);

// *----

// const findPost = await postRepo.find({
//   likes: MoreThan(10),
// });
// console.log("Post +10 likes", findPost);

// const posts = await postRepo.find({ relations: ["metadata"] });

// console.log("Posts", posts);
