import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema, buildSchemaSync } from "type-graphql";
import { NoteResolver } from "../../server/note.resolver";

import * as admin from "firebase-admin";
import { ApiContext } from "../../server/context";

import mongoose from "mongoose"

//This whole class is just rag-tag isn't it...

const schema = buildSchemaSync({
  resolvers: [NoteResolver],
});

if (admin.apps.length < 1) {
  const serviceAccount = require("../../firebase-key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://holdmynote.firebaseio.com",
  });
}

mongoose.connect(String(process.env.DB_ENDPOINT || "localhost:27017"), {
  useNewUrlParser: true,
  poolSize: 1,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const request: NextApiRequest = req;
    const response: NextApiResponse = res;
    const auth = request.headers.authorization;
    const ctx: ApiContext = {
      signedIn: false,
      displayName: "Anonymous"
    };

    if (typeof auth !== "undefined") {
      try {
        const user = await admin.auth().verifyIdToken(auth);
        ctx.uid = user.uid
        ctx.displayName = "Unntt"

        // Little logical helper
        ctx.signedIn = true
      } catch (error) {
        // Invalid token
      }
    }

    return ctx;
  },
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
