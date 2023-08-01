import { Column, Entity } from "typeorm"
import { BaseModelEntity } from "./base.model.entity";

@Entity('tokens')
export class Tokens extends BaseModelEntity {
    @Column()
    token: string;
}
