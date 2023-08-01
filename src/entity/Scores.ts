import { Entity, Column, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";
import { BaseModelEntity } from "./base.model.entity";

@Entity('scores')
export class Scores extends BaseModelEntity {
    @Column({nullable: true})
    total_score: number;

    @Column({
        nullable: true
    })
    category: string;

    @ManyToOne(() => User, (user) => user.scores, {
        nullable: true
    })
    @JoinColumn({name: 'user_id'})
    user: User;
}
