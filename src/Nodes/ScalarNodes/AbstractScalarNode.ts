export default abstract class AbstractScalarNode {
    readonly field;
    readonly value;

    public constructor(field: string, value: any) {
        this.field = field;
        this.value = value;
    }
}
