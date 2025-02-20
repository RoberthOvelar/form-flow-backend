import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Expose()
  @Prop({ required: true })
  firstName!: string;

  @Expose()
  @Prop({ required: true })
  lastName!: string;

  @Expose()
  @Prop({ required: true, unique: true, index: true })
  email!: string;

  @Exclude()
  @Prop({ required: true })
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
