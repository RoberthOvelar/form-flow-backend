import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @AutoMap()
  id: string;

  @Expose()
  @AutoMap()
  @Prop({ required: true })
  firstName!: string;

  @Expose()
  @AutoMap()
  @Prop({ required: true })
  lastName!: string;

  @Expose()
  @AutoMap()
  @Prop({ required: true, unique: true, index: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
