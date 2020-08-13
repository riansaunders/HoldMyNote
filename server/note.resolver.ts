import { Resolver, Field, Ctx } from "type-graphql";
import { Note, NoteItem, NoteModel } from "./note.type";
import { Mutation, Query, Arg, InputType, ID } from "type-graphql";
import { mongoose } from "@typegoose/typegoose";
import { ApiContext } from "./context";
import { toJSON } from "./resolver-helper";

@InputType()
class NoteItemInput {
  @Field()
  public complete: boolean = false;

  @Field()
  public content!: string;
}

@InputType()
class NoteInput implements Partial<Note> {
  @Field()
  public title?: string;

  @Field()
  public isPrivate: boolean = false;

  @Field()
  public isAnonymous: boolean = false;

  @Field()
  public isList: boolean = false;

  @Field((type) => [NoteItemInput])
  public itemsInput!: [NoteItemInput];
}

@InputType()
class UpdateNoteInput implements Partial<Note> {
  @Field((type) => ID)
  public id!: mongoose.Types.ObjectId;

  @Field()
  public title?: string;

  @Field()
  public isPrivate: boolean = false;

  @Field()
  public isAnonymous: boolean = false;

  @Field()
  public isList: boolean = false;

  @Field((type) => [NoteItemInput])
  public itemsInput!: [NoteItemInput];
}

@Resolver(Note)
export class NoteResolver {
  @Query(() => Note)
  async note(@Arg("id") id: string) {
    const note = await NoteModel.findById(id).exec();
    if (note === undefined || note === null) {
      return undefined;
    }
    return toJSON(note);
  }

  @Query(() => [Note])
  async notes() {
    const many = await NoteModel.find({ isPrivate: false }).exec();

    if (many == undefined || many == null || many.length < 1) return [];

    const notes = many.map((n) => toJSON(n));

    return notes;
  }

  @Query(() => [Note])
  async userNotes(@Arg("userID") id: string, @Ctx() ctx: ApiContext) {
    let query: any = {
      ownerID: id,
    };
    if (ctx.signedIn && ctx.uid !== id) {
      query.isPrivate = false;
    }

    const note = await NoteModel.find(query);
    if (note == undefined || note.length < 1) {
      return [];
    }
    const notes = note.map((n) => toJSON(n));

    return notes;
  }

  @Mutation(() => Note)
  public async createNote(
    @Arg("input") input: NoteInput,
    @Ctx() ctx: ApiContext
  ) {
    const mb = new NoteModel({
      ownerID: ctx.uid,
      author: ctx.signedIn ? ctx.displayName : "Anonymous",
      title: input.title,
      isPrivate: input.isPrivate,
      isAnonymous: input.isAnonymous,
      isList: input.isList,
      items: input.itemsInput,
    });
    await mb.save();

    return toJSON(mb);
  }

  @Mutation(() => Note)
  public async updateNote(
    @Arg("input") input: UpdateNoteInput,
    @Ctx() ctx: ApiContext
  ) {
    const note = await NoteModel.findById(input.id);
    if (typeof note === "undefined" || !note) {
      return undefined;
    }
    if (note.ownerID && note.ownerID !== ctx.uid) {
      return undefined;
    }
    await note.update({
      title: input.title,
      isPrivate: input.isPrivate,
      isAnonymous: input.isAnonymous,
      isList: input.isList,
      items: input.itemsInput,
    });
    return toJSON(note);
  }

  @Mutation(() => Note)
  public async deleteNote(@Arg("id") id: string, @Ctx() ctx: ApiContext) {
    const note = await NoteModel.findById(id);
    if (typeof note === "undefined" || !note) {
      return undefined;
    }
    if (note.ownerID && note.ownerID !== ctx.uid) {
      return undefined;
    }
    note.remove();
    return toJSON(note);
  }
}
