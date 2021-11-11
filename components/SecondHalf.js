import { useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { createEditor, Transforms, Editor, Text } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

// const Editor = dynamic(() => import('slate').then((module) => module.Editor), {
//   ssr: false,
// })

// ! https://github.com/ianstormtaylor/slate/issues/3477
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph...' }],
  },
]

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    })

    return !!match
  },
  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      // {
      //   anchor: { path: [0, 0], offset: 0 },
      //   focus: { path: [0, 0], offset: 0 },
      // },
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    )
  },
}

export const SecondHalf = () => {
  // const editor = useMemo(() => withReact(createEditor()), [])
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState(initialValue)

  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
      <div className='mt-4 space-x-4'>
        <button
          className='px-3 py-1 transition duration-300 ease-in-out bg-white rounded hover:shadow-md hover:bg-gray-100'
          onMouseDown={(e) => {
            e.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          <h6 className='text-xs'>Bold</h6>
        </button>
        <button
          className='px-3 py-1 transition duration-300 ease-in-out bg-white rounded hover:shadow-md hover:bg-gray-100'
          onMouseDown={(e) => {
            e.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          <h6 className='text-xs'>Code Block</h6>
        </button>
      </div>
      <div className='w-full px-4 py-2 mt-1 text-gray-500 border-2 border-gray-300 rounded-md shadow-md bg-gray-50'>
        <Editable
          // ! https://github.com/ianstormtaylor/slate/issues/714
          autoCapitalize='false'
          autoCorrect='false'
          spellCheck='true'
          placeholder='Please write something...'
          editor={editor}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return
            }

            switch (event.key) {
              case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
              }
              case 'b': {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
              }
            }
            console.log(event.key)
          }}
        />
      </div>
    </Slate>
  )
}

const CodeElement = (props) => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
)

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>

const Leaf = (props) => (
  <span
    {...props.attributes}
    style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
  >
    {props.children}
  </span>
)
