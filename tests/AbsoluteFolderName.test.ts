import { describe, expect, test, it } from "@jest/globals";
import { AbsoluteFolderName } from "../src/AbsoluteFolderName";

describe('Absolute Folder Name unit test"', () => {
    it ("should parse absolute folder name", () => {
        const folder = new AbsoluteFolderName("/folder");
        expect(folder.value).toBe("/folder");
        expect(folder.name.value).toBe("folder");
        expect(folder.parent).toBe(undefined);
    });

    it ("should parse absolute folder name with parent", () => {
        const folder = new AbsoluteFolderName("/parent/folder");
        expect(folder.value).toBe("/parent/folder");
        expect(folder.name.value).toBe("folder");
        expect(folder.parent?.value).toBe("/parent");
    });

    it ("should parse absolute folder name with multiple parents", () => {
        const folder = new AbsoluteFolderName("/parent1/parent2/folder");
        expect(folder.value).toBe("/parent1/parent2/folder");
        expect(folder.name.value).toBe("folder");
        expect(folder.parent?.value).toBe("/parent1/parent2");
    });

    it ("should parse absolute folder when there are multiple consecutive slashes at the end", () => {
        const folder = new AbsoluteFolderName("/folder///");
        expect(folder.value).toBe("/folder");
        expect(folder.name.value).toBe("folder");
        expect(folder.parent).toBe(undefined);
    });
    
    it ("should not fail when contains more then one consecutive slash", () => {
        const folder = new AbsoluteFolderName("///parent1/parent2///folder");
        expect(folder.value).toBe("/parent1/parent2/folder");
        expect(folder.name.value).toBe("folder");
        expect(folder.parent?.value).toBe("/parent1/parent2");
        expect(folder.parent!.parent!.name.value).toBe("parent1");
    });

    it ("should throw if absolute folder name doesn't start with slash", () => {
        expect(() => new AbsoluteFolderName("folder")).toThrowError();
    });
});
