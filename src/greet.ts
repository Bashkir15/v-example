export class Greet {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	greet(): void {
		console.log(`HI, ${this.name}`);
	}
}
