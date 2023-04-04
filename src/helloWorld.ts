import { useState } from "react";

export type DisplayName = string | number

export function helloWorld2(displayName? : DisplayName) {
   const [d] = useState('xxxxxx')

  const message = `Hello World from ${displayName ?? 'no one !!!'}!` + d;
  return message;
}
 