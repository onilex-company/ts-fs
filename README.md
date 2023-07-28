**Ts Fs - File System Abstraction**

This is a small library used to abstract file/folder names in typescript. It tries to use the type system to help you avoid functional errors that can be caused by wrong file/folder names when plain strings are used.

**Example**
```typescript
import { AbsoluteFileName } from 'onilex-fs';

const file = new AbsoluteFileName('/home/user/Documents/file.txt');

console.log(file.name.value); // file.txt
console.log(file.name.extension.value); // .txt
console.log(file.name.extension.valueWithoutDot); // txt
console.log(file.parent.value); // /home/user/Documents
console.log(file.parent.name); // Documents
console.log(file.parent.parent.value); // /home/user
```

**LICENSE**
MIT

**todo:**
- currently all paths when are converted from string to objects are "eagrly" converted to objects which is not optimal as it uses more memory than needed. This should be changed to "lazy" conversion, so all parents are initialized only when needed, not ahead of time.

- this version is tested only on Mac, so it might not work on other OS-es. Probably on Linux it will work, but on Windows due to different FS structure it will not work. This should be fixed in the future.