import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "accounts" })
export class Account {
	@ObjectIdColumn()
	id: string;
	@Column()
	userId: string;
	@Column({ name: "providerAccountId" })
	providerAccountId?: string;
}
