import { useState, useMemo, useCallback } from 'react'
import { createEditor } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Edit this paragraph...' }],
  },
]

export const FirstHalf = () => {
  const [val, setVal] = useState(initialValue)

  /*
    ? Avoid Error
    ! Unhandled Runtime Error
    ! Error: Cannot find a descendant at path [0] in node: {"children":[],"operations":[],"selection":null,"marks":null}
    * https://github.com/ianstormtaylor/slate/issues/3477
    // const editor = useMemo(() => withReact(createEditor()), [])
  */
  const [editor] = useState(() => withReact(createEditor()))

  return (
    <Slate editor={editor} value={val} onChange={(newVal) => setVal(newVal)}>
      <Editable />
    </Slate>
  )
}
