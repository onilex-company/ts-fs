import { AbsoluteFolderName } from "./AbsoluteFolderName";
import { FSName } from "./FSName";
import { FileName } from "./FileName";

/**
 * Absolute file name is a file name that starts with slash and can contain parent folder that
 * must be absolute folder name or undefined (if file is at the root)
 */
export class AbsoluteFileName implements FSName {
    constructor(fileName: FileName, parent?: AbsoluteFolderName)
    constructor(name: string)
    constructor(p1: FileName | string, p2?: AbsoluteFolderName) {
        if (typeof p1 === "string") {
            const parsed = AbsoluteFileName.parse(p1)
            this.parent = parsed[0]
            this.name = parsed[1]
        } else {
            this.parent = p2
            this.name = p1
        }

        this.value = this.parent 
            ? `${this.parent.value}/${this.name.value}` 
            : `/${this.name.value}`;
    }

    readonly value: string;
    readonly name: FileName;
    readonly parent?: AbsoluteFolderName;

    static parse = (name: string): [AbsoluteFolderName | undefined, FileName] => {
        if (name.endsWith("/"))
            throw new Error("AbsoluteFileName cannot end with slash, did you mean AbsoluteFolderName?")

        const lastSlashIndex = name.lastIndexOf("/")
        
        if (lastSlashIndex > 0) {
            const parent = new AbsoluteFolderName(name.substring(0, lastSlashIndex))
            const fileName = new FileName(name.substring(lastSlashIndex + 1))
            return [parent, fileName]
        } else {
            const parent = undefined
            // remove leading slash as this is absoulute path at root
            const fileName = new FileName(name.substring(1))
            return [parent, fileName]
        }
    }
}
