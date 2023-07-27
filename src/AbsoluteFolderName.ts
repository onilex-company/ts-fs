import { FSName } from "./FSName";
import { Name } from "./Name";
import { normalizePath } from "./utils/normalizePath";

/**
 * Absolute folder name is a folder name that starts with slash and can contain parent folder that
 * must be absolute folder name or undefined (if folder is at the root)
 */
export class AbsoluteFolderName implements FSName {
    constructor(name: Name, parent?: AbsoluteFolderName);
    constructor(name: string);
    constructor(p1: Name | string, p2?: AbsoluteFolderName) {
        if (typeof p1 === "string") {
            const parsed = AbsoluteFolderName.parse(p1);
            this.parent = parsed[1];
            this.name = parsed[0];
        } else {
            this.parent = p2!;
            this.name = p1;
        }

        this.value = this.parent ?
            `${this.parent.value}/${this.name.value}` :
            `/${this.name.value}`;
    }

    readonly value: string;
    readonly name: Name;
    readonly parent: AbsoluteFolderName | undefined;

    static parse = (name: string): [Name, AbsoluteFolderName | undefined] => {
        if (!name.startsWith("/"))
            throw new Error("AbsoulteFolderName must start with slash, did you mean RelativeFolderName?")

        const normalized = normalizePath(name);
        const lastSlashIndex = normalized.lastIndexOf("/")
    
        if (lastSlashIndex > 0) {
            const parent = new AbsoluteFolderName(normalized.substring(0, lastSlashIndex))
            const folder = new Name(normalized.substring(lastSlashIndex + 1))
            return [folder, parent]
        } else {
            const parent = undefined;
            // skip first slash as this is absolute path
            const folder = new Name(normalized.substring(1))
            return [folder, parent]
        }
    }
}

