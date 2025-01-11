class DataModel {
    constructor(public id: number, public content: string, public source: string) {}

    static fromJSON(json: string): DataModel {
        const data = JSON.parse(json);
        return new DataModel(data.id, data.content, data.source);
    }

    toJSON(): string {
        return JSON.stringify({
            id: this.id,
            content: this.content,
            source: this.source,
        });
    }
}