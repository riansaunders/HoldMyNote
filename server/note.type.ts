import { getModelForClass, prop, Ref, buildSchema, modelOptions } from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class NoteItem {
  @Field()
  @prop()
  public complete!: boolean;

  @Field()
  @prop()
  public content!: string;
}

@ObjectType()
export class Note {
  @prop({ _id: true })
  @Field((type) => ID)
  public id!: mongoose.Types.ObjectId;

  @prop()
  @Field()
  public ownerID?: string;

  @prop()
  @Field()
  public author!: string

  @prop()
  @Field()
  public title?: string;

  @prop()
  @Field()
  public isPrivate: boolean = false;

  @prop()
  @Field()
  public isAnonymous: boolean = false;

  @prop()
  @Field()
  public isList: boolean = true;


  @prop({type: NoteItem, _id: false})
  @Field((type) => [NoteItem])
  public items!: NoteItem[];

  @prop()
  public dateSubmitted!: Date

  @Field(type => String) 
  when() {
    return "Today"
  }
}

export const NoteModel = getModelForClass(Note);
